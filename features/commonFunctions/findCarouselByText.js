import { $, } from "@wdio/globals";
/**
 * Find MLB carousel by exact text
 * @param {Object} options - Search options
 * @param {string} options.text - Carousel name to search for
 * @param {number} [timeout=10000] - Maximum wait time
 * @returns {WebdriverIO.Element} Found carousel element
 */
async function findCarouselByText({ text, timeout = 10000 }) {
  try {
      // Create an XPath that finds an element containing the exact carousel text
      const xpathTextMatch = `//*[text()="${text}"]`;

      // Wait for element to be present
      const carouselElement = await $(xpathTextMatch);
      
      // Wait for element to be displayed
      await carouselElement.waitForDisplayed({
          timeout,
          timeoutMsg: `Carousel "${text}" not found within ${timeout}ms`
      });

      // Scroll element into view
      await carouselElement.scrollIntoView();

      return carouselElement;
  } catch (error) {
      throw new Error(`Unable to find carousel with text "${text}": ${error.message}`);
  }
}

export default findCarouselByText;