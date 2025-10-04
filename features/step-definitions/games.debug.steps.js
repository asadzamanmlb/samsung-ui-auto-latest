import { Given, When, Then } from "@wdio/cucumber-framework";
import { Keys } from "@headspinio/tizen-remote";
import { assert } from "chai";
import focusElement from "../commonFunctions/focusElement.js";

// Games page specific debug and discovery steps

Then("I should look for games page specific elements", async function () {
  console.log("🎮 Looking for Games page specific elements...");

  try {
    await browser.pause(3000); // Wait for page to fully load

    const gamesPageSelectors = [
      // Schedule/Calendar elements
      "[data-testid*='schedule']",
      "[data-testid*='calendar']",
      "[data-testid*='date']",
      "//button[contains(@aria-label, 'date')]",
      "//div[contains(@class, 'calendar')]",

      // Game tiles and matchups
      "[data-testid*='game']",
      "[data-testid*='matchup']",
      "[data-testid*='8130']", // Game ID pattern
      "//button[contains(@aria-label, 'game')]",
      "//button[contains(@aria-label, 'vs')]",

      // Team information
      "img[alt*='team']",
      "img[alt*='logo']",
      "[data-testid*='team']",
      "//span[contains(@class, 'team')]",

      // Game status and timing
      "//span[text()='LIVE']",
      "//span[text()='FINAL']",
      "//span[contains(text(), 'PM')]",
      "//span[contains(text(), 'AM')]",
      "[data-testid*='status']",
      "[data-testid*='time']",

      // Filters and navigation
      "[data-testid*='filter']",
      "[data-testid*='tab']",
      "//button[contains(text(), 'All Games')]",
      "//button[contains(text(), 'My Teams')]",
      "//button[contains(text(), 'Live')]",

      // Content sections
      "[data-testid*='section']",
      "[role='tabpanel']",
      "[role='tab']",
      "section",
      "article",
    ];

    const foundElements = {};

    for (const selector of gamesPageSelectors) {
      try {
        const elements = await browser.$$(selector);
        if (elements.length > 0) {
          foundElements[selector] = elements.length;
          console.log(
            `✅ Found ${elements.length} elements with selector: ${selector}`
          );

          // Get sample content from first few elements
          for (let i = 0; i < Math.min(2, elements.length); i++) {
            try {
              const text = await elements[i].getText();
              const ariaLabel = await elements[i].getAttribute("aria-label");
              const testId = await elements[i].getAttribute("data-testid");

              if (text || ariaLabel || testId) {
                console.log(`   Element ${i + 1}:`);
                if (text)
                  console.log(`     Text: "${text.substring(0, 50)}..."`);
                if (ariaLabel)
                  console.log(
                    `     Aria-label: "${ariaLabel.substring(0, 50)}..."`
                  );
                if (testId) console.log(`     Data-testid: "${testId}"`);
              }
            } catch (e) {
              // Continue
            }
          }
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    console.log(`\n📊 Games Page Elements Summary:`);
    console.log(
      `Found ${Object.keys(foundElements).length} different element types`
    );

    // Store found elements for later use
    this.gamesPageElements = foundElements;
  } catch (error) {
    console.log(`❌ Failed to analyze Games page elements: ${error.message}`);
    throw error;
  }
});

Then("I should analyze games page navigation structure", async function () {
  console.log("🧭 Analyzing Games page navigation structure...");

  try {
    const navigationSelectors = [
      // Top navigation
      "nav",
      "[role='navigation']",
      "[data-testid*='nav']",
      ".navigation",
      ".header",

      // Tab navigation
      "[role='tablist']",
      "[role='tab']",
      "[data-testid*='tab']",
      "//button[contains(@role, 'tab')]",

      // Filter buttons
      "//button[contains(text(), 'Filter')]",
      "//button[contains(text(), 'Sort')]",
      "//button[contains(text(), 'All')]",
      "//button[contains(text(), 'Live')]",
      "//button[contains(text(), 'Today')]",
      "//button[contains(text(), 'Tomorrow')]",

      // Date navigation
      "//button[contains(@aria-label, 'Previous')]",
      "//button[contains(@aria-label, 'Next')]",
      "//button[contains(@aria-label, 'date')]",
      "[data-testid*='date-picker']",
      "[data-testid*='calendar']",
    ];

    const navigationElements = {};

    for (const selector of navigationSelectors) {
      try {
        const elements = await browser.$$(selector);
        if (elements.length > 0) {
          navigationElements[selector] = elements.length;
          console.log(
            `🧭 Found ${elements.length} navigation elements: ${selector}`
          );

          // Get navigation text/labels
          for (let i = 0; i < Math.min(3, elements.length); i++) {
            try {
              const text = await elements[i].getText();
              const ariaLabel = await elements[i].getAttribute("aria-label");

              if (text || ariaLabel) {
                console.log(`   Nav ${i + 1}: ${text || ariaLabel}`);
              }
            } catch (e) {
              // Continue
            }
          }
        }
      } catch (e) {
        // Continue
      }
    }

    this.gamesPageNavigation = navigationElements;
  } catch (error) {
    console.log(`❌ Failed to analyze navigation structure: ${error.message}`);
    throw error;
  }
});

Then("I should identify games page content types", async function () {
  console.log("📋 Identifying Games page content types...");

  try {
    const contentTypeSelectors = [
      // Live games
      "//button[contains(@aria-label, 'LIVE')]",
      "//span[text()='LIVE']",
      "[data-testid*='live']",

      // Completed games
      "//button[contains(@aria-label, 'FINAL')]",
      "//span[text()='FINAL']",
      "[data-testid*='final']",

      // Upcoming games
      "//button[contains(@aria-label, 'PM')]",
      "//button[contains(@aria-label, 'AM')]",
      "[data-testid*='upcoming']",

      // Game highlights/recaps
      "//button[contains(@aria-label, 'Recap')]",
      "//button[contains(@aria-label, 'Highlight')]",
      "[data-testid*='recap']",
      "[data-testid*='highlight']",

      // Restricted content
      "//button[contains(@aria-label, 'Blackout')]",
      "//button[contains(@aria-label, 'MVPD')]",
      "[data-testid*='restriction']",
      "[data-testid*='lock']",

      // Team specific content
      "//button[contains(@aria-label, 'My Teams')]",
      "[data-testid*='favorite']",
      "[data-testid*='following']",
    ];

    const contentTypes = {};

    for (const selector of contentTypeSelectors) {
      try {
        const elements = await browser.$$(selector);
        if (elements.length > 0) {
          contentTypes[selector] = elements.length;
          console.log(`📋 Found ${elements.length} content items: ${selector}`);

          // Analyze content details
          for (let i = 0; i < Math.min(2, elements.length); i++) {
            try {
              const ariaLabel = await elements[i].getAttribute("aria-label");
              const text = await elements[i].getText();

              if (ariaLabel || text) {
                console.log(
                  `   Content ${i + 1}: ${(ariaLabel || text).substring(
                    0,
                    80
                  )}...`
                );
              }
            } catch (e) {
              // Continue
            }
          }
        }
      } catch (e) {
        // Continue
      }
    }

    this.gamesPageContentTypes = contentTypes;

    // Generate test case recommendations
    console.log(`\n🎯 Test Case Recommendations Based on Discovered Elements:`);

    if (
      contentTypes["//span[text()='LIVE']"] ||
      contentTypes["//button[contains(@aria-label, 'LIVE')]"]
    ) {
      console.log(`✅ Create test for: Live game interaction and verification`);
    }

    if (
      contentTypes["//span[text()='FINAL']"] ||
      contentTypes["//button[contains(@aria-label, 'FINAL')]"]
    ) {
      console.log(`✅ Create test for: Completed game recap access`);
    }

    if (
      contentTypes["//button[contains(@aria-label, 'PM')]"] ||
      contentTypes["//button[contains(@aria-label, 'AM')]"]
    ) {
      console.log(`✅ Create test for: Upcoming game preview and scheduling`);
    }

    if (
      contentTypes["//button[contains(@aria-label, 'Blackout')]"] ||
      contentTypes["[data-testid*='restriction']"]
    ) {
      console.log(`✅ Create test for: Blackout and restriction handling`);
    }

    if (
      this.gamesPageNavigation &&
      Object.keys(this.gamesPageNavigation).length > 0
    ) {
      console.log(`✅ Create test for: Games page navigation and filtering`);
    }
  } catch (error) {
    console.log(`❌ Failed to identify content types: ${error.message}`);
    throw error;
  }
});
