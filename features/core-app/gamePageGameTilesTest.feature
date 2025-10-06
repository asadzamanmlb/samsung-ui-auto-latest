@gamePageGameTilesTest
Feature: Game Page Game Tiles Test

  Scenario: User bypasses onboarding and reaches home page
    Given I am in onboarding page
    When I click Get Started button
    And I skip onboarding screens
    And I click Explore Free Content button
    Then I should see home page

  Scenario: Verify Games page game tiles
    Given I am on the home page
    When I switch to dev environment from dev settings
    When I click Have Mlb account
    And I login with MVPD user credentials
    Then I should see home page
    When I navigate to the "Games" page
    Then I should see "Games" page content

    