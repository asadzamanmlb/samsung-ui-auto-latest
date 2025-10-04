@debugGamesPage
Feature: Debug Games Page Elements

  Background: User is logged in and on home page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Navigate to Games page and capture elements
    Given I am on the home page
    When I wait for home page to fully load
    And I navigate to the "Games" page
    Then I should see "Games" page content
    And I capture the current page source
    And I log all available elements on the page
    And I should look for games page specific elements
    And I should analyze games page navigation structure
    And I should identify games page content types
