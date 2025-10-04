import { browser } from "@wdio/globals";

async function navigateWithKeys(key, count = 1, pauseTime = 500) {
  for (let i = 0; i < count; i++) {
    await browser.keys(key);
    await browser.pause(pauseTime);
  }
}

export default navigateWithKeys;

