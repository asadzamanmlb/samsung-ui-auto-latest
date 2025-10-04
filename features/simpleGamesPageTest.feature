@simpleGamesPageTest
Feature: Simple Games Page Test

  Background: User is logged in and navigated to Games page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page
    When I navigate to the "Games" page
    Then I should see "Games" page content

  Scenario: Basic Games page verification
    Given I am on the Games page
    When I wait for Games page to fully load
    Then I should see calendar navigation button
    And I should see game matchup tiles
    And I should see games with MVPD requirements
