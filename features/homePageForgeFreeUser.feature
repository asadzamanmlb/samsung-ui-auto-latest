@devSmoke
Feature: Home page Forge - Free User

    Background: Log in as a free user
        Given I launch the MLB.TV app
        And I click "Have An MLB.TV Account?"
        And I login with "Free User" and "Password"
       
    Scenario Outline: Playing SVOD/VODs from Well Known Carousel
        When I navigate to the Home page
        And I navigate to well known "SVOD" carousel and click non live tile from carousel
        Then I check if the video is playing when it "<Should or Should Not Play>"
        When I press 'Escape' '2' times 'to back out of the video'
        Then I verify the Home button is displayed
        Examples:
            | Email Address | Password     | Should or Should Not Play|
            |   Free User   |   Password   |       should             |
