import { Env } from "@humanwhocodes/env";
const env = new Env();

export const config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  runner: "local",

  //
  // ==================
  // Specify Test Files
  // ==================
  specs: ["./features/**/*.feature"],
  exclude: [],

  //
  // ============
  // Capabilities
  // ============
  maxInstances: 1, // Set to 1 for Tizen TV as it typically supports only one session
  capabilities: [
    {
      "appium:deviceName":
        (env.get("SAMSUNG_TV_IP") || "192.168.4.31") +
        ":" +
        (env.get("SAMSUNG_TV_PORT") || "26101"),
      platformName: "TizenTV",
      "appium:appPackage":
        env.get("SAMSUNG_APP_PACKAGE") || "gGnYSxMq0L.MLBTVSTG",
      "appium:automationName": "TizenTV",
      "appium:appLaunchCooldown": 15000,
      "appium:rcToken": env.get("TEST_APPIUM_TIZEN_RC_TOKEN"),
      "appium:chromedriverExecutable": env.get(
        "TEST_APPIUM_TIZEN_CHROMEDRIVER"
      ),
      "appium:rcMode": "remote",
      "appium:sendKeysStrategy": "rc",
      "appium:resetRcToken": false,
    },
  ],

  //
  // ===================
  // Test Configurations
  // ===================
  logLevel: "info",
  bail: 0,
  waitforTimeout: 60000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 5,
  commandTimeout: 60000,

  //
  // Services
  // ===================
  services: [
    [
      "appium",
      {
        command: "appium",
        args: {
          // Appium server arguments
          relaxedSecurity: true,
        },
      },
    ],
  ],

  //
  // Framework
  // ===================
  framework: "cucumber",
  cucumberOpts: {
    require: [
      "./features/step-definitions/*.js",
      "./features/hooks/*.js",
      "./features/customHooks.js",
    ],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "",
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },

  //
  // =====
  // Hooks
  // =====
  /**
   * Gets executed once before all workers get launched.
   */
  onPrepare: function (config, capabilities) {
    console.log("Preparing test execution...");
  },

  /**
   * Gets executed before a worker process is spawned.
   */
  onWorkerStart: function (cid, caps, specs, args, execArgv) {
    console.log(`Worker started with CID: ${cid}`);
  },

  /**
   * Gets executed before initializing the webdriver session.
   */
  beforeSession: function (config, capabilities, specs, cid) {
    console.log("Initializing session...");
  },

  /**
   * Gets executed before test execution begins.
   */
  before: function (capabilities, specs) {
    console.log("Starting test execution...");
  },

  /**
   * Runs before a Cucumber Scenario.
   */
  beforeScenario: function (world, context) {
    console.log(`Starting scenario: ${world.pickle.name}`);
  },

  /**
   * Runs after a Cucumber Scenario.
   */
  afterScenario: function (world, result, context) {
    if (!result.passed) {
      console.error(`Scenario failed: ${world.pickle.name}`);
    }
  },

  /**
   * Gets executed after all tests are done.
   */
  after: function (result, capabilities, specs) {
    console.log("Test execution completed.");
  },

  /**
   * Gets executed right after terminating the webdriver session.
   */
  afterSession: function (config, capabilities, specs) {
    console.log("Session terminated.");
  },

  /**
   * Gets executed after all workers got shut down.
   */
  onComplete: function (exitCode, config, capabilities, results) {
    console.log("All workers completed.");
  },
};
