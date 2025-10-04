import { browser } from "../../hooks/hooks.js";

const welcomePage = {
  "Get Started": async () => browser.$("//*[@data-testid='getStartedButton']"),
  "Have Mlb Account": async () =>
    browser.$("//*[@data-testid='haveMlbAccountButton']"),
  "Welcome Title": async () => browser.$("//*[@data-testid='welcomeTitle']"),
  "Welcome Subtitle": async () =>
    browser.$("//*[@data-testid='welcomeSubtitle']"),
};

export default welcomePage;

