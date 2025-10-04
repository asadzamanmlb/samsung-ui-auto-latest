import { Before, After } from "@wdio/cucumber-framework";
import { startServer, TEST_HOST } from "./../../helpers.js";
import getPort from "get-port";
import { tizenBrowser } from "./../../browser.js";
import { Env } from "@humanwhocodes/env";

/**
 * Cleanup function to delete browser session and close the server.
 * @param {import('./../step-definitions/browser').TizenBrowser} [browser]
 * @param {import('@appium/types').AppiumServer} [server]
 */
async function cleanup(browser, server) {
  try {
    await browser?.deleteSession();
  } catch {}
  try {
    await server?.close();
  } catch {}
}

/**
 * Listen for process interrupts and ensure cleanup is performed.
 * @param {import('./../step-definitions/browser').TizenBrowser} browser
 * @param {import('@appium/types').AppiumServer} server
 */
function listenForInterrupts(browser, server) {
  process.removeAllListeners("SIGHUP").removeAllListeners("SIGINT");
  process
    .once("SIGHUP", async () => {
      await cleanup(browser, server);
    })
    .once("SIGINT", async () => {
      await cleanup(browser, server);
    });
}
const env = new Env();

/** @type {number} */
let appiumServerPort;
/** @type {import('@appium/types').AppiumServer} */
let server;
/** @type {import('./../step-definitions/browser').TizenBrowser} */
let browser;
/** @type {import('@appium/types').NSDriverCaps<import('../../lib/driver').TizenTVDriverCapConstraints>} */
let capabilities;
/** @type {import('@appium/types').NSDriverCaps<import('../../lib/driver').TizenTVDriverCapConstraints>} */
let baseCaps;

// Remove custom Before hook to avoid session conflicts
// The WDIO configuration will handle session creation

// Remove custom After hook to avoid session conflicts
// The WDIO configuration will handle session cleanup

// Export the global browser from WebDriverIO
import { browser as globalBrowser } from "@wdio/globals";
export { globalBrowser as browser };
