@mediaPlayerTest
Feature: Comprehensive Media Player Testing

  Background: User is logged in and on Games page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page
    When I navigate to the "Games" page
    Then I should see "Games" page content
    And I wait for Games page to fully load
    And I navigate down to game tiles section

  Scenario: Test first game tile and comprehensive media player functionality
    When I click the first game tile and verify media player functionality
    Then I should see the video player screen

  Scenario: Test specific game tile by GamePK with media player verification
    When I click "778564" game tile by gamePk
    Then I should see game loading or playback screen
    And I should verify video player initialization
    When I click the first game tile and verify media player functionality
    Then I should see the video player screen

  Scenario: Test media player controls and scrubber functionality
    When I click the first game tile and verify media player functionality
    Then I should see the video player screen
    And I should see play/pause controls
    And I should see video progress scrubber
    And I should see video duration and current time
    And I should see volume/mute controls

  Scenario: Test keyboard controls for media playback
    When I click the first game tile and verify media player functionality
    Then I should see the video player screen
    And I should verify keyboard controls work for playback
    And I should verify arrow keys control scrubber
    And I should verify space bar controls play/pause
