// Because this file imports from  protractor, you'll need to have it as a
// project dependency. Please see the reference config: lib/config.ts for more
// information.
//
// Why you might want to create your config with typescript:
// Editors like Microsoft Visual Studio Code will have autocomplete and
// description hints.
//
// To run this example, run `protractor conf.js`.
const { SpecReporter } = require("jasmine-spec-reporter");
const AllureReporter = require('jasmine-allure-reporter');

exports.config = {
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome'
  },
  chromeDriver: './webdriver-manager/selenium/chromedriver_92.0.4515.107.exe',
  specs: [
    './tmp/**/**.js'
  ],
  directConnect: true,

  // You could set no globals to true to avoid jQuery '$' and protractor '$'
  // collisions on the global namespace.
  noGlobals: true,
  onPrepare: (() => {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: 'raw' } }));
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));
  }),
};
