import { browser } from "../../hooks/hooks.js";

const homePageObject = {
  Home: async () => browser.$("//*[@data-testid='headerLink-/']"),
  Settings: async () => browser.$("//*[@data-testid='headerLink-/settings']"),
  "Watch Live Hero": async () => browser.$("//*[@data-testid='watchButton']"),
  Games: async () => browser.$("//*[@data-testid='headerLink-/games']"),
  Profile: async () => browser.$("//*[@data-testid='header-profile-button']"),
  "SVOD Player": async () => browser.$("//*[@id='svod-player']"),
  "Player Control": async () => browser.$("//*[@class='mlb-player-controls']"),
  "Featured Video": async () =>
    browser.$("//*[@id='homepage-carousel-featured-on-mlbtv']//li[3]"),
  "Miami Marlins Milb": async () =>
    browser.$(
      "//*[@id='homepage-carousel-miami-marlins-affiliated-milb-games']//li[1]"
    ),
  "Account Settings": async () =>
    browser.$(
      "//*[@class='mlb-header__login-menu__link' and text()='Account Settings']"
    ),
  "MLB.TV Home": async () =>
    browser.$("//*[contains(@data-nav-id, 'nav-top-item-mlb.tv-home')]"),
  "Pay Wall - Yearly Monthly Toggle": async (test) =>
    browser.$(`//*[@data-testid="${test}"]`),
  "Select Game": async (home, away) =>
    browser.$(
      `//*[@data-testid="gameTileGrid"]//button[.//span[text()='${home}'] and .//span[text()='${away}']]`
    ),
  "Header Log In": async () =>
    browser.$("//*[@data-testid='headerLink-/login']"),
  "GetMLB.TV Home": async () =>
    browser.$("//*[@data-testid='headerLink-/welcome']"),
  NotEntitledModal: async () =>
    browser.$("//*[@data-testid='notEntitledModal']"),
  NotEntitledModalOkayButton: async () =>
    browser.$("//*[@data-testid='notEntitledModalButton']"),
  "Exit Button in App Exit Confirmation Modal": async () =>
    browser.$("//*[@data-testid='exitExitButton']"),
  "Cancel Button in App Exit Confirmation Modal": async () =>
    browser.$("//*[@data-testid='exitCancelButton']"),
  "Partner Text in Hero": async (partnerName) =>
    browser.$(
      `//*[@datat-testid="partnerWatchText" and text()="${partnerName}"]`
    ),
  "First tile in Game Carousel": async () =>
    browser.$("//*[@data-testid='gamesCarousel']//li[1]"),
  "Carousel Tile": async (carouselName, tileNum) => {
    // Generate selector for specific tile in specific carousel based on actual MLB.tv structure
    // Structure: <section><h2>CarouselName</h2><div><ul role="list"><li><img data-testid="..."></li></ul></div></section>
    const selector = `//h2[contains(text(), '${carouselName}')]/following-sibling::div//ul[@role='list']//img[${tileNum}]`;
    return browser.$(selector);
  },
};

export default homePageObject;
