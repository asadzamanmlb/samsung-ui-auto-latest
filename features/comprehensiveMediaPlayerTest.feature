@comprehensiveMediaPlayer
Feature: Comprehensive Media Player Testing with GamePK Support

  Background: User is logged in and ready to test games
    Given I am on the home page
    When I navigate to the "Games" page
    Then I should see "Games" page content
    And I navigate down to game tiles section

  Scenario: Test Detroit vs Cleveland game (LIVE) with full media player functionality
    When I click game tile with GamePK "813073" and test media player
    Then I should see the video player screen

  Scenario: Test San Diego vs Chicago Cubs game (LIVE) with full media player functionality
    When I click game tile with GamePK "813059" and test media player
    Then I should see the video player screen

  Scenario: Test Boston vs New York Yankees game with full media player functionality
    When I click game tile with GamePK "813065" and test media player
    Then I should see the video player screen

  Scenario: Test any available game with comprehensive media player analysis
    When I click the first game tile and verify media player functionality
    And I run comprehensive media player functionality test
    Then I should see the video player screen

  Scenario: Standalone comprehensive media player functionality test
    When I click the first game tile and verify media player functionality
    Then I should see the video player screen
    When I run comprehensive media player functionality test
    Then I should see comprehensive media player test results
