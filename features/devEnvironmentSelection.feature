@devEnvironmentSelection
Feature: Dev Environment Selection from Settings

  Scenario: User logs in and reaches home page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Switch to dev environment from settings
    Given I am on the home page
    When I switch to dev environment from dev settings
    Then I should see dev environment settings updated


