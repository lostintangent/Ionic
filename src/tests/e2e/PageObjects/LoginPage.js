function LoginPage() {
    this.mainHandle = "";
}

LoginPage.prototype = {
    focusWindow: function () {
        var that = this;
        return browser.getAllWindowHandles()
            .then(function (handles) {
                that.mainHandle = handles[0];
                var popupHandle = handles[1];
                return browser.switchTo().window(popupHandle);
            })
    },
    enterUsername: function (name) {
	    var input = browser.switchTo().activeElement();
        input.sendKeys(name);
        input.sendKeys(protractor.Key.TAB);
    },
    enterPassword: function (password) {
	    var input = browser.switchTo().activeElement();
        input.sendKeys(password);
        input.sendKeys(protractor.Key.ENTER);
    },
    focusParentWindow: function () {
	    return browser.switchTo().window(this.mainHandle);
    }
};

module.exports = LoginPage;