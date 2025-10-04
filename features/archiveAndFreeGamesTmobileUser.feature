@devSmoke @tmobile
Feature: Non Free and Free Game - TMobile User

    Scenario: Login from Onboarding and navigate to home
        Given I launch the MLB.TV app
        And I click "Have An MLB.TV Account?"
        And I login with "TMobile User" and "Password"

    Scenario Outline: "<Email Address>" "<Should or Should Not>" be able to play a "<Game Type>" game
        And I navigate to the Games page
        And I click 'calendar' button
        And I select a random date from "2024-09-05" to "2024-09-08"
        And I select "<Game Type>" game from game page for "<Email Address>"
        Then I verify "<Email Address>" "<Should or Should Not>" be able to play the "<Game Type>" game
        When I press 'Escape' '2' times 'to back out of the video'
        And I press "ArrowUp" "5" times "to scroll up to the header navigation"
        Examples:
            | Email Address   |   Password      | Should or Should Not     | Game Type |     
            | TMobile User    |   Password      |       should             | Non Free  |
            | TMobile User    |   Password      |       should             | Free      |  
