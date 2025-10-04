import { Given, When, Then } from "@wdio/cucumber-framework";
import { assert } from "chai";
import { qaTestUsers, devTestUsers } from "../../testUsers.js";
import findElementByTextOrXpathOrObjectKey from "../commonFunctions/findElementByTextOrXpathOrObjectKey.js";
import clickElementByTextOrXpathOrObjectKey from "../commonFunctions/clickElementByTextOrXpathOrObjectKey.js";
import globalObjectKeyFinder from "../commonFunctions/globalObjectKeyFinder.js";
import homePageObject from "../pageobjects/home/homePage.object.js";
import gamesPageObject from "../pageobjects/games/gamesPage.object.js";
import clickElement from "../commonFunctions/clickElement.js";
import mouseOverToElement from "../commonFunctions/mouseOverToElement.js";

const testUsers = process.env.ENV === "QA" ? qaTestUsers : devTestUsers;

import { $, browser } from "@wdio/globals";

Then("The page should display {string} text", async function (expectedText) {
  const pageSource = await browser.getPageSource();
  expect(
    pageSource.includes(expectedText),
    "String not found in the source code"
  ).to.be.true;
});

Then("I should see {string}", async function (objectKey) {
  console.log(objectKey);

  await browser.waitUntil(
    async () => {
      const newElement = await (await globalObjectKeyFinder(objectKey))();
      return newElement.isExisting();
    },
    {
      timeout: 20000, // Adjust timeout as needed
      timeoutMsg: `failed to find ${objectKey} within the timeout period`,
    }
  );
});

