@carouselNavigationTest
Feature: Carousel Navigation and Tile Selection Test

  Scenario: User is logged in and on home page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Navigate to carousel and click first tile
    Given I am on the home page
    When I wait for home page to fully load
    And I navigate to the "Get Caught Up" carousel section
    And I click on the "1" tile in the "Get Caught Up" carousel
    Then I should see the video player screen
    And I should see the video player element
    And I should see video title information
    And I should see video progress display
    And I should see video controls and scrubber
    And I should see quick actions menu with mute and captions
    And I should see video duration and current time
    And I should verify video is actually playing

