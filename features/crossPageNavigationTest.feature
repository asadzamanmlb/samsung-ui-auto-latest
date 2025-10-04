@crossPageNavigationTest
Feature: Cross-Page Navigation and Content Verification

  Background: User is logged in and on home page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page

  Scenario: Verify game content across all pages
    Given I am on the home page
    When I wait for home page to fully load
    Then I should see "Home" page content
    And I should see game tiles with matchup information on "Home" page
    And I should see team logos and abbreviations on "Home" page
    
    When I navigate to the "Games" page
    Then I should see "Games" page content
    And I should see game status indicators on "Games" page
    And I should see game duration or live indicators on "Games" page
    
    When I navigate to the "Settings" page
    Then I should see "Settings" page content
    And I should see "navigation" elements on "Settings" page
    
    When I navigate to the "Home" page
    Then I should see "Home" page content
    And I should see "carousels" elements on "Home" page

  Scenario: Verify consistent elements across pages
    Given I am on the home page
    When I wait for home page to fully load
    Then I should see "buttons" elements on "Home" page
    And I should see "navigation" elements on "Home" page
    
    When I navigate to the "Games" page
    Then I should see "buttons" elements on "Games" page
    And I should see "navigation" elements on "Games" page
    
    When I navigate to the "Settings" page
    Then I should see "buttons" elements on "Settings" page
    And I should see "links" elements on "Settings" page

  Scenario: Game-specific content verification
    Given I am on the home page
    When I wait for home page to fully load
    Then I should see team logos and abbreviations on "Home" page
    And I should see game status indicators on "Home" page
    
    When I navigate to the "Games" page
    Then I should see team logos and abbreviations on "Games" page
    And I should see game status indicators on "Games" page
    And I should see game duration or live indicators on "Games" page
