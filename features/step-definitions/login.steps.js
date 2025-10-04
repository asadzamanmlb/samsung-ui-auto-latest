import { When } from "@wdio/cucumber-framework";
import { qaTestUsers, devTestUsers } from "../../testUsers.js";
import globalObjectKeyFinder from "../commonFunctions/globalObjectKeyFinder.js";
import loginPageObject from "../pageobjects/login/loginPage.object.js";

import { $ } from "@wdio/globals";

const testUsers = process.env.ENV === "QA" ? qaTestUsers : devTestUsers;

When(
  "I enter {string} in {string} field",
  async function (stringValue, elementLocationData) {
    let element = await (await globalObjectKeyFinder(elementLocationData))();
    await element.clearValue();

    await element.setValue(testUsers[stringValue]);
  }
);

When("I login with {string} and {string}", async function (user, password) {
  await loginPageObject.login(testUsers[`${user}`], testUsers[`${password}`]);
});

When("I am not logged in", async function () {
  const selector = `//*[text()='Log In']`;
  const element = await $(selector);
  await element.isDisplayed();
});
