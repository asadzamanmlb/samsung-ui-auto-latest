/**
 * TV-optimized click function for Samsung Tizen TV
 * Handles TV-specific interaction patterns including focus, activation, and navigation
 *
 * @param {WebdriverIO.Element} element - The element to click
 * @param {Object} driver - The WebDriverIO driver instance
 * @returns {Promise<void>}
 */
async function tvClick(element, driver) {
  console.log("📺 TV-optimized click starting...");

  // Wait for element to be ready
  await element.waitForExist({ timeout: 10000 });
  await element.waitForDisplayed({ timeout: 10000 });

  // TV scaling removed

  // Primary click to focus the element
  await element.click();
  console.log("✅ Element focused");

  // Wait for focus to settle
  await driver.pause(1000);

  // Send Enter key via JavaScript for activation (since driver.pressKey doesn't work reliably)
  try {
    await driver.execute((el) => {
      // Dispatch keyboard events directly to the element
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
  await driver.pause(2000);

  // Try to activate the currently focused element (TV pattern)
  try {
    await driver.execute(() => {
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

  // Final direct click for good measure
  await element.click();
  console.log("✅ Final activation click completed");

  // Wait for potential navigation/content loading
  await driver.pause(3000);
  console.log("📺 TV-optimized click completed");
}

export default tvClick;
