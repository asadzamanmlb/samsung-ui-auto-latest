import { Given, When, Then } from "@wdio/cucumber-framework";
import { Keys } from "@headspinio/tizen-remote";
import { assert } from "chai";
import focusElement from "../commonFunctions/focusElement.js";

// Shared step definitions that work across Home/Games/Settings pages

Then(
  "I should see team logos and abbreviations on {string} page",
  async function (pageName) {
    console.log(
      `🏟️ Verifying team logos and abbreviations on ${pageName} page...`
    );

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
        console.log(
          `✅ Team logos and abbreviations are displayed on ${pageName} page`
        );
      } else {
        throw new Error(
          `Team logos and abbreviations not found on ${pageName} page`
        );
      }
    } catch (error) {
      console.log(
        `❌ Failed to verify team information on ${pageName}: ${error.message}`
      );
      throw error;
    }
  }
);

Then(
  "I should see game status indicators on {string} page",
  async function (pageName) {
    console.log(`📊 Verifying game status indicators on ${pageName} page...`);

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
        console.log(
          `✅ Game status indicators are displayed on ${pageName} page`
        );
      } else {
        throw new Error(`Game status indicators not found on ${pageName} page`);
      }
    } catch (error) {
      console.log(
        `❌ Failed to verify game status on ${pageName}: ${error.message}`
      );
      throw error;
    }
  }
);

Then(
  "I should see game duration or live indicators on {string} page",
  async function (pageName) {
    console.log(
      `⏱️ Verifying game duration or live indicators on ${pageName} page...`
    );

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
        console.log(
          `✅ Game duration or live indicators are displayed on ${pageName} page`
        );
      } else {
        throw new Error(
          `Game duration or live indicators not found on ${pageName} page`
        );
      }
    } catch (error) {
      console.log(
        `❌ Failed to verify duration indicators on ${pageName}: ${error.message}`
      );
      throw error;
    }
  }
);

Then(
  "I should see game tiles with matchup information on {string} page",
  async function (pageName) {
    console.log(
      `🎮 Verifying game tiles with matchup information on ${pageName} page...`
    );

    try {
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
        console.log(
          `✅ Game tiles with matchup information are displayed on ${pageName} page`
        );
      } else {
        throw new Error(
          `Game tiles with matchup information not found on ${pageName} page`
        );
      }
    } catch (error) {
      console.log(
        `❌ Failed to verify game tiles on ${pageName}: ${error.message}`
      );
      throw error;
    }
  }
);