Then(
  /^I (should|should not) see ["'](.*?)["'] ["'](.*?)["']$/,
  async function (condition, objectKey, freetext) {
    console.log(objectKey);
    console.log(freetext);
    await browser.waitUntil(
      async () => {
        const newElement = await (await globalObjectKeyFinder(objectKey))();
        const isExisting = await newElement.isExisting();

        if (condition === "should") {
          return isExisting;
        } else {
          return !isExisting;
        }
      },
      {
        timeout: 20000, // Adjust timeout as needed
        timeoutMsg: `Element ${objectKey} visibility condition '${condition}' not met within the timeout period`,
      }
    );
  }
);

Then(
  /^I should see ["'](.*?)["'] (text|email)$/,
  async function (expectedText, type) {
    if (type === "email") {
      expectedText = testUsers[expectedText];
    }
    let selector = `//*[text()='${expectedText}']`;
    let element = await $(selector);
    await element.waitForExist(1000);
  }
);

Then(
  /^I should see ["'](.*?)["'] (text|email) contains$/,
  async function (expectedText, type) {
    if (type === "email") {
      expectedText = testUsers[expectedText];
    }
    let selector = `//*[contains(text(),'${expectedText}')]`;
    let element = await $(selector);
    await element.waitForExist(1000);
  }
);

// MAKE SURE TO USE DOUBLE QUOTES, SINGLE QUOTES WILL NOT WORK, AND ADDING WILL ONLY MAKE THE REGEX HARDER TO READ.
Then(
  /^I should see the text "([^"]+)"(?:\s+(and|or)\s+"([^"]+)")?$/,
  async function (expectedText1, operator, expectedText2) {
    // Determine the operator type based on the input
    let xpathCondition = "";
    console.log(
      `############################### ${operator}, ${expectedText2}`
    );

    if (operator && operator.toLowerCase() === "and") {
      xpathCondition = `contains(text(), "${expectedText1}") and contains(text(), "${expectedText2}")`;
    } else if (operator && operator.toLowerCase() === "or") {
      xpathCondition = `contains(text(), "${expectedText1}") or contains(text(), "${expectedText2}")`;
    } else {
      xpathCondition = `contains(text(), "${expectedText1}")`;
    }

    // Constructing the final XPath query
    const selector = `//*[${xpathCondition}]`;

    console.log(`XPath Selector: ${selector}`); // Debug log to check the final XPath

    await findElementByTextOrXpathOrObjectKey({ xpath: selector });
  }
);

Then("I should NOT see the text {string}", async function (expectedText) {
  await browser.setWindowSize(1280, 720);
  // TV scaling removed
  const selector = `//*[contains(text(),"${expectedText}")]`;
  const element = await browser.$$(selector);

  // Check if the element is visible
  assert.ok(
    element.length < 1,
    "the element was visible even though it was NOT supposed to be"
  );
});

When("I click on {string}", async function (objectKey) {
  await clickElementByTextOrXpathOrObjectKey(
    await (
      await globalObjectKeyFinder(objectKey)
    )()
  );
});

//Free text is not used for now, but can be enabled if needed
When(
  /I select the ["'](.*?)["'] (link|button|tab).*/,
  async function (selection, elementType) {
    console.log(elementType);
    if ((await $(".onetrust-pc-dark-filter")).isExisting()) {
      /* empty */
    }
    (await $(`//*[text()="${selection}"]`)).click();
  }
);

When("I wait for {string} to be displayed", async function (objectKey) {
  await browser.waitUntil(
    async () => {
      const newElement = await (await globalObjectKeyFinder(objectKey))();
      return newElement.isExisting();
    },
    {
      timeout: 5000, // Adjust timeout as needed
      timeoutMsg: `failed to find ${objectKey} within the timeout period`,
    }
  );
});

When("I click on {string}", async function (objectKey) {
  await clickElementByTextOrXpathOrObjectKey(
    await (
      await globalObjectKeyFinder(objectKey)
    )()
  );
});

When(
  /I select the ["'](.*?)["'] (link|button|tab).*/,
  async function (selection, elementType) {
    console.log(elementType);
    if ((await $(".onetrust-pc-dark-filter")).isExisting()) {
      /* empty */
    }
    (await $(`//*[text()="${selection}"]`)).click();
  }
);

When("I wait for {string} to be displayed", async function (objectKey) {
  await browser.waitUntil(
    async () => {
      const newElement = await (await globalObjectKeyFinder(objectKey))();
      return newElement.isExisting();
    },
    {
      timeout: 5000, // Adjust timeout as needed
      timeoutMsg: `failed to find ${objectKey} within the timeout period`,
    }
  );
});

When(
  "I press {string} {string}",
  async function (keyboardBtn, whateverIwannaSay) {
    console.log(whateverIwannaSay);
    // expected the proper keyboardBtn = ['Enter','ArrowUp'...]
    await browser.keys(keyboardBtn);
  }
);

When(
  /^I press ["'](.*?)["'] ["'](.*?)["'] (times|time) ["'](.*?)["']$/,
  async function (keyboardBtn, countOfTimes, numberOfTime, whateverIwannaSay) {
    console.log(whateverIwannaSay);
    console.log(numberOfTime);
    for (let index = 0; index < parseInt(countOfTimes); index++) {
      await browser.pause(1000);
      await browser.keys(keyboardBtn);
    }
  }
);

When(
  "I press {string} {string} times",
  async function (keyboardBtn, countOfTimes) {
    for (let index = 0; index < parseInt(countOfTimes); index++) {
      await browser.keys(keyboardBtn);
    }
  }
);

When(
  /^I click on the ["'](.*?)["'] (link|button|tab|tile)$/,
  async (text, elementType) => {
    console.log(elementType);
    if (text !== "thisButtonDoesntExist") {
      await clickElementByTextOrXpathOrObjectKey({ text: text });
    } else {
      console.log("thisButtonDoesntExist");
    }
  }
);

When(
  /^I hover over to ["'](.*?)["'] (link|button|tab|tile)$/,
  async (text, elementType) => {
    console.log(elementType);
    if (text !== "thisButtonDoesntExist") {
      await mouseOverToElement({ text: text });
    } else {
      console.log("thisButtonDoesntExist");
    }
  }
);

When(/^I click ["'](.*?)["']$/, async (text) => {
  if (text !== "thisButtonDoesntExist") {
    await clickElement({ text: text });
  } else {
    console.log("thisButtonDoesntExist");
  }
});

When(
  /^I click ["'](.*?)["'] (link|button|tab|tile|game tile)$/,
  async (objectKey, elementType) => {
    console.log(elementType);
    const newElement = await (await globalObjectKeyFinder(objectKey))();
    await newElement.click();
    await browser.keys("Enter");
  }
);

When(
  /^I wait and click ["'](.*?)["'] (link|button|tab|tile|game tile)$/,
  async (objectKey, elementType) => {
    console.log(elementType);
    const newElement = await (await globalObjectKeyFinder(objectKey))();
    await newElement.waitForExist({ timeout: 5000 });
    await browser.pause(1000); // Need to research and see why hard pausing needed for FOX feed
    console.log(`Clicking on element with object key: ${objectKey}`);
    await newElement.click();
    await browser.keys("Enter");
  }
);

When(
  /^I click ["'](.*?)["'] (link|button|tab|tile|game tile) ["'](.*?)["']$/,
  async (objectKey, elementType, freeText) => {
    console.log(elementType);
    console.log(freeText);
    try {
      const newElement = await (await globalObjectKeyFinder(objectKey))();
      if (await newElement.isExisting()) {
        await newElement.waitForExist({ timeout: 5000 });
        await newElement.waitForDisplayed({ timeout: 5000 });
        await newElement.click();
        await browser.keys("Enter");
      } else {
        console.error(`Element with object key '${objectKey}' does not exist`);
      }
    } catch (error) {
      console.error(
        `Error interacting with element '${objectKey}': ${error.message}`
      );
    }
  }
);

When(
  /^I click ["'](.*?)["'] or ["'](.*?)["'] (link|button|tab|tile|game tile)$/,
  async (objectKey1, objectKey2, elementType) => {
    console.log(elementType);
    const newElement1 = await (await globalObjectKeyFinder(objectKey1))();
    const newElement2 = await (await globalObjectKeyFinder(objectKey2))();

    if (await newElement1.isExisting()) {
      await newElement1.waitForExist({ timeout: 5000 });
      await newElement1.waitForDisplayed({ timeout: 5000 });
      await newElement1.click();
      await browser.keys("Enter");
    } else {
      if (await newElement2.isExisting()) {
        await newElement2.waitForExist({ timeout: 5000 });
        await newElement2.waitForDisplayed({ timeout: 5000 });
        await newElement2.click();
        await browser.keys("Enter");
      } else {
        throw new Error(`Neither ${objectKey1} nor ${objectKey2} found`);
      }
    }
  }
);

When(
  /^I click Upgrade to mlb or Feed button based on break glass mode on or off$/,
  async () => {
    const upgradeMlbTvButton = await browser.$$(
      '//*[@data-testid="upgradeMlbTvButton"]'
    ); // Check if feed button is present
    const feed = await browser.$$(
      "(//*[contains(@data-testid,'streamSelection')]//span[contains(@data-testid,'feedButton')])[1]"
    ); // Check if feed button is present

    if (upgradeMlbTvButton.length > 0) {
      console.log("Upgrade MLB TV found.");
      clickElement({ xpath: '//*[@data-testid="upgradeMlbTvButton"]' });
    }
    if (feed.length > 0) {
      console.log("Feed button found.");
      clickElement({
        xpath:
          "(//*[contains(@data-testid,'streamSelection')]//span[contains(@data-testid,'feedButton')])[1]",
      });
    }
  }
);

When(/^I click ["'](.*?)["'] game tile by gamePk$/, async (gamePk) => {
  const gameTileByGamePk = await (
    await globalObjectKeyFinder("Game Tile by Game Pk")
  )(gamePk); // using global
  await gameTileByGamePk.click();
  await browser.keys("Enter");
});

Then(
  "I check the current element to have {string} text",
  async function (text) {
    await browser.execute(eval(() => document.activeElement.click()));
    const currentElementText = await browser.execute(
      eval(() => document.activeElement.textContent)
    );
    assert.ok(
      currentElementText.includes(text),
      `the text "${text}" was not matching the text content of activeElement::"${currentElementText}"`
    );
  }
);

Then("debug display current active element text on console", async function () {
  await browser.execute(eval(() => document.activeElement.click()));
  const currentElementText = await browser.execute(
    eval(() => document.activeElement.textContent)
  );
  console.log("#" * 100);
  console.log("#" * 100);
  console.log(currentElementText);
  console.log("#" * 100);
  console.log("#" * 100);
});

Then("I should see app exited successfully", async function () {
  //TODO: Will Implement this step
});

When("I check if the buffer screen passed", async function () {
  // delay before buffer
  const selector = `//*[@data-testid='spinner']`;

  // Wait until the spinner is no longer displayed
  await $(selector).waitForDisplayed({
    reverse: true,
    timeout: 30000, // You can adjust the timeout value as needed
    timeoutMsg: "Spinner is still displayed after 30 seconds",
  });
  // delay after buffer
});

//select FINAL/Free Game
When(
  "I select {string} game from game page for {string}",
  async (gameType, userType) => {
    await browser.keys("ArrowDown");
    await browser.keys("ArrowDown");

    let gameTilesCount = await browser.$$(
      "//*[@data-testid='gameTileGrid']//button"
    ).length;

    let maxAttempts = 10; // Define a maximum number of attempts to avoid infinite loop
    let attempts = 0;

    let gameFound = false; // Flag to determine if any valid game is found

    if (gameType === "Non Free") {
      gameType = "FINAL";
    }

    while (!gameFound || gameTilesCount < 1) {
      console.log(
        `Value of Games Found or not : ${gameFound} and Value of Game Tiles Count : ${gameTilesCount}`
      );
      if (attempts >= maxAttempts) {
        console.log("Max attempts reached, breaking the loop.");
        break;
      }

      // Check if any game tile is found
      if (gameTilesCount > 0) {
        console.log(`Game Tiles Count : ${gameTilesCount}`);
        for (let i = 0; i < gameTilesCount; i++) {
          const expectedGameFound = await browser.$$(
            `//*[@data-testid='gameTileGrid']//button[${
              i + 1
            }]//*[text()="${gameType}"]`
          );
          if (expectedGameFound.length > 0) {
            console.log(
              `Expected game found for ${gameType} game for ${userType}`
            );
            if (userType === "Anonymous User") {
              console.log(`Playing ${gameType} game for ${userType}`);
              await clickElement({
                xpath: `//*[@data-testid='gameTileGrid']//button[${i + 1}]`,
              });
              const getMlvTvButton = await browser.$$(
                `//*[contains(@data-testid,"getMlbTvButton")]`
              );
              if (getMlvTvButton.length > 0) {
                console.log(
                  `Click on Get MLB TV Button for ${gameType} game for ${userType}`
                );
                await clickElement({
                  xpath: `//*[contains(@data-testid,"getMlbTvButton")]`,
                });
                gameFound = true;
                console.log(
                  `Game found ${gameFound} for ${gameType} game for ${userType}. Break the loop`
                );
                break;
              }
            }
            if (gameType === "FINAL") {
              const isFreeGame =
                (await browser.$$(
                  `//*[@data-testid='gameTileGrid']//button[${
                    i + 1
                  }]//*[contains(text(), "Free")]`
                ).length) > 0;
              console.log(`Free Game:  ${isFreeGame}`);
              // Check if the game is FINAL but not Free
              if (!isFreeGame) {
                console.log(`Game is FINAL and not Free for ${userType}`);
                await clickElement({
                  xpath: `//*[@data-testid='gameTileGrid']//button[${i + 1}]`,
                });

                if (userType === "Free User") {
                  console.log("Now inside Free User check.");
                  const upgradeMLBButton = await gamesPageObject[
                    "Upgrade MLB.TV"
                  ]();
                  if (await upgradeMLBButton.isExisting()) {
                    console.log(
                      "Breakglass mode off: Upgrade MLB TV Button found."
                    );
                    await clickElement({ objectKey: upgradeMLBButton });
                    gameFound = true;
                    console.log(
                      `Clicked Upgrade MLB TV Button - ${gameType} game for ${userType}. Break the loop`
                    );
                    break;
                  } else {
                    console.log(
                      `Upgrade MLB TV button not found for ${userType}`
                    );
                  }
                  const feedButton = await gamesPageObject["Feed"]();
                  if (await feedButton.isExisting()) {
                    console.log("Breakglass mode on: Feed Button found.");
                    await clickElement({ objectKey: feedButton });

                    const resumeButton = await gamesPageObject["Resume"]();
                    if (await resumeButton.isExisting()) {
                      console.log(
                        `Resume button found for ${gameType} and ${userType}`
                      );
                      await clickElement({ objectKey: resumeButton });
                    }

                    const notEntitledModal =
                      await homePageObject.NotEntitledModal();
                    if (await notEntitledModal.isExisting()) {
                      console.log(
                        `Non Entitled screen found for ${gameType} game for ${userType}. Break the loop`
                      );
                    }
                    gameFound = true;
                    break;
                  } else {
                    console.log(`Feed button not found for ${userType}`);
                  }
                } else {
                  console.log(`Not Free User ${userType}`);
                  const upgradeMLBButton = await gamesPageObject[
                    "Upgrade MLB.TV"
                  ]();
                  if (await upgradeMLBButton.isExisting()) {
                    console.log(
                      "Breakglass mode off: Upgrade MLB TV Button found."
                    );
                    await clickElement({ objectKey: upgradeMLBButton });
                    gameFound = true;
                    console.log(
                      `Clicked Upgrade MLB TV Button - ${gameType} game for ${userType}. Break the loop`
                    );
                    break;
                  }
                  const feedButton = await browser.$$(
                    '(//*[contains(@data-testid,"streamSelection")]//span[contains(@data-testid,"feedButton")])[1]'
                  ); // Check if feed button is present
                  if (feedButton.length > 0) {
                    console.log("Feed button found for non Free User.");
                    await clickElement({
                      xpath:
                        '(//*[contains(@data-testid,"streamSelection")]//span[contains(@data-testid,"feedButton")])[1]',
                    });

                    const resumeButton = await browser.$$(
                      '//*[contains(@data-testid,"resumeLink")]'
                    ); // Check if resume button is present
                    if (resumeButton.length > 0) {
                      console.log(
                        `Resume button found. Playing ${gameType} game for ${userType}`
                      );
                      await clickElement({
                        xpath: '//*[contains(@data-testid,"resumeLink")]',
                      });
                    }
                    gameFound = true;
                    console.log(
                      `Game found ${gameFound} for ${gameType} game for ${userType}. Break the loop`
                    );
                    break;
                  }
                } //feed button check ends for non free user
              } //FINAL game check ends
              else {
                console.log(`Game is not FINAL for ${userType}`);
              }
            } //isFinalGame check ends

            if (gameType === "Free") {
              const isFreeGame =
                (await browser.$$(
                  `//*[@data-testid='gameTileGrid']//button[${
                    i + 1
                  }]//*[contains(text(), "Free")]`
                ).length) > 0;
              console.log(`Free Game:  ${isFreeGame}`);
              if (isFreeGame) {
                console.log(`Game is Free for ${userType}`);
                await clickElement({
                  xpath: `//*[@data-testid='gameTileGrid']//button[${i + 1}]`,
                });

                const feedButton = await browser.$$(
                  '(//*[contains(@data-testid,"streamSelection")]//span[contains(@data-testid,"feedButton")])[1]'
                ); // Check if feed button is present
                if (feedButton.length > 0) {
                  await clickElement({
                    xpath:
                      '(//*[contains(@data-testid,"streamSelection")]//span[contains(@data-testid,"feedButton")])[1]',
                  });

                  const resumeButton = await browser.$$(
                    '//*[contains(@data-testid,"resumeLink")]'
                  ); // Check if resume button is present
                  if (resumeButton.length > 0) {
                    console.log(
                      `Resume button found. Playing ${gameType} game for ${userType}`
                    );
                    await clickElement({
                      xpath: '//*[contains(@data-testid,"resumeLink")]',
                    });
                  }
                  gameFound = true;
                  console.log(
                    `Game found ${gameFound} for ${gameType} game for ${userType}. Break the loop`
                  );
                  break;
                } else {
                  console.log(`Feed button not found for ${userType}`);
                } //feed button check ends
              } //isFreeGame check ends
              else {
                console.log(`Game is either not Free for ${userType}`);
              } //gameType check ends FINAL or Free
            } //gameType check ends
          } //if game found ends. FINAL or Free
        } //for loop ends
      } //if gameTilesCount ends

      //if games tiles are not found, then navigate to previous day
      if (gameTilesCount.length < 1 || !gameFound) {
        console.log(
          `Grid tiles count : ${gameTilesCount.length}. Games found : ${gameFound}`
        );
        await clickElement({
          xpath: "//button[@data-testid='dateNavigatorPrevDateButton']",
        });
        console.log("Navigating to previous day to find the game");
        await browser.keys("ArrowDown");
        await browser.keys("ArrowDown");
        gameTilesCount = await browser.$$(
          "//*[@data-testid='gameTileGrid']//button"
        ).length; // Update the count
      }
      attempts++;
    }
  }
);
