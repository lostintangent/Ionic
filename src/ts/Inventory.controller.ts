/// <reference path="App.d.ts" />

module InventoryControllers {
    class InventoryController {
        private loggedIn: boolean = false;

        constructor(private $scope: ng.IRootScopeService, private backEnd: IAuthenticationProvider, private $ionicSideMenuDelegate: Ionic.ISideMenuDelegate) {
            this.backEnd
                .attemptAutoLogin()
                .then(this.handleLogin.bind(this));
        }

        private handleLogin(user) {
            // If the user arg is falsy
            // then the auto-login failed
            if (!user) {
                return;
            }

            this.loggedIn = true;
            this.$scope.$broadcast("loggedIn");
        }

        login() {
            this.backEnd
                .login()
                .then(this.handleLogin.bind(this));
        }

        logout() {
            this.backEnd.logout();

            this.loggedIn = false;
            this.$scope.$broadcast("loggedOut");

            // Ensure that the side menu is closed
            this.$ionicSideMenuDelegate.toggleLeft(false);
        }
    }

    angular.module("Inventory.Controllers.Login", ["ionic", "Inventory.Backends"])
        .controller("InventoryController", InventoryController);
}