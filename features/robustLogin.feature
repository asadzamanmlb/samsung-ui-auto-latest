@robustLoginTest
Feature: Robust Login Test with Better Error Handling

  Scenario: Login with app state detection
    Given I wait for the app to fully load
    When I check what screen is currently displayed
    Then I should navigate to login appropriately
    And I should complete the login flow
    And I should reach the home page
