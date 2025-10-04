import { When, Then } from "@wdio/cucumber-framework";
import { assert } from "chai";
import navigateWithKeys from "../commonFunctions/navigateWithKeys.js";
import clickElementByTextOrXpathOrObjectKey from "../commonFunctions/clickElementByTextOrXpathOrObjectKey.js";
import mediaPlayerPageObject from "../pageobjects/mediaPlayer/mediaPlayerPage.object.js";


import { $, browser } from "@wdio/globals";

let global_progressbar_value_saver;
let global_currently_playing_game_title;

async function getCurrentGameTitle() {
  // lg current game playing title is on //*[@data-testid="videoTitle"]/span
  let current_title = await browser.$$('//div[contains(@class, "Name-sc")]');
  let team1 = current_title[0].getText();
  let team2 = current_title[1].getText();
  return [team1, team2];
}
// THIS FUNCTION IS MADE FOR DEBUGGING ONLY
When("I console out out the progress bar related measures", async function () {
  let currentProgressBarElement = await $(
    '//*[contains(@class, "ProgressBar")]'
  );
  console.log("Current Progress Bar element:", currentProgressBarElement);
  if (!currentProgressBarElement) {
    console.error("Error: Progress Bar element not found.");
    return; // Exit the function if the element is not found
  }
  let currentProgressBarStyle =
  await currentProgressBarElement.getAttribute("style");
  console.log("Current Progress Bar style attribute:", currentProgressBarStyle);
  let widthValue = (currentProgressBarStyle.split(":")[1] || "").trim();
  console.log("Extracted width value from style attribute:", widthValue);
  let currentProgressBar = parseFloat(widthValue);
  console.log("Parsed width value as float:", currentProgressBar);
  async function totalProgressBar() {
    let portionsProgressBar = await browser.$$(
      '//*[contains(@class, "Inning-sc")]'
    );
    console.log("Portions of Progress Bar elements:", portionsProgressBar);
    let total = 0;
    for (let i = 0; i < portionsProgressBar.length; i++) {
      let my_portion_element = portionsProgressBar[i];
      let my_portion_style = await my_portion_element.getAttribute("style");
      console.log(`Style attribute for portion ${i + 1}:`, my_portion_style);
      let my_portion_value = (my_portion_style.split(":")[1] || "").trim();
      console.log(
        "Extracted width value from style attribute:",
        my_portion_value
      );
      total += parseFloat(my_portion_value);
      console.log("Updated total:", total);
    }
    return total;
  }

  console.log("Printing progress bar details:", [
    currentProgressBar,
    await totalProgressBar(),
  ]);
});

When("I note down the current value of the progress bar", async function () {
  // getCurrentProgressBarValue can only grab the value when the video is paused
  global_progressbar_value_saver = await mediaPlayerPageObject.getCurrentProgressBarValue();
});

When("I validate if the progress bar successfully skipped", async function () {
  const now_progress = await mediaPlayerPageObject.getCurrentProgressBarValue();
  assert.notEqual(
    global_progressbar_value_saver,
    now_progress,
    `progress bar did not change ::: "${global_progressbar_value_saver}" should not be equal to "${now_progress}"`
  );
  global_progressbar_value_saver = now_progress;
});

When(
  "I press the right arrow key {string} times to forward seek",
  async function (how_many_times) {
    await mediaPlayerPageObject.forwardSeek(how_many_times);
  }
);

When(
  "I verify scrubber bar forward and backward {string} time",
  async function (how_many_times) {
    await mediaPlayerPageObject.scrubberBarForwardAndBackward(how_many_times);
  }
);

When(
  "I press the left arrow key {string} times to backward seek",
  async function (how_many_times) {
    await mediaPlayerPageObject.backwardSeek(how_many_times);
  }
);

Then(
  "I click {string} of {string} feed button",
  async function (button_name, feedtype) {
    function toTitleCase(str) {
      return str
        .toLowerCase()
        .split(" ")
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    }
    let selector = `//*[text()="${toTitleCase(feedtype)} Feed"]/../div/button//*[contains(text(),'${button_name}')]`;
    await clickElementByTextOrXpathOrObjectKey({ xpath: selector });
  }
);

Then("I validate all broadcast buttons available", async function () {
  await browser.keys("ArrowDown"); //to open the options menu
  (await $('//*[@data-testid="broadcastOptionsButton"]')).click();
  await $(`//*[text()="Audio Feed"]/../div/button`).waitForDisplayed();
  await $(`//*[text()="Video Feed"]/../div/button`).waitForDisplayed();
});

When(
  "I verify that the scrubber bar playback head is moving forward",
  async function () {
    assert.isTrue(await mediaPlayerPageObject.timeIsStillMoving(), "the game stopped playing");
  }
);
