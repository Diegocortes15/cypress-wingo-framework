const {defineConfig} = require('cypress');

module.exports = defineConfig({
  // retries: {'runMode': 2, 'openMode': 0},
  // video: true,
  // screenshotOnRunFailure: true,
  // viewportWidth: 1200,
  defaultCommandTimeout: 10 * 1000,
  pageLoadTimeout: 100000,
  chromeWebSecurity: false,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome',
    mochawesomeReporterOptions: {
      reportDir: 'cypress/reports/mocha',
      quite: true,
      overwrite: false,
      html: false,
      json: true,
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
