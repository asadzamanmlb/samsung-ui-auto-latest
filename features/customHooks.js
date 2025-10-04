import { Before, After, BeforeAll, AfterAll } from "@wdio/cucumber-framework";

// Global setup - runs once before all scenarios
BeforeAll(async function () {
  console.log("🚀 Starting Samsung TV test suite...");
  // Add any global setup here
});

// Global teardown - runs once after all scenarios
AfterAll(async function () {
  console.log("🏁 Samsung TV test suite completed");
  // Add any global cleanup here
});

// Before each scenario
Before(async function (scenario) {
  console.log(`📱 Starting scenario: ${scenario.pickle.name}`);

  // Add scenario-specific setup here
  // For example:
  // - Clear app cache
  // - Reset TV state

  this.scenarioStartTime = Date.now();
});

// After each scenario
After(async function (scenario) {
  const duration = Date.now() - this.scenarioStartTime;
  console.log(`⏱️ Scenario completed in ${duration}ms`);

  if (scenario.result.status === "FAILED") {
    console.log(`❌ Scenario failed: ${scenario.pickle.name}`);

    // Screenshot functionality removed - not compatible with Samsung TV

    // Log page source on failure for debugging
    try {
      const pageSource = await browser.getPageSource();
      console.log("📄 Page source length:", pageSource.length);
      // You could save this to a file for debugging
    } catch (error) {
      console.log("⚠️ Could not get page source:", error.message);
    }
  } else {
    console.log(`✅ Scenario passed: ${scenario.pickle.name}`);
  }
});

// Before scenarios tagged with @login
Before({ tags: "@login" }, async function () {
  console.log("🔐 Preparing for login test...");
  // Add login-specific setup
});

// After scenarios tagged with @settings
After({ tags: "@settings" }, async function () {
  console.log("⚙️ Cleaning up after settings test...");
  // Add settings-specific cleanup
  // For example: navigate back to home page
});

// Before scenarios tagged with @debug
Before({ tags: "@debug" }, async function () {
  console.log("🔍 Debug mode enabled for this scenario");
  // Enable additional logging or debugging features
});
