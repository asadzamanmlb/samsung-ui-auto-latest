import { browser } from "../../hooks/hooks.js";

const settingsPageObject = {
  "Following Teams": async () =>
    browser.$("//*[@data-testid='followingTeamsButton']"),
  "Contact Support": async () =>
    browser.$("//*[@data-testid='contactSupportButton']"),
  "Terms of Service and Privacy Policy": async () =>
    browser.$("//*[@data-testid='termsOfServiceButton']"),
  "Log Out": async () => browser.$("//*[@data-testid='settingsLoginButton']"),
  "Hide Spoilers": async () =>
    browser.$("//*[@data-testid='hideSpoilersButton']"),
  "Closed Captions": async () =>
    browser.$("//*[@data-testid='closedCaptionsButton']"),
  "Favorite Team": async () =>
    browser.$("//*[@data-testid='favoriteTeamButton']"),

  // Dev Settings options
  "Dev Settings": async () =>
    browser.$(
      "//*[contains(text(), 'Dev Settings') or contains(@aria-label, 'Dev Settings') or @data-testid='devSettingsButton']"
    ),
  Mock: async () =>
    browser.$(
      "//*[contains(text(), 'Mock') or contains(@aria-label, 'Mock') or @data-testid='devSettingsEnvButton-mock']"
    ),
  QA: async () =>
    browser.$(
      "//*[contains(text(), 'QA') or contains(@aria-label, 'QA') or @data-testid='devSettingsEnvButton-qa']"
    ),
  Dev: async () => browser.$("//*[@data-testid='devSettingsEnvButton-dev']"),
  Production: async () =>
    browser.$(
      "//*[contains(text(), 'Production') or contains(@aria-label, 'Production') or @data-testid='productionButton']"
    ),
};

export default settingsPageObject;
