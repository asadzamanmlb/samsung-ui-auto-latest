@simpleDevEnv
Feature: Simple Dev Environment Selection

  Scenario: Navigate to dev settings from current app state
    Given I am on any page of the app
    When I navigate to settings page
    And I navigate to dev settings
    Then I should see dev environment options
    When I select "Dev" environment from dev settings
    Then I should see home page

  Scenario: Navigate to games page and click game tile by GamePK
    Given I am on any page of the app
    When I navigate to the "Games" page
    Then I should see "Games" page content
    And I wait for Games page to fully load
    And I navigate down to game tiles section
    And I click "778564" game tile by gamePk

  Scenario: Test comprehensive media player functionality
    Given I am on any page of the app
    When I navigate to the "Games" page
    Then I should see "Games" page content
    And I wait for Games page to fully load
    And I navigate down to game tiles section
    When I click the first game tile and verify media player functionality
    Then I should see the video player screen
