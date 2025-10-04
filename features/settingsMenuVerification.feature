@settingsTest
Feature: Settings Menu Navigation and Verification

  Background: User is logged in
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Navigate to Settings and verify all menu options are present
    Given I am on the home page
    When I navigate to the Settings page
    And I should see "Log Out" option
    And I should see "Hide Spoilers" option
    And I should see "Closed Captions" option
    And I should see "Favourite Team" option

