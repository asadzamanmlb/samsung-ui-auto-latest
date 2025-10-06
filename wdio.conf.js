import { Env } from "@humanwhocodes/env";
import fs from "fs";
import { ReportAggregator } from "wdio-html-nice-reporter";
import { execSync } from "child_process";
import { generate } from "cucumber-html-reporter";
import { rimraf } from "rimraf";

const env = new Env();

// for wdio-html-nice-reporter
let reportAggregator;
const timestamp = new Date()
  .toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
  .replace(",", " at");

export const config = {
  metadata: {
    "Test Environment": env.get("ENV") || "STG",
    Device: "Samsung TV (Tizen)",
    Platform: "TizenTV",
    "Test Run": timestamp,
    OS: process.platform,
  },
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
  // Spec File Retries
  // ===================
  specFileRetries: 3,
  specFileRetriesDelay: 10,
  specFileRetriesDeferred: true,

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
  
  //
  // Reporters
  // ===================
  reporters: [
    "spec",
    [
      "html-nice",
      {
        debug: true,
        outputDir: "./reports/timeline-html/temp/",
        filename: "index.html",
        useOnAfterCommandForScreenshot: true,
        useCucumberStepReporter: true,
        includeFailureMsg: true,
        includeScreenshots: true,
        retry: true,
      },
    ],
    [
      "cucumberjs-json",
      {
        jsonFolder: "./reports/json/",
        language: "en",
        outputFileFormat: (options) => {
          const featureName = options.featureName
            ? options.featureName.replace(/\s+/g, "-").toLowerCase()
            : "unknown-feature";

          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, "0");
          const day = String(now.getDate()).padStart(2, "0");
          const hours = String(now.getHours()).padStart(2, "0");
          const minutes = String(now.getMinutes()).padStart(2, "0");

          const extraPrecision = String(
            Math.floor(Math.random() * 10000)
          ).padStart(4, "0");

          const timestamp = `${year}${month}${day}${hours}${minutes}${extraPrecision}`;

          return `${featureName}_${timestamp}.json`;
        },
      },
    ],
  ],
  
  cucumberOpts: {
    require: [
      "./features/step-definitions/*.js",
      "./features/hooks/*.js",
      "./features/customHooks.js",
    ],
    backtrace: false,
    format: ["pretty"],
    colors: true,
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
  onPrepare: async function (config, capabilities) {
    console.log("Preparing test execution...");
    
    const logFile = "./terminal.txt";

    // Delete the previous log file if it exists
    if (fs.existsSync(logFile)) {
      try {
        fs.unlinkSync(logFile);
        console.log(`Previous log file (${logFile}) deleted.`);
      } catch (error) {
        console.error(`Failed to delete previous log file: ${error.message}`);
      }
    }

    // Create a new write stream for the log file
    const logStream = fs.createWriteStream(logFile, { flags: "a" });

    // Override console.log to write to the log file
    const originalLog = console.log;
    console.log = function (...args) {
      try {
        logStream.write(args.join(" ") + "\n");
        originalLog.apply(console, args);
      } catch (error) {
        originalLog("Error while logging:", error.message);
      }
    };

    // Override console.error to write errors to the log file
    const originalError = console.error;
    console.error = function (...args) {
      try {
        logStream.write("[ERROR] " + args.join(" ") + "\n");
        originalError.apply(console, args);
      } catch (error) {
        originalError("Error while logging error:", error.message);
      }
    };

    console.log(
      "Logging initialized. Terminal logs will be saved to ./terminal.txt"
    );

    // Clean reports directory
    try {
      const reportsDir = "./reports/";
      await rimraf(reportsDir);
      console.log(`Cleaned reports directory: ${reportsDir}`);
    } catch (error) {
      console.error("Failed to clean reports directory:", error.message);
    }

    // Initialize wdio-html-nice-reporter
    try {
      reportAggregator = new ReportAggregator({
        outputDir: "./reports/timeline-html/temp/",
        filename: "Master.html",
        reportTitle: `Samsung TV Automation Test Report - ${timestamp}`,
        browserName: "TizenTV",
        collapseTests: true,
        collapseSuites: true,
        useCucumberStepReporter: true,
        retry: true,
      });
      global.reportAggregator = reportAggregator;
      reportAggregator.clean();
      console.log("Report aggregator initialized successfully.");
    } catch (error) {
      console.error("Failed to initialize report aggregator:", error.message);
    }
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
  onComplete: async function (exitCode, config, capabilities, results) {
    console.log("All workers completed.");
    console.log("Generating test reports...");

    // Generate wdio-html-nice-reporter
    try {
      await reportAggregator.createReport();
      console.log("HTML Nice Report created successfully.");
    } catch (error) {
      console.error("Failed to create HTML Nice Report:", error.message);
    }

    // Generate cucumber-html-reporter
    try {
      const options = {
        theme: "bootstrap",
        jsonDir: "./reports/json",
        output: "./reports/timeline-html/index.html",
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: false,
        metadata: this.metadata,
        failedSummaryReport: false,
      };

      generate(options);
      console.log("Cucumber HTML Report generated successfully.");
    } catch (error) {
      console.error("Failed to generate Cucumber HTML Report:", error.message);
    }

    // Post-process HTML report (expand scenarios)
    try {
      if (fs.existsSync("./modifyHtml.cjs")) {
        execSync("node modifyHtml.cjs", { stdio: "inherit" });
        console.log("HTML report post-processed successfully.");
      }
    } catch (error) {
      console.error("Failed to post-process HTML report:", error.message);
    }

    // Generate PDF from HTML report
    try {
      if (fs.existsSync("./make-playwrightpdf/make-playwrightpdf.js")) {
        execSync("node make-playwrightpdf/make-playwrightpdf.js", {
          stdio: "inherit",
        });
        console.log("PDF report generated successfully.");
      }
    } catch (error) {
      console.error("Failed to generate PDF report:", error.message);
    }

    // Send Slack notification if enabled
    if (process.env.SLACK === "Y") {
      try {
        if (fs.existsSync("./slackNotification.js")) {
          execSync("node slackNotification.js", { stdio: "inherit" });
          console.log("Slack notification sent successfully.");
        }
      } catch (error) {
        console.error("Failed to send Slack notification:", error.message);
      }
    }

    console.log("\n✅ Test execution and reporting completed!");
    console.log(`📊 View HTML report: ./reports/timeline-html/index.html`);
  },
};
