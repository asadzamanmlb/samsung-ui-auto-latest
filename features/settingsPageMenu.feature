@devSmoke
Feature: Settings Page -  Navigation Menu  

    Scenario: Log in precondition
        Given I launch the MLB.TV app
        And I click "Have An MLB.TV Account?"
        And I login with "Yearly User" and "Password"
        And I navigate to the Settings page

    Scenario: The appropriate description copy displays for Favorite Team       
        When I hover over to "Favorite Team" button
        Then I should see the text "Favorite Team" 
        And I should see the text "Select your favorite team. Chosen" 
        And I should see "teams will always appear first" text
        And I should see "on the Homepage." text
        
    Scenario: The appropriate description copy displays for Following Teams
        When I hover over to "Following Teams" button
        Then I should see the text "Following Team" 
        And I should see the text "Select your teams you wish to follow." 
        And I should see "Chosen teams will always appear " text
        And I should see "after the favorite team on the " text
        And I should see "Homepage." text
        
    Scenario: The appropriate description copy displays for Hide Spoilers
        When I click "Hide Spoilers"
        Then I should see the text "Hide Spoilers"
        And I should see the text "Scores can be hidden for live and archived games to avoid the display of spoilers." 

    Scenario: The appropriate description copy displays for Closed Captions
        When I click "Closed Captions"
        Then I should see the text "Closed Captions"
        And I should see the text "Enable to display closed captions during playback." 

    Scenario: The appropriate description copy displays for Terms of Service and Privacy Policy
        When I click "Terms of Service and Privacy Policy"
        Then I should see the text "Terms of Service and Privacy Policy" 
        And I should see the text "MLB's Terms of Service and policies, including Privacy Policy, apply."
        And I should see the text "Please visit mlb.com/tou for Terms of Service." 
        And I should see the text "Please visit mlb.com/privacy for Privacy Policy." 
        And I should see the text "Please visit mlb.com/do-not-sell-or-share-my-personal-data to opt out of targeted advertising and tracking." 

    Scenario: The appropriate description copy displays for Contact Support
        When I click "Contact Support"
        Then I should see the text "Contact Support" 
        And I should see the text "Have questions? For in-game support, please visit us on the web at https://mlb.tv/support." 