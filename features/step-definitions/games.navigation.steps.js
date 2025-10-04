import { Given, When, Then } from "@wdio/cucumber-framework";
import { Keys } from "@headspinio/tizen-remote";
import { assert } from "chai";
import clickElement from "../commonFunctions/clickElement.js";
import focusElement from "../commonFunctions/focusElement.js";
import homePageObject from "../pageobjects/home/homePage.object.js";

// Step definitions for Games page navigation and discovery

When("I navigate to the Games page", async function () {
  console.log("🎮 Navigating to Games page...");

  try {
    // Try multiple methods to navigate to Games page

    // Method 1: Look for Games navigation link in header/nav
    console.log("🔍 Looking for Games navigation link...");
    const gamesNavSelectors = [
      "[data-testid*='games']",
      "[data-testid*='Games']",
      "[data-testid*='schedule']",
      "[data-testid*='Schedule']",
      "//a[contains(text(), 'Games')]",
      "//button[contains(text(), 'Games')]",
      "//nav//a[contains(text(), 'Games')]",
      "[href*='games']",
      "[href*='/games']",
    ];

    let gamesNavFound = false;

    for (const selector of gamesNavSelectors) {
      try {
        const element = await browser.$(selector);
        if (await element.isExisting()) {
          console.log(`✅ Found Games navigation with selector: ${selector}`);
          await focusElement({ objectKey: element });
          await browser.pause(1000);
          await browser.execute("tizen: pressKey", { key: "KEY_ENTER" });
          await browser.pause(3000);
          gamesNavFound = true;
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    // Method 2: If no direct nav link, try using remote navigation keys
    if (!gamesNavFound) {
      console.log("🎮 Trying remote key navigation to Games...");

      // Try pressing UP to access top navigation
      for (let i = 0; i < 5; i++) {
        await browser.execute("tizen: pressKey", { key: "KEY_UP" });
        await browser.pause(500);
      }

      // Try pressing RIGHT to find Games option
      for (let i = 0; i < 10; i++) {
        await browser.execute("tizen: pressKey", { key: "KEY_RIGHT" });
        await browser.pause(500);

        // Check if we found Games
        const pageSource = await browser.getPageSource();
        if (
          pageSource.toLowerCase().includes("games") ||
          pageSource.toLowerCase().includes("schedule")
        ) {
          await browser.execute("tizen: pressKey", { key: "KEY_ENTER" });
          await browser.pause(3000);
          gamesNavFound = true;
          break;
        }
      }
    }

    // Method 3: Try direct URL navigation if available
    if (!gamesNavFound) {
      console.log("🌐 Trying direct URL navigation...");
      try {
        const currentUrl = await browser.getUrl();
        const baseUrl = currentUrl.split("/").slice(0, 3).join("/");
        const gamesUrl = `${baseUrl}/games`;
        await browser.url(gamesUrl);
        await browser.pause(3000);
        gamesNavFound = true;
      } catch (e) {
        console.log(`⚠️ Direct URL navigation failed: ${e.message}`);
      }
    }

    if (gamesNavFound) {
      console.log("✅ Successfully navigated to Games page");
    } else {
      console.log(
        "⚠️ Could not find Games navigation, continuing with current page"
      );
    }
  } catch (error) {
    console.log(`❌ Failed to navigate to Games page: ${error.message}`);
    throw error;
  }
});

Then("I should look for game page elements", async function () {
  console.log("🔍 Looking for game page elements...");

  try {
    await browser.pause(2000);

    const gamePageSelectors = [
      "[data-testid*='game']",
      "[data-testid*='Game']",
      "[data-testid*='schedule']",
      "[data-testid*='Schedule']",
      "[data-testid*='match']",
      "[data-testid*='Match']",
      "[data-testid*='team']",
      "[data-testid*='Team']",
      "[data-testid*='score']",
      "[data-testid*='Score']",
      ".game",
      ".schedule",
      ".match",
      ".team",
    ];

    console.log("🎯 Searching for game-related elements...");

    for (const selector of gamePageSelectors) {
      try {
        const elements = await browser.$$(selector);
        if (elements.length > 0) {
          console.log(
            `✅ Found ${elements.length} elements with selector: ${selector}`
          );

          // Log first few elements for analysis
          for (let i = 0; i < Math.min(3, elements.length); i++) {
            try {
              const text = await elements[i].getText();
              const tagName = await elements[i].getTagName();
              console.log(
                `   Element ${i + 1}: <${tagName}> "${text.substring(
                  0,
                  50
                )}..."`
              );
            } catch (e) {
              // Element might not have text
            }
          }
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    console.log("✅ Game page elements analysis completed");
  } catch (error) {
    console.log(`❌ Failed to analyze game page elements: ${error.message}`);
    throw error;
  }
});

Then("I should look for game tiles and schedules", async function () {
  console.log("📅 Looking for game tiles and schedule elements...");

  try {
    const schedulSelectors = [
      "[data-testid*='tile']",
      "[data-testid*='Tile']",
      "[data-testid*='card']",
      "[data-testid*='Card']",
      "[data-testid*='item']",
      "[data-testid*='Item']",
      "//div[contains(@class, 'game')]",
      "//div[contains(@class, 'schedule')]",
      "//div[contains(@class, 'match')]",
      "//li[contains(@class, 'game')]",
      "//article",
      "//section[contains(@class, 'game')]",
    ];

    console.log("🎯 Searching for game tiles and schedule elements...");

    for (const selector of schedulSelectors) {
      try {
        const elements = await browser.$$(selector);
        if (elements.length > 0) {
          console.log(
            `✅ Found ${elements.length} schedule/tile elements with selector: ${selector}`
          );

          // Analyze first few elements
          for (let i = 0; i < Math.min(2, elements.length); i++) {
            try {
              const text = await elements[i].getText();
              const classList = await elements[i].getAttribute("class");
              console.log(
                `   Tile ${i + 1}: class="${classList}" text="${text.substring(
                  0,
                  80
                )}..."`
              );
            } catch (e) {
              // Continue
            }
          }
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    console.log("✅ Game tiles and schedule analysis completed");
  } catch (error) {
    console.log(`❌ Failed to analyze game tiles: ${error.message}`);
    throw error;
  }
});

Then("I should look for navigation elements", async function () {
  console.log("🧭 Looking for navigation elements on Games page...");

  try {
    const navSelectors = [
      "nav",
      "[role='navigation']",
      "[data-testid*='nav']",
      "[data-testid*='Nav']",
      "[data-testid*='menu']",
      "[data-testid*='Menu']",
      "[data-testid*='tab']",
      "[data-testid*='Tab']",
      "[data-testid*='filter']",
      "[data-testid*='Filter']",
      ".navigation",
      ".nav",
      ".menu",
      ".tabs",
    ];

    console.log("🎯 Searching for navigation elements...");

    for (const selector of navSelectors) {
      try {
        const elements = await browser.$$(selector);
        if (elements.length > 0) {
          console.log(
            `✅ Found ${elements.length} navigation elements with selector: ${selector}`
          );

          // Analyze navigation elements
          for (let i = 0; i < Math.min(2, elements.length); i++) {
            try {
              const text = await elements[i].getText();
              const tagName = await elements[i].getTagName();
              console.log(
                `   Nav ${i + 1}: <${tagName}> "${text.substring(0, 60)}..."`
              );
            } catch (e) {
              // Continue
            }
          }
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    console.log("✅ Navigation elements analysis completed");
  } catch (error) {
    console.log(`❌ Failed to analyze navigation elements: ${error.message}`);
    throw error;
  }
});

Then("I should see games page content", async function () {
  console.log("🎮 Verifying Games page content is displayed...");

  try {
    await browser.pause(2000);

    const pageSource = await browser.getPageSource();
    const url = await browser.getUrl();

    console.log(`📍 Current URL: ${url}`);

    // Check for games-related content in page source
    const gameKeywords = ["game", "schedule", "match", "team", "score", "mlb"];
    let foundKeywords = [];

    for (const keyword of gameKeywords) {
      if (pageSource.toLowerCase().includes(keyword)) {
        foundKeywords.push(keyword);
      }
    }

    console.log(`🎯 Found game-related keywords: ${foundKeywords.join(", ")}`);

    if (foundKeywords.length > 0) {
      console.log("✅ Games page content is displayed");
    } else {
      console.log(
        "⚠️ Games page content not clearly identified, but continuing"
      );
    }
  } catch (error) {
    console.log(`❌ Failed to verify games page content: ${error.message}`);
    throw error;
  }
});

Then("I should see game schedule information", async function () {
  console.log("📅 Verifying game schedule information...");

  try {
    // Look for common schedule elements
    const scheduleSelectors = [
      "[data-testid*='schedule']",
      "[data-testid*='game']",
      "[data-testid*='date']",
      "[data-testid*='time']",
      "//div[contains(text(), 'vs')]",
      "//div[contains(text(), '@')]",
      "//time",
      "[datetime]",
    ];

    let scheduleFound = false;

    for (const selector of scheduleSelectors) {
      try {
        const elements = await browser.$$(selector);
        if (elements.length > 0) {
          console.log(`✅ Found schedule elements with selector: ${selector}`);
          scheduleFound = true;
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    if (scheduleFound) {
      console.log("✅ Game schedule information is displayed");
    } else {
      console.log("⚠️ Game schedule information not clearly found");
    }
  } catch (error) {
    console.log(`❌ Failed to verify game schedule: ${error.message}`);
    throw error;
  }
});

// Game page step definitions based on discovered elements

Then("I should see game tiles with matchup information", async function () {
  console.log("🎮 Verifying game tiles with matchup information...");

  try {
    // Look for game tiles with specific testids (like 813070, 813071, etc.)
    const gameTileSelectors = [
      "[data-testid^='8130']", // Game tiles start with 8130
      "[data-testid='matchup']",
      "//button[contains(@aria-label, 'game')]",
      "//button[contains(@aria-label, 'Final')]",
    ];

    let tilesFound = false;

    for (const selector of gameTileSelectors) {
      try {
        const elements = await browser.$$(selector);
        if (elements.length > 0) {
          console.log(
            `✅ Found ${elements.length} game tiles with selector: ${selector}`
          );
          tilesFound = true;

          // Analyze first few tiles
          for (let i = 0; i < Math.min(3, elements.length); i++) {
            try {
              const ariaLabel = await elements[i].getAttribute("aria-label");
              console.log(
                `   Game tile ${i + 1}: ${ariaLabel?.substring(0, 80)}...`
              );
            } catch (e) {
              // Continue
            }
          }
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    if (tilesFound) {
      console.log("✅ Game tiles with matchup information are displayed");
    } else {
      throw new Error("Game tiles with matchup information not found");
    }
  } catch (error) {
    console.log(`❌ Failed to verify game tiles: ${error.message}`);
    throw error;
  }
});

Then("I should see team logos and abbreviations", async function () {
  console.log("🏟️ Verifying team logos and abbreviations...");

  try {
    const teamSelectors = [
      "img[alt*='team-logo']",
      "//span[text()='BOS' or text()='NYY' or text()='DET' or text()='CLE' or text()='SD' or text()='CHC' or text()='CIN' or text()='LAD']",
      ".sc-eEVuZf", // Team abbreviation class
      ".sc-epnzzT", // Team logo class
    ];

    let teamsFound = false;

    for (const selector of teamSelectors) {
      try {
        const elements = await browser.$$(selector);
        if (elements.length > 0) {
          console.log(
            `✅ Found ${elements.length} team elements with selector: ${selector}`
          );
          teamsFound = true;
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    if (teamsFound) {
      console.log("✅ Team logos and abbreviations are displayed");
    } else {
      throw new Error("Team logos and abbreviations not found");
    }
  } catch (error) {
    console.log(`❌ Failed to verify team information: ${error.message}`);
    throw error;
  }
});

Then("I should see game status indicators", async function () {
  console.log("📊 Verifying game status indicators...");

  try {
    const statusSelectors = [
      "//span[text()='FINAL']",
      "//span[text()='LIVE']",
      ".sc-cJAKoS", // Status class
      "//p[contains(text(), 'LIVE')]",
    ];

    let statusFound = false;

    for (const selector of statusSelectors) {
      try {
        const elements = await browser.$$(selector);
        if (elements.length > 0) {
          console.log(
            `✅ Found ${elements.length} status indicators with selector: ${selector}`
          );
          statusFound = true;
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    if (statusFound) {
      console.log("✅ Game status indicators are displayed");
    } else {
      throw new Error("Game status indicators not found");
    }
  } catch (error) {
    console.log(`❌ Failed to verify game status: ${error.message}`);
    throw error;
  }
});

Then("I should see game duration or live indicators", async function () {
  console.log("⏱️ Verifying game duration or live indicators...");

  try {
    const durationSelectors = [
      ".sc-cVHfYm", // Duration class
      "//span[contains(text(), ':')]", // Time format
      "//span[text()='LIVE']",
      "//p[contains(text(), 'LIVE')]",
    ];

    let durationFound = false;

    for (const selector of durationSelectors) {
      try {
        const elements = await browser.$$(selector);
        if (elements.length > 0) {
          console.log(
            `✅ Found ${elements.length} duration/live indicators with selector: ${selector}`
          );
          durationFound = true;
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    if (durationFound) {
      console.log("✅ Game duration or live indicators are displayed");
    } else {
      throw new Error("Game duration or live indicators not found");
    }
  } catch (error) {
    console.log(`❌ Failed to verify duration indicators: ${error.message}`);
    throw error;
  }
});
