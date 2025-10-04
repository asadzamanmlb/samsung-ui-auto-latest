@onboardingBypass
Feature: Onboarding Bypass Functionality

  Scenario: Bypass onboarding with Get Started and Skip
    Given I bypass onboarding by clicking Get Started and skip
    Then I should see home page

  Scenario: Step-by-step onboarding bypass
    When I click Get Started button
    And I skip onboarding screens
    And I click Explore Free Content button
    Then I should see home page

  