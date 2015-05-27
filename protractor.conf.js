/* global browser */

exports.config = {
  directConnect: true,

  sauceUser: "joncart",
  sauceKey: "51bea282-6ae5-4388-a717-8d0c6ff34670",

  capabilities: {
    browserName: "chrome"
  },

  specs: ["src/tests/e2e/*.js"],

  allScriptsTimeout: 60000,

  onPrepare: function () {
    // Before running the tests, navigate the target
    // browser to our local instance of the hosted site
    browser.driver.get("http://localhost:8100");
  }
};