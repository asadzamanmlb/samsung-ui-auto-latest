@gamesPageElementCapture
Feature: Games Page Element Capture and First Tile Click

  Background: User is logged in and ready to explore Games page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Navigate to Games page and capture all elements
    When I navigate to the "Games" page
    Then I should see "Games" page content
    And I wait for Games page to fully load
    And I navigate down to game tiles section
    When I capture all page elements for analysis
    Then I should see comprehensive element information

  Scenario: Learn to click first game tile after element capture
    When I navigate to the "Games" page
    Then I should see "Games" page content
    And I wait for Games page to fully load
    And I navigate down to game tiles section
    When I capture all page elements for analysis
    And I identify the first game tile element
    And I click the first identified game tile
    Then I should see game loading or playback screen
