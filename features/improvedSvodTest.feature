@improvedSvodTest
Feature: Improved SVOD Video Playback Test with Specific Carousel Navigation

  Background: User is logged in and on home page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Navigate to specific carousel and play video
    Given I am on the home page
    When I wait for home page to fully load
    And I navigate to "Featured" carousel
    And I select a video from "Featured" carousel
    And I press Enter to play the selected video
    Then I should see video playback start
    And I should see video player controls
    And I should verify video is actually playing

  Scenario: Test multiple carousels for video content
    Given I am on the home page
    When I wait for home page to fully load
    And I navigate to "Games" carousel
    And I select a video from "Games" carousel
    And I press Enter to play the selected video
    Then I should see video playback start

  Scenario: Navigate to Live carousel and play content
    Given I am on the home page
    When I wait for home page to fully load
    And I navigate to "Live" carousel
    And I select a video from "Live" carousel
    And I press Enter to play the selected video
    Then I should see video playback start
    And I should verify video is actually playing

  Scenario: Navigate to Highlights carousel and play content
    Given I am on the home page
    When I wait for home page to fully load
    And I navigate to "Highlights" carousel
    And I select a video from "Highlights" carousel
    And I press Enter to play the selected video
    Then I should see video playback start
    And I should see video player controls

  Scenario: Test carousel navigation and video selection with verification
    Given I am on the home page
    When I wait for home page to fully load
    And I should capture current page source for analysis
    And I should look for video content elements
    And I should look for carousel elements
    And I navigate to "Featured" carousel
    And I select a video from "Featured" carousel
    Then I should see video title information
    When I press Enter to play the selected video
    Then I should see video playback start
    And I should verify video is actually playing
    And I should see video duration and current time