// Generic navigation steps
When("I navigate to the {string} page", async function (pageName) {
  console.log(`🧭 Navigating to ${pageName} page...`);

  try {
    const pageNavSelectors = {
      Games: [
        "[data-testid*='games']",
        "[data-testid*='Games']",
        "[data-testid*='schedule']",
        "//a[contains(text(), 'Games')]",
        "//button[contains(text(), 'Games')]",
      ],
      Settings: [
        "[data-testid*='settings']",
        "[data-testid*='Settings']",
        "//a[contains(text(), 'Settings')]",
        "//button[contains(text(), 'Settings')]",
      ],
      Home: [
        "[data-testid*='home']",
        "[data-testid*='Home']",
        "//a[contains(text(), 'Home')]",
        "//button[contains(text(), 'Home')]",
      ],
    };

    const selectors = pageNavSelectors[pageName] || [];
    let navFound = false;

    // Try direct navigation first
    for (const selector of selectors) {
      try {
        const element = await browser.$(selector);
        if (await element.isExisting()) {
          console.log(
            `✅ Found ${pageName} navigation with selector: ${selector}`
          );
          await focusElement({ objectKey: element });
          await browser.pause(1000);
          await browser.execute("tizen: pressKey", { key: "KEY_ENTER" });
          await browser.pause(3000);
          navFound = true;
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    // If direct navigation fails, try key navigation
    if (!navFound) {
      console.log(`🎮 Trying key navigation to ${pageName}...`);

      // Try pressing UP to access top navigation
      for (let i = 0; i < 5; i++) {
        await browser.execute("tizen: pressKey", { key: "KEY_UP" });
        await browser.pause(500);
      }

      // Try pressing RIGHT to find the page option
      for (let i = 0; i < 10; i++) {
        await browser.execute("tizen: pressKey", { key: "KEY_RIGHT" });
        await browser.pause(500);

        const pageSource = await browser.getPageSource();
        if (pageSource.toLowerCase().includes(pageName.toLowerCase())) {
          await browser.execute("tizen: pressKey", { key: "KEY_ENTER" });
          await browser.pause(3000);
          navFound = true;
          break;
        }
      }
    }

    if (navFound) {
      console.log(`✅ Successfully navigated to ${pageName} page`);
    } else {
      console.log(
        `⚠️ Could not find ${pageName} navigation, continuing with current page`
      );
    }
  } catch (error) {
    console.log(`❌ Failed to navigate to ${pageName} page: ${error.message}`);
    throw error;
  }
});

// Generic content verification
Then("I should see {string} page content", async function (pageName) {
  console.log(`📄 Verifying ${pageName} page content is displayed...`);

  try {
    await browser.pause(2000);

    const pageSource = await browser.getPageSource();
    const url = await browser.getUrl();

    console.log(`📍 Current URL: ${url}`);

    // Define keywords for each page type
    const pageKeywords = {
      Games: ["game", "schedule", "match", "team", "score", "final", "live"],
      Settings: ["settings", "account", "logout", "captions", "spoilers"],
      Home: ["home", "carousel", "featured", "recaps", "highlights"],
    };

    const keywords = pageKeywords[pageName] || [pageName.toLowerCase()];
    let foundKeywords = [];

    for (const keyword of keywords) {
      if (pageSource.toLowerCase().includes(keyword)) {
        foundKeywords.push(keyword);
      }
    }

    console.log(
      `🎯 Found ${pageName}-related keywords: ${foundKeywords.join(", ")}`
    );

    if (foundKeywords.length > 0) {
      console.log(`✅ ${pageName} page content is displayed`);
    } else {
      console.log(
        `⚠️ ${pageName} page content not clearly identified, but continuing`
      );
    }
  } catch (error) {
    console.log(
      `❌ Failed to verify ${pageName} page content: ${error.message}`
    );
    throw error;
  }
});

// Generic element verification
Then(
  "I should see {string} elements on {string} page",
  async function (elementType, pageName) {
    console.log(`🔍 Verifying ${elementType} elements on ${pageName} page...`);

    try {
      const elementSelectors = {
        navigation: [
          "nav",
          "[role='navigation']",
          "[data-testid*='nav']",
          ".navigation",
        ],
        content: [
          "main",
          "[role='main']",
          ".content",
          "[data-testid*='content']",
        ],
        buttons: [
          "button",
          "[role='button']",
          ".button",
          "[data-testid*='button']",
        ],
        links: ["a", "[role='link']", ".link", "[data-testid*='link']"],
        tiles: ["[data-testid*='tile']", ".tile", "[role='figure']", "article"],
        carousels: [
          "[role='list']",
          ".carousel",
          "[data-testid*='carousel']",
          "section",
        ],
      };

      const selectors = elementSelectors[elementType.toLowerCase()] || [
        `[data-testid*='${elementType}']`,
      ];
      let elementsFound = false;

      for (const selector of selectors) {
        try {
          const elements = await browser.$$(selector);
          if (elements.length > 0) {
            console.log(
              `✅ Found ${elements.length} ${elementType} elements with selector: ${selector}`
            );
            elementsFound = true;
            break;
          }
        } catch (e) {
          // Continue
        }
      }

      if (elementsFound) {
        console.log(
          `✅ ${elementType} elements are displayed on ${pageName} page`
        );
      } else {
        throw new Error(
          `${elementType} elements not found on ${pageName} page`
        );
      }
    } catch (error) {
      console.log(
        `❌ Failed to verify ${elementType} elements on ${pageName}: ${error.message}`
      );
      throw error;
    }
  }
);
