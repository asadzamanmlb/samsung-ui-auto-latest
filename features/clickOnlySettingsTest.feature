@clickOnlySettingsTest
Feature: Click Only Settings Test (No Enter Key)

  Background: User is logged in
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Click only on settings options without activating them
    Given I am on the home page
    When I navigate to the Settings page
    Then I should see the settings menu
    And I should see "Log Out" option
    And I should see "Hide Spoilers" option
    And I should see "Closed Captions" option

  Scenario: Test click only functionality on Hide Spoilers
    Given I am on the home page
    When I navigate to the Settings page
    And I click on "Hide Spoilers" option
    Then the "Hide Spoilers" option should be focused
    And the "Hide Spoilers" option should be clickable

  Scenario: Test click only functionality on Closed Captions
    Given I am on the home page
    When I navigate to the Settings page
    And I click on "Closed Captions" option
    Then the "Closed Captions" option should be focused
    And the "Closed Captions" option should be clickable

  Scenario: Test click only functionality on Log Out
    Given I am on the home page
    When I navigate to the Settings page
    And I click on "Log Out" option
    Then the "Log Out" option should be focused
    And the "Log Out" option should be clickable

  Scenario: Test hover functionality on settings options
    Given I am on the home page
    When I navigate to the Settings page
    And I hover over "Hide Spoilers" option
    Then the "Hide Spoilers" option should be focused

  Scenario: Test click and focus functionality
    Given I am on the home page
    When I navigate to the Settings page
    And I click and focus on "Closed Captions" option
    Then the "Closed Captions" option should be focused
    And the "Closed Captions" option should be clickable

  Scenario: Sequential clicking without activation
    Given I am on the home page
    When I navigate to the Settings page
    And I click on "Hide Spoilers" option
    Then the "Hide Spoilers" option should be focused
    When I click on "Closed Captions" option
    Then the "Closed Captions" option should be focused
    When I click on "Log Out" option
    Then the "Log Out" option should be focused
