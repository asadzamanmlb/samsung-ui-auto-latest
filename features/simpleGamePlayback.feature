@simpleGamePlayback
Feature: Simple Game Playback Test

  Background: User is logged in and on Games page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page
    When I navigate to the "Games" page
    Then I should see "Games" page content

  Scenario: Basic game selection and playback verification
    Given I am on the Games page
    When I wait for Games page to fully load
    And I navigate down to game tiles section
    And I capture available game PKs from the page
    And I select a game by its GamePK
    Then I should see game loading or playback screen
    And I should verify video player initialization
    And I should see video player controls
    When I exit the video player
    Then I should return to Games page
