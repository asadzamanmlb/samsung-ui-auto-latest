@simpleHomePageDebug
Feature: Simple Home Page Debug

  Scenario: Login and capture home page elements
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page
    And I wait for home page to fully load
    And I should capture current page source for analysis
    And I should look for video content elements
    And I should look for carousel elements
