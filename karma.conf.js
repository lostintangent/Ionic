module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    files: [
        // #1) Libraries
        "www/lib/ionic/js/ionic.bundle.js",
        "www/lib/angular-mocks/angular-mocks.js",

        // #2) App code
        "src/ts/*.ts",

        // #3) Test specs
        "src/tests/unit/*Spec.ts",
    ],

    exclude: ["*.d.ts"],

    typescriptPreprocessor: {
      options: {
        sourceMap: true
      }
    },

    sauceLabs: {
        testName: 'Web App Unit Tests',
        username: "joncart",
        accessKey: "51bea282-6ae5-4388-a717-8d0c6ff34670"
    },

    customLaunchers: {
        IEOnWindows: {
            base: "SauceLabs",
            browserName: "internet explorer",
            platform: "Windows 8.1",
            version: "11"
        }
    },

    cordovaSettings: {
        platforms: ["ios"]
    },

    preprocessors: {
      "**/*.ts": ["typescript", "coverage"]
    },

    reporters: ["spec", "coverage", "saucelabs"],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ["IEOnWindows"],

    coverageReporter: {
      type: "html",
      dir: "coverage/"
    },

    autoWatch: false,
    singleRun: true
  });
};