@textVerificationTest
Feature: Text Verification Examples

  Background: User is logged in
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Verify settings page contains expected text
    Given I am on the home page
    When I navigate to the Settings page
    Then I should see text containing "Settings"
    And I should see text containing "Log Out"
    And I should see text containing "Hide Spoilers"
    And I should see text containing "Closed Captions"

  Scenario: Verify multiple text items are present
    Given I am on the home page
    When I navigate to the Settings page
    Then the page should contain all of the following text:
      | Settings       |
      | Log Out        |
      | Hide Spoilers  |
      | Closed Captions|

  Scenario: Verify text appears within time limit
    Given I am on the home page
    When I navigate to the Settings page
    Then I should see text "Settings" within 10 seconds

  Scenario: Verify unwanted text is not present
    Given I am on the home page
    When I navigate to the Settings page
    Then the page should not contain text "Error"
    And the page should not contain text "Failed"

  Scenario: Verify specific element contains expected text
    Given I am on the home page
    When I navigate to the Settings page
    Then the "Log Out" element should contain text "Log Out"
