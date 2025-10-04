@mvpdGamePlayback
Feature: MVPD Game Playback Testing

  Background: MVPD User is logged in and on Games page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login with MVPD user credentials
    Then I should see home page
    When I navigate to the "Games" page
    Then I should see "Games" page content

  Scenario: MVPD user can access and play restricted games
    Given I am on the Games page
    When I wait for Games page to fully load
    And I navigate down to game tiles section
    And I capture available game PKs from the page
    And I select a game by its GamePK
    Then I should see game loading or playback screen
    And I should verify video player initialization
    And I should see video player controls
    And I should verify media playback functionality
    When I exit the video player
    Then I should return to Games page

  Scenario: Verify MVPD user sees no restriction messages
    Given I am on the Games page
    When I wait for Games page to fully load
    And I navigate down to game tiles section
    Then I should not see MVPD restriction messages on game tiles
    And I should not see lock icons on available games
    And I should see games are available for playback

  Scenario: Test comprehensive video player with MVPD access
    Given I am on the Games page
    When I wait for Games page to fully load
    And I navigate down to game tiles section
    And I select the first available game for playback
    Then I should see the video player screen
    And I should see video player controls
    And I should see play/pause controls
    And I should see video progress scrubber
    And I should see video duration and current time
    And I should see quick actions menu with mute and captions
    When I press back to return to home
    Then I should see "Games" page content
