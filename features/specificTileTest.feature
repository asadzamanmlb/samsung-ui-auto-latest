@specificTileTest
Feature: Specific Tile Selection in Carousels

  Scenario: User is logged in and on home page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Click on first tile in Get Caught Up carousel
    Given I am on the home page
    When I wait for home page to fully load
    And I navigate to the "Get Caught Up" carousel section
    And I click on the "1" tile in the "Get Caught Up" carousel
    And I press Enter to play the selected video
    Then I should see video playback start
    And I should verify video is actually playing

  Scenario: Click on second tile in Recaps carousel
    Given I am on the home page
    When I wait for home page to fully load
    And I click on the "2" tile in the "Recaps" carousel
    And I press Enter to play the selected video
    Then I should see video playback start
    And I should see video player controls

  Scenario: Click on first tile in MLB Top Plays carousel
    Given I am on the home page
    When I wait for home page to fully load
    And I navigate to the "MLB Top Plays" carousel section
    And I click on the "1" tile in the "MLB Top Plays" carousel
    And I press Enter to play the selected video
    Then I should see video playback start
    And I should verify video is actually playing

  Scenario: Click on first tile in Featured on MLB.TV carousel
    Given I am on the home page
    When I wait for home page to fully load
    And I click on the "1" tile in the "Featured on MLB.TV" carousel
    And I press Enter to play the selected video
    Then I should see video playback start
    And I should see video duration and current time

  Scenario: Test multiple tile selections in same carousel
    Given I am on the home page
    When I wait for home page to fully load
    And I click on the "1" tile in the "Get Caught Up" carousel
    Then I should see video title information
    When I click on the "2" tile in the "Get Caught Up" carousel
    Then I should see video title information
    When I click on the "1" tile in the "Recaps" carousel
    And I press Enter to play the selected video
    Then I should see video playback start

  Scenario: Compare different carousels with specific tiles
    Given I am on the home page
    When I wait for home page to fully load
    And I should capture current page source for analysis
    And I should look for carousel elements
    When I click on the "1" tile in the "Get Caught Up" carousel
    Then I should see video title information
    When I click on the "1" tile in the "MLB Top Plays" carousel
    Then I should see video title information
    When I click on the "1" tile in the "Featured on MLB.TV" carousel
    And I press Enter to play the selected video
    Then I should see video playback start
    And I should verify video is actually playing

  