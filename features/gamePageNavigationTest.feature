@gamePageNavigationTest
Feature: Game Page Navigation and Elements Testing

  Background: User is logged in and on home page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Verify game tiles and matchup information
    When I navigate to the "Games" page
    