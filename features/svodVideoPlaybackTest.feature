@svodVideoPlaybackTest
Feature: SVOD Video Playback Test

  Background: User is logged in and on home page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Select and play video from SVOD carousel
    Given I am on the home page
    When I find an SVOD carousel on the home page
    And I select a video tile from the SVOD carousel
    And I press Enter to play the selected video
    Then I should see video playback start
    And I should see video player controls
    And I should verify video is actually playing

  