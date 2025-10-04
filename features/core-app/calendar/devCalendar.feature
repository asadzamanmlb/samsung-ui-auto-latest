@devCalendar
Feature: Calendar Navigation on Games Page

  Scenario: Navigate to specific date in calendar after proper setup
    Given I am in onboarding page
    When I click Get Started button
    And I skip onboarding screens
    And I click Explore Free Content button
    Then I should see home page
    When I navigate to the "Games" page
    Then I should see "Games" page content
    And I wait for Games page to fully load
    When I go to date "02-04-2025" in the calendar
    Then I should see the selected date in calendar
    