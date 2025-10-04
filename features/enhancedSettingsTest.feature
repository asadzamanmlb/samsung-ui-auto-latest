@enhancedSettingsTest
Feature: Enhanced Settings Menu Test with Click and Enter

  Background: User is logged in
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Navigate to Settings and discover available menu options
    Given I am on the home page
    When I navigate to the Settings page
    Then I should see the settings menu
    And I should capture all available settings menu options

  Scenario: Click and Enter on Account Settings
    Given I am on the home page
    When I navigate to the Settings page
    Then I should see the settings menu
    When I click and press Enter on "Account Settings" option
    Then I should see the Account Settings page or submenu

  Scenario: Click and Enter on Video Quality
    Given I am on the home page
    When I navigate to the Settings page
    Then I should see the settings menu
    When I click and press Enter on "Video Quality" option
    Then I should see the Video Quality settings page or submenu

  Scenario: Click and Enter on Audio Settings
    Given I am on the home page
    When I navigate to the Settings page
    Then I should see the settings menu
    When I click and press Enter on "Audio Settings" option
    Then I should see the Audio Settings page or submenu

  Scenario: Navigate back to home from settings
    Given I am on the home page
    When I navigate to the Settings page
    Then I should see the settings menu
    When I navigate back to home page from settings
    Then I should see home page
