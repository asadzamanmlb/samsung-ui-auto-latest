@actualSettingsTest
Feature: Actual Settings Menu Test with Click and Enter

  Scenario: User is logged in
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Navigate to Settings and verify actual available menu options
    Given I am on the home page
    When I navigate to the Settings page
    And I should see "Log Out" option
    And I should see "Hide Spoilers" option
    And I should see "Closed Captions" option
    And I should see "Terms of Service and Privacy Policy" option
    And I should see "Favorite Team" option
    And I should see "Following Teams" option
    And I should see "Contact Support" option

  Scenario: Click and Enter on Hide Spoilers settings
    When I click and focus on "Hide Spoilers" option
    Then I should see text containing "Scores can be hidden for lyve and archived games to avoid the display of spoilers."

  Scenario: Click and Enter on Closed Captions settings
    When I click and focus on "Closed Captions" option
    Then I should see text containing "Enable to display closed captions during playback."

  Scenario: Click and Enter on Favorite Team settings
    When I click and focus on "Favorite Team" option
    Then I should see text containing "Select your favorite team"

  Scenario: Click and Enter on Following Teams settings
    When I click and focus on "Following Teams" option
    Then I should see text containing "Select your teams you wish to follow."

  Scenario: Click and Enter on Terms of Service and Privacy Policy settings
    When I click and focus on "Terms of Service and Privacy Policy" option
    Then I should see text containing "MLB's Terms of Service and policies, including Privacy Policy, apply."
    And I should see text containing "Please visit mlb.com/tou for Terms of Service."
    And I should see text containing "Please visit mlb.com/privacy for Privacy Policy."
    And I should see text containing "Please visit mlb.com/do-not-sell-or-share-my-personal-data to opt out of targeted advertising and tracking."

  Scenario: Click and Enter on Contact Support settings
    When I click and focus on "Contact Support" option
    Then I should see text containing "Have questions? For in-game support, please visit us on the web at https://mlb.tv slash support."