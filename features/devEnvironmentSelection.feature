@devEnvironmentSelection
Feature: Dev Environment Selection from Settings

  Scenario: User bypasses onboarding and reaches home page
    When I click Get Started button
    And I skip onboarding screens
    And I click Explore Free Content button
    Then I should see home page

  Scenario: Switch to dev environment from settings
    Given I am on the home page
    When I switch to dev environment from dev settings
    When I click Have Mlb account
    And I login with MVPD user credentials
    Then I should see home page
    When I navigate to the "Games" page
    Then I should see "Games" page content
    And I navigate down to game tiles section
    When I capture all page elements for analysis
    And I identify the first game tile element
    And I click the first identified game tile
    Then I should see game loading or playback screen


