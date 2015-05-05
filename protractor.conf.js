exports.config = {
  directConnect: true,

  sauceUser: "joncart",
  sauceKey: "51bea282-6ae5-4388-a717-8d0c6ff34670",

  capabilities: {
    browserName: "chrome"
  },

  specs: ["app/tests/e2e/*.js"],

  allScriptsTimeout: 60000,

  onPrepare: function () {
  	browser.driver.get("http://localhost:8100");
  }
};