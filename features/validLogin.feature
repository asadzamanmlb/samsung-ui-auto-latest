Feature: Samsung TV app login

  Scenario: As a user, I can login to the Tizen TV application
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page