@simpleSettingsTest
Feature: Simple Settings Menu Test

  Background: User is logged in
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Navigate to Settings menu
    Given I am on the home page
    When I navigate to the Settings page
    Then I should see the settings menu
