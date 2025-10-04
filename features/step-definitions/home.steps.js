import { Given, When, Then } from '@wdio/cucumber-framework';
import { assert} from 'chai';
import findElementByTextOrXpathOrObjectKey from '../commonFunctions/findElementByTextOrXpathOrObjectKey.js'
import clickElementByTextOrXpathOrObjectKey from '../commonFunctions/clickElementByTextOrXpathOrObjectKey.js'
import globalObjectKeyFinder from '../commonFunctions/globalObjectKeyFinder.js';
import clickElement from '../commonFunctions/clickElement.js';
import findCarouselByText from '../commonFunctions/findCarouselByText.js';
import homePageObject from '../pageobjects/home/homePage.object.js'
import mediaPlayerPageObject from "../pageobjects/mediaPlayer/mediaPlayerPage.object.js";

import { $, browser } from "@wdio/globals";

let timeFromCarouselTile = null;

Given("I launch the MLB.TV app", async function () {
  await browser.url("");
  await browser.waitUntil(
    () => browser.execute(() => document.readyState === "complete"),
    {
      timeout: 10 * 1000, // 10 seconds
      timeoutMsg: "Page not loading",
    }
  );
  const selector = `//*[text()='Getting Started']`;
  await $(selector).waitForDisplayed({
    reverse: true,
    timeout: 60000, // You can adjust the timeout value as needed
    timeoutMsg: "Getting Started is still displayed after 10 seconds",
  });
});

Given("I bypass the onboarding flow", async () => {
  await clickElement({ text: "Getting Started" });
  await clickElement({ text: "Skip" });
  await clickElement({ text: "Skip" });
  await clickElement({ text: "Explore Free Content" });
});

When("I navigate to {string} carousel", async function (carousel) {
  findElementByTextOrXpathOrObjectKey({ text: carousel });
});

When(
  "I navigate to Game carousel",
  async function () {
    await findCarouselByText({ text: "Today's Lineup" });
  }
);

Then(
  "I verify the Home button is displayed",
  async function () {
    await browser.waitUntil(
      async () => {
        const newElement = await homePageObject.Home();
        return newElement.isExisting();
      },
      {
        timeout: 5000, // Adjust timeout as needed
        timeoutMsg: `failed to find Home button within the timeout period`,
      }
    );
  }
);

When(
  "I navigate to well known {string} carousel and click non live tile from carousel",
  async function (carouselType) {
    // MLB Carousel list in order of preference
    const mlbCarouselList = [
      "MLB Most Popular",
      "Get Caught Up",
      "MLB Network",
      "World Baseball Classic",
      "Top Prospects",
      "Featured on MLB.TV",
      "MLB Vault",
      "MLB Network Presents",
    ];

    if (carouselType === "SVOD") {
      let successfulCarousel = null;

      // Iterate through carousels
      for (const carouselName of mlbCarouselList) {
        try {
          console.log(`Attempting to find carousel: ${carouselName}`);

          // Find carousel by text
          await findCarouselByText({ text: carouselName });

          let tileNum = 1;
          let tileFromCarousel = await $(
            `(//h2[text()="${carouselName}"]/following-sibling::div//li//button)[${tileNum}]`
          );

          // Check if the tile contains the text "LIVE"
          const isLiveTextPresent = await $(
            `(//h2[text()="${carouselName}"]/following-sibling::div//li//button)[${tileNum}]//*[contains(text(), 'LIVE')]`
          ).isExisting();

          if (isLiveTextPresent) {
            console.log(`LIVE text found in tile ${tileNum}. Skipping to the next carousel.`);
            continue; // Skip to the next carousel in the list
          }

          // Click the selected tile
          await clickElement({ objectKey: tileFromCarousel });

          // Mark successful carousel
          successfulCarousel = carouselName;

          console.log(`Successfully navigated to carousel: ${carouselName}`);
          break; // Exit the loop after successfully navigating to a carousel
        } catch (error) {
          console.warn(`Skipping carousel "${carouselName}": ${error.message}`);
          continue; // Skip to the next carousel in case of an error
        }
      }

      // Throw error if no carousel was found
      if (!successfulCarousel) {
        throw new Error("Could not find any MLB carousels");
      }
    }
  }
);

When("I navigate to {string} {string}", async function (objectKey, freeText) {
  console.log(freeText)
  globalObjectKeyFinder({ objectKey: objectKey });
});

When("I navigate to {string} tile", async function (tile) {
  findElementByTextOrXpathOrObjectKey({ text: tile });
});

Then("I check if this tile has a lockIcon", async function () {
  async function haveLockIcon() {
    return await browser.execute(
      eval(
        () =>
          document.activeElement.querySelector('[data-testid="lockIcon"]') !==
          null
      )
    );
  }
  assert.isTrue(await haveLockIcon(), "This tile did not have a lockIcon");
});

