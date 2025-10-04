@debugCalendarElements
Feature: Debug Calendar Elements on Games Page

  Scenario: Capture Games page elements to find calendar structure
    Given I am on the home page
    When I navigate to the "Games" page
    Then I should see "Games" page content
    And I wait for Games page to fully load
    When I capture all page elements for analysis
    Then I should see the page elements captured
