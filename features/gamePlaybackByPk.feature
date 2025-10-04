@gamePlaybackByPk
Feature: Game Playback by GamePK with Media Controls Verification

  Background: User is logged in and on Games page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page
    When I navigate to the "Games" page
    Then I should see "Games" page content

  Scenario: Select game by GamePK and verify video playback
    Given I am on the Games page
    When I wait for Games page to fully load
    And I navigate down to game tiles section
    And I capture available game PKs from the page
    And I select a game by its GamePK
    Then I should see game loading or playback screen
    And I should verify video player initialization
    And I should see video player controls
    And I should verify media playback functionality

#   Scenario: Verify comprehensive media player controls
#     Given I am on the Games page
#     When I wait for Games page to fully load
#     And I select the first available game for playback
#     Then I should see the video player screen
#     And I should see play/pause controls
#     And I should see video progress scrubber
#     And I should see video duration and current time
#     And I should see volume/mute controls
#     And I should see closed captions controls
#     And I should see quick actions menu
#     And I should verify all controls are accessible

#   Scenario: Test media player interaction and functionality
#     Given I am on the Games page
#     When I wait for Games page to fully load
#     And I select a game for media playback testing
#     Then I should see video player is active
#     When I interact with play/pause controls
#     Then I should see playback state changes
#     When I interact with volume controls
#     Then I should see volume level changes
#     When I interact with scrubber controls
#     Then I should see video position changes
#     When I access quick actions menu
#     Then I should see additional playback options

#   Scenario: Verify game metadata and video information
#     Given I am on the Games page
#     When I wait for Games page to fully load
#     And I select a game with available metadata
#     Then I should see game title information
#     And I should see team information in player
#     And I should see game status and timing
#     And I should see video quality information
#     And I should verify game-specific overlays

#   Scenario: Test restricted game handling with GamePK
#     Given I am on the Games page
#     When I wait for Games page to fully load
#     And I identify a restricted game by GamePK
#     And I attempt to select the restricted game
#     Then I should see appropriate restriction message
#     And I should see MVPD or blackout information
#     And I should not see video player controls
#     And I should see options to resolve restrictions

#   Scenario: Verify video player error handling
#     Given I am on the Games page
#     When I wait for Games page to fully load
#     And I select a game that may have playback issues
#     Then I should see appropriate error handling
#     And I should see helpful error messages
#     And I should see options to retry or get help
#     And I should be able to return to Games page

#   Scenario: Test full screen and exit functionality
#     Given I am on the Games page
#     When I wait for Games page to fully load
#     And I select a game for full screen testing
#     Then I should see video player controls
#     When I activate full screen mode
#     Then I should see full screen video playback
#     And I should see full screen controls
#     When I exit full screen mode
#     Then I should return to normal player view
#     When I exit the video player
#     Then I should return to Games page
