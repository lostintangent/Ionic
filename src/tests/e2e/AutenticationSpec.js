var InventoryPage = require("./PageObjects/InventoryPage.js");

describe("Authentication", function () {
    it("should allow logging in and logging back out", function () {
    	var page = new InventoryPage();
        page.waitForLoadingScreenToClose();
        page.openLeftMenu();

        var login = page.clickLoginLink();
        login.focusWindow()
            .then(function () {
                login.enterUsername("joncart@outlook.com");
                login.enterPassword("6parts7!");

                return login.focusParentWindow();
            })
            .then(function () {
                page.waitForLoadingScreenToClose();

                page.openLeftMenu();
                page.clickLogoutLink();
            });
    });
});