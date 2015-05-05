var LoginPage = require("./LoginPage.js");

function InventoryPage() {}

InventoryPage.prototype = {
  openLeftMenu: function () {
    element(by.css("[nav-bar=active]"))
    .element(by.id("left-menu_open-button"))
    .click();
  },
  clickLoginLink: function () {
    element(by.css("ion-item")).click();
    return new LoginPage();
  },
  clickLogoutLink: function () {
    this.clickLoginLink();
  },
  waitForLoadingScreenToClose: function () {
    browser.sleep(3000);
  }
};

module.exports = InventoryPage;