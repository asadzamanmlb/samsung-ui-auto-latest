import { $, browser } from "@wdio/globals";
import { assert } from "chai";

async function mouseOverToElement({ text = "", xpath = "", objectKey = null }) {
  let selector;
  let element;

  if (text.length > 0 && xpath.length === 0) {
    // Selects elements by exact text match
    selector = `//*[text()='${text}']`;
    element = await $(selector);
    await element.waitForExist(1000);
    await element.waitForDisplayed(1000);
  } else if (xpath.length > 0) {
    // Uses provided XPath
    selector = xpath;
    element = await $(selector);
    await element.waitForExist(1000);
    await element.waitForDisplayed(1000);
  } else if (objectKey !== null) {
    // Uses provided element
    element = objectKey;
  } else {
    // Handle case where neither text nor XPath is provided
    throw new Error(
      `Neither text nor XPath provided. \n\n text: "${text}" \n\n xpath: "${xpath}" \n\n objectKey: "${objectKey}" \n\n selector: "${selector}" \n\n element: "${element}" \n\n `
    );
  }

  if (await element.isExisting()) {
    await element.waitForExist(1000);
    await element.waitForDisplayed(1000);
    await element.moveTo();
  } else {
    assert.fail(`Element with text '${text}' not found`);
  }
}

export default mouseOverToElement;

