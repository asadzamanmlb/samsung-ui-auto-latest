@gamesPageTestCases
Feature: Games Page Comprehensive Test Cases

  Background: User is logged in and navigated to Games page
    Given I am in onboarding page
    When I click Have Mlb account
    And I login successfully to the mlb app
    Then I should see home page
    When I navigate to the "Games" page
    Then I should see "Games" page content

  Scenario: Verify Games page calendar navigation
    Given I am on the Games page
    When I wait for Games page to fully load
    Then I should see calendar navigation button
    And I should see date selection functionality
    And I should verify calendar accessibility features

  Scenario: Verify game matchup information display
    Given I am on the Games page
    When I wait for Games page to fully load
    Then I should see game matchup tiles
    And I should see team abbreviations like "BOS" and "NYY"
    And I should see game start times like "8:08 PM"
    And I should see probable pitcher information
    And I should verify game tile accessibility labels

  Scenario: Verify MVPD restriction handling
    Given I am on the Games page
    When I wait for Games page to fully load
    Then I should see games with MVPD requirements
    And I should see "MVPD Required" restriction messages
    And I should see lock icons for restricted content
    And I should verify restriction accessibility information

  Scenario: Test game tile interaction and navigation
    Given I am on the Games page
    When I wait for Games page to fully load
    And I focus on a game tile
    Then I should see game tile is properly focused
    And I should hear proper accessibility announcements
    When I select a game tile
    Then I should see appropriate game content or restriction message

  Scenario: Verify upcoming games scheduling
    Given I am on the Games page
    When I wait for Games page to fully load
    Then I should see upcoming games with PM times
    And I should see game scheduling information
    And I should see proper game ordering by time
    And I should verify game count announcements

  Scenario: Test Games page keyboard navigation
    Given I am on the Games page
    When I wait for Games page to fully load
    And I use keyboard navigation to move between games
    Then I should be able to navigate left and right between games
    And I should be able to navigate up to calendar/date selection
    And I should hear proper navigation announcements
    And I should see focus indicators on current game

  Scenario: Verify Games page content accessibility
    Given I am on the Games page
    When I wait for Games page to fully load
    Then I should verify all game tiles have proper aria-labels
    And I should verify calendar button has proper accessibility
    And I should verify restriction messages are announced
    And I should verify game count and position announcements

  Scenario: Test Games page error handling
    Given I am on the Games page
    When I wait for Games page to fully load
    And I attempt to access restricted content
    Then I should see appropriate restriction messages
    And I should not be able to access unauthorized content
    And I should see proper error handling for unavailable games

  Scenario: Verify Games page responsive behavior
    Given I am on the Games page
    When I wait for Games page to fully load
    Then I should see games properly laid out
    And I should see proper spacing between game tiles
    And I should see calendar navigation is accessible
    And I should verify page loads within acceptable time
