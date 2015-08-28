module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    files: [
        // #1) Libraries
        "www/lib/ionic/release/js/ionic.bundle.js",
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

    // This is only used if a SauceLabs
    // launcher is actually used
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

    preprocessors: {
      "**/*.ts": ["typescript"]
    },

    reporters: ["junit", "coverage", "spec"],

    junitReporter: {
        outputDir: "tests",
        suite: "Ionic"
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ["PhantomJS2"],

    coverageReporter: {
      type: "cobertura",
      dir: "coverage",
    },

    autoWatch: false,
    
    singleRun: true
  });
};