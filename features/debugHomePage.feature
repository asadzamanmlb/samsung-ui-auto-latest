@debugHomePage
Feature: Debug Home Page Elements

  Background: User is logged in and on home page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Capture home page elements for SVOD analysis
    Given I am on the home page
    When I wait for home page to fully load
    Then I should capture current page source for analysis
    And I should log all available elements on the page
    And I should look for video content elements
    And I should look for carousel elements
