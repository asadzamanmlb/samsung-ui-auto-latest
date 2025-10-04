@debugPageSource
Feature: Debug Page Source

  Scenario: Capture current page source for debugging
    Given I capture the current page source
    And I log all available elements on the page