Then(
  "I {string} see lockIcon on {string} carousel",
  async function (auth, carousel) {
    const lockIcon = await browser.$$(
      `(//h2[text()="${carousel}"]/following-sibling::div//li//button)[1]//div[1]//*[@data-testid='lockIcon']`
    ); // Check if lockicon is there, meaning no broadcast available
    if (auth.toLowerCase() === "should") {
      assert.isTrue(lockIcon.length > 0, "This tile did not have a lockIcon");
    } else {
      assert.isFalse(lockIcon.length > 0, "This tile had a lockIcon");
    }
  }
);

Then(
  "I navigate to the {string} item in the table of {string}",
  async (num, carousel) => {
    // Locate the table using XPath
    num = parseInt(num);
    const element = await $(
      `(//h2[text()="${carousel}"]/following-sibling::div//li//button)[${num}]`
    );
    timeFromCarouselTile = await $(
      `(//h2[text()="${carousel}"]/following-sibling::div//li//button)[${num}]//div[1]/..//span`
    ).getText();
    await clickElement({ objectKey: element });
  }
);

Then(
  "I verify {string} {string} be able to play the {string} game",
  async function (userType, auth, gameType) {
    console.log(gameType);
    if (auth.toLowerCase() === "should") {
      const element = await $("//span[text()='CC']");
      await element.waitForDisplayed(60000); // this is the assertion
    } else if (userType === "Anonymous User") {
      const element =
        await homePageObject["Pay Wall - Yearly Monthly Toggle"](
          "paywallCarousel"
        );
      await element.waitForDisplayed(60000); // this is the assertion
    } else {
      const notEntitledModal = await homePageObject.NotEntitledModal();
      if (notEntitledModal.length > 0) {
        await notEntitledModal.waitForDisplayed(60000);
        await clickElement({
          objectKey: await homePageObject.NotEntitledModalOkayButton(),
        });
      }
      const paywallCarousel =
        await homePageObject["Pay Wall - Yearly Monthly Toggle"](
          "paywallCarousel"
        );
      if (paywallCarousel.length > 0) {
        await paywallCarousel.waitForDisplayed();
      }
    }
  }
);

Then("I check if the video is playing when it {string}", async function (auth) {
  if (auth.toLowerCase() === "should") {
    // const videoProgressText = await $(
    //   '//div[@data-testid="videoProgress"]/p'
    // ).getText();
    // console.log(`Video progress text: ${videoProgressText}`);
    // await videoProgressText.waitForDisplayed(6000); // Wait for the video progress text to be displayed
    // Bug has been created - https://baseball.atlassian.net/browse/COW-723. We will activate this after bug has been fixed.
    // assertTimes(timeFromCarouselTile, videoProgressText);

    const element = await $("//span[text()='CC']");
    await element.waitForDisplayed(60000); // this is the assertion
    await mediaPlayerPageObject.scrubberBarForwardAndBackward("1");    
  } else {
    const element =
      await homePageObject["Pay Wall - Yearly Monthly Toggle"](
        "paywallCarousel"
      );
    await element.waitForDisplayed(); // this is the assertion
  }
});

Then(
  "I click the {string} item in the table of {string}",
  async (num, carousel) => {
    // Locate the table using XPath
    num = parseInt(num);
    const element = await $(
      `(//h2[text()="${carousel}"]/following-sibling::div//li//button)[${num}]`
    );
    timeFromCarouselTile = await $(
      `(//h2[text()="${carousel}"]/following-sibling::div//li//button)[${num}]//div[1]/../span`
    ).getText();

    await clickElement({ objectKey: element });

    timeFromCarouselTile = await $(
      '//div[@data-testid="videoProgress"]/p'
    ).getText();
    const videoProgressText = await $(
      '//div[@data-testid="videoProgress"]/p'
    ).getText();

    assertTimes(timeFromCarouselTile, videoProgressText);
  }
);

function convertToSeconds(time) {
  const parts = time.split(":").reverse();
  let seconds = 0;
  for (let i = 0; i < parts.length; i++) {
    seconds += parseInt(parts[i]) * Math.pow(60, i);
  }
  return seconds;
}

function assertTimes(expectedTime, actualTime) {
  const expectedSeconds = convertToSeconds(expectedTime);
  console.log(
    `Expected time in seconds: ${expectedTime}`
  );
  const actualSecondPart = actualTime.split("/")[1];
  console.log(`Actual time part: ${actualTime}`);
  const actualSeconds = convertToSeconds(actualSecondPart);
  assert.strictEqual(
    expectedSeconds,
    actualSeconds,
    `Expected ${expectedSeconds} seconds, but got ${actualSeconds} seconds`
  );
}
