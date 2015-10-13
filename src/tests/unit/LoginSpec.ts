/// <reference path="../lib/angular-mocks.d.ts" />
/// <reference path="../lib/jasmine.d.ts" />
/// <reference path="../../ts/App.d.ts" />

describe("InventoryController", () => {
    var backEndStub: IAuthenticationProvider,
        controllerFactory: ng.IControllerService,
        scope: ng.IRootScopeService;
        
    beforeEach(() => {
      module("Inventory.Controllers.Login");

      inject(($controller: ng.IControllerService, $rootScope: ng.IRootScopeService, $q: ng.IQService) => {
        controllerFactory = $controller;
        scope = $rootScope;

        // Initialize the promise with
        // a faked out "then" that simply
        // executes the provided function
        var defer = $q.defer();
        defer.resolve(true);
        spyOn(defer.promise, "then")
            .and.callFake((f) => { f(true); });

        // Initialize a back-end stub
        // that returns the dummy promise
        backEndStub = <IAuthenticationProvider>{
            attemptAutoLogin: () => {
                return defer.promise;
            },
            login: () => {
                return defer.promise;
            },
            logout: () => {
                return defer.promise;
            }
        };
      });
    });

    it("should attempt to automatically login the user", () => {
        spyOn(backEndStub, "attemptAutoLogin").and.callThrough();

        controllerFactory("InventoryController", {
            $scope: scope,
            backEnd: backEndStub
        });

        expect(backEndStub.attemptAutoLogin).toHaveBeenCalled();
    });

    it("should allow manually logging in, and include propopgating the change", () => {
        spyOn(scope, "$broadcast");

        var controller = controllerFactory("InventoryController", {
            $scope: scope,
            backEnd: backEndStub
        });

        controller.login();

        expect(controller.loggedIn).toBe(true);
        expect(scope.$broadcast).toHaveBeenCalledWith("loggedIn");
    });

    it("should allow manually logging out, and inlcude propogating the change", () => {
        spyOn(scope, "$broadcast");

        var controller = controllerFactory("InventoryController", {
            $scope: scope,
            backEnd: backEndStub
        });

        controller.logout();

        expect(controller.loggedIn).toBe(false);
        expect(scope.$broadcast).toHaveBeenCalledWith("loggedOut")
    });
});