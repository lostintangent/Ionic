/// <reference path="App.d.ts" />

angular.module("Inventory", ["ionic", "TemplateCache", "Inventory.Backends", "Inventory.Controllers.Login", "Inventory.Controllers.Items"])
.config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, backEndProvider: IBackEndProvider) => {
    $stateProvider
        .state("Inventory", {
            abstract: true,
            controller: "InventoryController as auth",
            templateUrl: "Layout.html",
            url: "/Inventory"
        })
        .state("Inventory.Items", {
            url: "/Items",
            views: {
                "menuContent": {
                    templateUrl: "Items.html",
                    controller: "ItemsController as items"
                }
            }
        });

    $urlRouterProvider.otherwise("/Inventory/Items");

    backEndProvider.configure({
        appName: "joncart",
        appKey: "gJJEWGAoNARqbKSjCfpAsprZTZwwtu56",
        tableName: "Items"
    });
});

document.addEventListener("deviceready", function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      window.StatusBar.styleDefault();
    }

    angular.bootstrap(document, ["Inventory"]);
 });