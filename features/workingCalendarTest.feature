@workingCalendarTest
Feature: Working Calendar Test with Real Elements

  Scenario: Test real calendar navigation elements
    Given I am in onboarding page
    When I click Get Started button
    And I skip onboarding screens
    And I click Explore Free Content button
    Then I should see home page
    When I navigate to the "Games" page
    Then I should see "Games" page content
    And I wait for Games page to fully load
    When I capture all page elements for analysis
    Then I should see calendar elements on the page
    When I click the calendar button to open calendar
    Then I should see calendar opened

  Scenario: Test calendar navigation buttons
    Given I am in onboarding page
    When I click Get Started button
    And I skip onboarding screens
    And I click Explore Free Content button
    Then I should see home page
    When I navigate to the "Games" page
    Then I should see "Games" page content
    And I wait for Games page to fully load
    When I click the previous date button
    And I wait for 2 seconds
    When I click the next date button
    And I wait for 2 seconds
    Then I should see date navigation working
