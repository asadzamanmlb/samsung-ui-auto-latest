import { browser } from "@wdio/globals";

async function waitForAllGridButtonsToLoad(
  gridSelector = "//*[@data-testid='gameTileGrid']//button",
  timeout = 10000
) {
  await browser.waitUntil(
    async () => {
      const buttons = await browser.$$(gridSelector);
      return buttons.length > 0;
    },
    {
      timeout: timeout,
      timeoutMsg: `Grid buttons did not load within ${timeout}ms`,
    }
  );
}

export default waitForAllGridButtonsToLoad;

