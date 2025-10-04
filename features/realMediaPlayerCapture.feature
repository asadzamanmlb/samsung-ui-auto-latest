@realMediaPlayerCapture
Feature: Real Media Player Elements Capture and Analysis

  Background: User is ready to test actual video playback
    Given I am on the home page
    When I navigate to the "Games" page
    Then I should see "Games" page content
    And I navigate down to game tiles section

  Scenario: Capture real media player elements from live game
    When I click game tile with GamePK "813073" and test media player
    And I wait for video player to load and capture real media elements
    Then I should see the video player screen

  Scenario: Deep analysis of media player controls and functionality
    When I click game tile with GamePK "813059" and test media player
    And I wait for video player to load and capture real media elements
    Then I should see comprehensive media player controls

  Scenario: Extended media player element discovery
    When I click the first game tile and verify media player functionality
    And I wait for video player to load and capture real media elements
    Then I should see actual video player elements

  Scenario: Comprehensive video framework detection
    When I click game tile with GamePK "813065" and test media player
    And I wait for video player to load and capture real media elements
    Then I should see video streaming framework elements
