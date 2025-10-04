import { browser } from "../../hooks/hooks.js";

const gamesPageObject = {
  "Game Tile": async () => browser.$("//*[@data-testid='gameTile']"),
  "Game Tile Grid": async () => browser.$("//*[@data-testid='gameTileGrid']"),
  "Date Navigator Previous": async () =>
    browser.$("//*[@data-testid='dateNavigatorPrevDateButton']"),
  "Date Navigator Next": async () =>
    browser.$("//*[@data-testid='dateNavigatorNextDateButton']"),
  "Upgrade MLB.TV": async () =>
    browser.$("//*[@data-testid='upgradeMlbTvButton']"),
  Feed: async () =>
    browser.$(
      "(//*[contains(@data-testid,'streamSelection')]//span[contains(@data-testid,'feedButton')])[1]"
    ),
  Resume: async () => browser.$("//*[contains(@data-testid,'resumeLink')]"),
  "Game Details": async () => browser.$("//*[@data-testid='gameDetails']"),
  "Live Badge": async () => browser.$("//*[@data-testid='liveBadge']"),
  "Final Badge": async () => browser.$("//*[@data-testid='finalBadge']"),
  "Free Badge": async () => browser.$("//*[@data-testid='freeBadge']"),
};

export default gamesPageObject;
