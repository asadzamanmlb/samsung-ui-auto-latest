import { When, Then } from "@wdio/cucumber-framework";
import { assert } from "chai";
import findElementByTextOrXpathOrObjectKey from "../commonFunctions/findElementByTextOrXpathOrObjectKey.js";
import clickElementByTextOrXpathOrObjectKey from "../commonFunctions/clickElementByTextOrXpathOrObjectKey.js";
import clickElement from "../commonFunctions/clickElement.js";
import homePageObject from "../pageobjects/home/homePage.object.js";

import { $, browser } from "@wdio/globals";

When("I navigate to the Games page from the Home page", async function () {
  await clickElementByTextOrXpathOrObjectKey({
    xpath: "(//*[text()='Games'])[1]",
  });
});

When("I verify today's date exists on the page", async function () {
  const currentDate = new Date();
  const dayOfWeek = new Intl.DateTimeFormat("en", { weekday: "long" }).format(
    currentDate
  );
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(
    currentDate
  );
  const dayOfMonth = currentDate.getDate();

  const expectedDateText = `${dayOfWeek}, ${month} ${dayOfMonth}`;

  console.log(
    `looking for this date:: ${expectedDateText} with this style:: "Wednesday, May 22"`
  );
  const xpathSelector = `//div[@data-testid='gamesScreen']/div/p[text()='${expectedDateText}']`;

  const element = await $(xpathSelector);

  if (element.isExisting()) {
    console.log(`Today's date element found on the page: ${expectedDateText}`);
  } else {
    assert.fail(
      `Today's date element not found on the page: ${expectedDateText}`
    );
  }
});

When("I click {string} mlb scores box", async function (whichNumElement) {
  let elementNum = parseInt(whichNumElement);
  await clickElementByTextOrXpathOrObjectKey({
    xpath: `//section[@data-testid='gameTileGrid']//button[${elementNum}]`,
  });
});

When(
  "I check if the date changed {string} by {string} {string}",
  async function (direction, daysToChange, whateverIwannaSay) {
    console.log(whateverIwannaSay)
    // backward or forward
    const expectedDateXPath = `//div[@data-testid='gamesScreen']/div/div/p`;

    const element = await $(expectedDateXPath);
    const currentDateString = await element.getText();

    console.log("Date "+ currentDateString)

    if (!currentDateString) {
      assert.fail("Error: Could not extract date from the element");
    }

    const currentDate = new Date(currentDateString);
    const newDate = new Date(currentDate);

    if (direction === "forward") {
      newDate.setDate(currentDate.getDate() + parseInt(daysToChange, 10));
    } else if (direction === "backward") {
      newDate.setDate(currentDate.getDate() - parseInt(daysToChange, 10));
    } else {
      assert.fail("Error: Invalid direction specified");
    }

    const newDateString = new Intl.DateTimeFormat("en", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(newDate);
    const dateChanged = currentDateString !== newDateString;

    assert.isTrue(
      dateChanged,
      `The date has not changed by ${daysToChange} days ${direction}`
    );
  }
);

Then("I exit out from mlb score box", async function () {
  await browser.keys("Backspace");
});

When("I go to the {string} navigation button", async function (leftRightToday) {
  if (leftRightToday.toLowerCase() === "left") {
    await findElementByTextOrXpathOrObjectKey({
      xpath: "//button[@data-testid='dateNavigatorPrevDateButton']",
    });
  } else if (leftRightToday.toLowerCase() === "right") {
    await findElementByTextOrXpathOrObjectKey({
      xpath: "//button[@data-testid='dateNavigatorNextDateButton']",
    });
  } else if (leftRightToday.toLowerCase() === "today") {
    await findElementByTextOrXpathOrObjectKey({
      xpath: "//button[@data-testid='dateNavigatorTodayButton']",
    });
  } else {
    console.log(`nither left or right was passed as string::${leftRightToday}`);
  }
});

Then("I navigate back to games from settings", async function () {
  await clickElementByTextOrXpathOrObjectKey({
    xpath: "(//*[text()='Games'])[1]",
  });
});

Then(
  "I choose the game between {string} vs {string}",
  async function (team1, team2) {
    await clickElement({
      xpath: `//*[@data-testid="gameTileGrid"]//button[.//span[text()='${team1}'] and .//span[text()='${team2}']]`,
    });
  }
);

Then("I choose the game {string}", async function (gamepk) {
  await clickElement({
    xpath: `//button[@data-testid='${gamepk}']`,
  });
});

Then(
  "I choose the game {string} and select the feed for {string}",
  async function (gamepk, userType) {
    await browser.keys("ArrowDown");
    await clickElement({ xpath: `//button[@data-testid='${gamepk}']` });
    const feedButton = await browser.$$(
      '(//*[contains(@data-testid,"streamSelection")]//span[contains(@data-testid,"feedButton")])[1]'
    ); // Check if feed button is present
    if (feedButton.length > 0) {
      await clickElement({
        xpath:
          '(//*[contains(@data-testid,"streamSelection")]//span[contains(@data-testid,"feedButton")])[1]',
      });

      if (userType === "Free User") {
        const resumeButton = await browser.$$(
          '//*[contains(@data-testid,"resumeLink")]'
        ); // Check if resume button is present
        if (resumeButton.length > 0) {
          await clickElement({
            xpath: '//*[contains(@data-testid,"resumeLink")]',
          });
        }
        const element = await homePageObject.NotEntitledModal();
        await element.waitForDisplayed();
      }
      const resumeButton = await browser.$$(
        '//*[contains(@data-testid,"resumeLink")]'
      ); // Check if resume button is present
      if (resumeButton.length > 0) {
        await clickElement({
          xpath: '//*[contains(@data-testid,"resumeLink")]',
        });
      }
      const watchLiveButton = await browser.$$(
        '//*[contains(@data-testid,"watchLiveLink")]'
      ); // Check if resume button is present
      if (watchLiveButton.length > 0) {
        await clickElement({
          xpath: '//*[contains(@data-testid,"watchLiveLink")]',
        });
      }
    }
  }
);

Then(
  "I find the stream: {string} from stream selection",
  async function (stream) {
    await findElementByTextOrXpathOrObjectKey({
      xpath: `//div[@data-testid='streamSelection']//p[text()='${stream}']`,
    });
  }
);

Then("I choose a live game to play", async function () {
  let selector = `//*[@data-testid="liveBadge"]`;
  (await $(selector)).isExisting();
  await findElementByTextOrXpathOrObjectKey({ xpath: selector });
});
