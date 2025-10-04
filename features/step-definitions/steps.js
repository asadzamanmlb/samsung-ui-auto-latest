import { Given, When, Then, Before, After } from "@wdio/cucumber-framework";
import { Keys } from "@headspinio/tizen-remote";
import { browser } from "../hooks/hooks.js";
import onboardingPageObject from "../pageobjects/onboardingPage.object.js";
import homePageObject from "../pageobjects/homePage.object.js";
import clickElement from "../commonFunctions/clickElement.js";

// TV-optimized click function for direct use in tests
async function tvClick(element) {
  console.log("📺 TV-optimized click starting...");

  // Wait for element to be ready
  await element.waitForExist({ timeout: 10000 });
  await element.waitForDisplayed({ timeout: 10000 });

  // TV scaling removed

  // Primary click to focus
  await element.click();
  console.log("✅ Element focused");

  // Wait for focus to settle
  await browser.pause(1000);

  // Send Enter key via JavaScript for activation
  try {
    await browser.execute((el) => {
      el.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
      el.dispatchEvent(
        new KeyboardEvent("keyup", { key: "Enter", bubbles: true })
      );
    }, element);
    console.log("✅ Enter key sent via JavaScript");
  } catch (e) {
    console.log("⚠️ JavaScript key simulation failed");
  }

  // Additional activation attempts for TV interface
  await browser.pause(2000);

  // Try to activate the focused element
  try {
    await browser.execute(() => {
      const focusedElement = document.querySelector(".focused");
      if (focusedElement) {
        focusedElement.click();
        focusedElement.dispatchEvent(
          new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
        );
        focusedElement.dispatchEvent(new Event("select", { bubbles: true }));
      }
    });
    console.log("✅ Focused element activated");
  } catch (e) {
    console.log("⚠️ Focused element activation failed");
  }

  // Final direct click
  await element.click();
  console.log("✅ Final activation click completed");

  // Wait for potential navigation
  await browser.pause(3000);
  console.log("📺 TV-optimized click completed");
}

Given(/^I am in onboarding page$/, async () => {
  console.log("🔍 Looking for Get Started button...");

  // Wait for page to fully load
  await browser.pause(5000);

  // Get page source for debugging
  const pageSource = await browser.getPageSource();
  console.log("📄 Page source length:", pageSource.length);
  console.log("📄 Page source preview:", pageSource.substring(0, 500));

  const getStartedBtn = await onboardingPageObject["Get Started"]();
  console.log("⏳ Waiting for Get Started button to exist...");
  await getStartedBtn.waitForExist({ timeout: 60000 });
  console.log("✅ Get Started button found!");
});

When(/^I click Have Mlb account$/, async () => {
  console.log("🖱️ Finding Have MLB Account button...");
  const haveMlbAccountBtn = await onboardingPageObject["Have Mlb Account"]();
  await haveMlbAccountBtn.waitForExist({ timeout: 30000 });

  console.log("🎯 Using clickElement to focus the button");
  await clickElement({ objectKey: haveMlbAccountBtn });

  console.log(
    "✅ Button focused! Now using Tizen remote Enter key to activate..."
  );
  await browser.pause(1000); // Wait for focus to settle

  // Use proper Tizen remote keys for TV navigation
  try {
    console.log("📺 Sending Enter key via Tizen remote to activate button...");
    await browser.execute("tizen: pressKey", { key: Keys.ENTER });
    console.log("✅ Enter key sent successfully - button should be activated!");

    await browser.pause(3000); // Wait longer for navigation to complete
  } catch (e) {
    console.log(
      "⚠️ Tizen remote key failed, using direct click fallback:",
      e.message
    );
    await haveMlbAccountBtn.click();
    await browser.pause(3000);
  }

  console.log("⏳ Waiting for navigation...");
  await browser.pause(5000);
  console.log("✅ Button activation sequence completed!");
});

When(/^I login successfully to the mlb app$/, async () => {
  console.log("🔍 Starting login process with user credentials...");

  // Wait for login page to load after navigation
  await browser.pause(5000);

  // Use the working login approach from your code
  console.log("📧 Finding email input field...");
  const email = await browser.$("[data-testid='onboardingEmailInput']");
  await email.waitForExist({ timeout: 10000 });
  await email.setValue("testautomationtv@gmail.com");
  console.log("✅ Email entered successfully!");
  await browser.pause(2000);

  // Press Return to move to next field
  console.log("⌨️ Pressing Return to navigate...");
  await browser.execute("tizen: pressKey", { key: Keys.RETURN });
  await browser.pause(2000);

  console.log("🔒 Finding password input field...");
  const password = await browser.$("[data-testid='onboardingPasswordInput']");
  await password.click();
  await password.setValue("Aut0mation1");
  console.log("✅ Password entered successfully!");
  await browser.pause(2000);

  // Navigate to login button
  console.log("⌨️ Navigating to login button...");
  await browser.execute("tizen: pressKey", { key: Keys.RETURN });
  await browser.pause(2000);
  await browser.execute("tizen: pressKey", { key: Keys.UP });

  console.log("🔐 Clicking login button...");
  const login = await browser.$("[data-testid='onboardingLoginButton']");
  await login.click();
  await browser.execute("tizen: pressKey", { key: Keys.ENTER });

  console.log("✅ Login process completed! Waiting for home page...");
});

Then(/^I should see home page$/, async () => {
  const home = await driver.$("[data-testid='headerLink-/']");
  await home.waitForExist({ timeout: 60000 });
  console.log("✅ Successfully reached home page!");
});
