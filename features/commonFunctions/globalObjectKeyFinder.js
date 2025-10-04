import onboardingPageObject from "../pageobjects/onboardingPage.object.js";
import homePageObject from "../pageobjects/homePage.object.js";
import gamesPageObject from "../pageobjects/gamesPage.object.js";
import welcomePageObject from "../pageobjects/welcome/welcomePage.object.js";
import homeSubPageObject from "../pageobjects/home/homePage.object.js";
import loginPageObject from "../pageobjects/login/loginPage.object.js";
import gamesSubPageObject from "../pageobjects/games/gamesPage.object.js";
import settingsPageObject from "../pageobjects/settings/settingsPage.object.js";
import calendarPageObject from "../pageobjects/calendar/calendarPage.object.js";
import mediaPlayerPageObject from "../pageobjects/mediaPlayer/mediaPlayerPage.object.js";

// Global object key finder to locate elements across all page objects
async function globalObjectKeyFinder(objectKey) {
  // Combine all page objects into one lookup
  const allPageObjects = {
    ...onboardingPageObject,
    ...homePageObject,
    ...gamesPageObject,
    ...welcomePageObject,
    ...homeSubPageObject,
    ...loginPageObject,
    ...gamesSubPageObject,
    ...settingsPageObject,
    ...calendarPageObject,
    ...mediaPlayerPageObject,
  };

  // Check if the objectKey exists in any page object
  if (allPageObjects[objectKey]) {
    return allPageObjects[objectKey];
  }

  // If not found, throw an error with available keys
  const availableKeys = Object.keys(allPageObjects);
  throw new Error(
    `Object key "${objectKey}" not found. Available keys: ${availableKeys.join(
      ", "
    )}`
  );
}

export default globalObjectKeyFinder;
