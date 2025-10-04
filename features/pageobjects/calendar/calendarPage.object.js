import { browser } from "../../hooks/hooks.js";

const calendarPageObject = {
  // Real calendar elements discovered from Games page
  Calendar: async () =>
    browser.$("//*[@data-testid='dateNavigatorCalendarButton']"),
  "Calendar Button": async () =>
    browser.$("//*[@data-testid='dateNavigatorCalendarButton']"),
  "Previous Date Button": async () =>
    browser.$("//*[@data-testid='dateNavigatorPrevDateButton']"),
  "Next Date Button": async () =>
    browser.$("//*[@data-testid='dateNavigatorNextDateButton']"),

  // Legacy selectors (keeping for backwards compatibility)
  "Calendar Grid": async () => browser.$("//*[@data-testid='calendarGrid']"),
  "Calendar Navigation Previous": async () =>
    browser.$("//*[@data-testid='dateNavigatorPrevDateButton']"),
  "Calendar Navigation Next": async () =>
    browser.$("//*[@data-testid='dateNavigatorNextDateButton']"),
  "Calendar Month Year": async () =>
    browser.$("//*[@data-testid='calendarMonthYear']"),
  "Calendar Day": async (day) =>
    browser.$(`//*[@data-testid='calendarDay-${day}']`),
  "Calendar Today": async () => browser.$("//*[@data-testid='calendarToday']"),
  "Calendar Selected": async () =>
    browser.$("//*[@data-testid='calendarSelected']"),
  "Calendar Games Count": async () =>
    browser.$("//*[@data-testid='calendarGamesCount']"),
};

export default calendarPageObject;
