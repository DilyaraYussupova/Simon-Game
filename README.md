# Simon-Game
Project1

## User stories
* User can choose from easy, medium and hard levels of difficulty
* User sees gameboard
  * User sees message "Watch!" or "Play!"
  * User can keep track of current level 
  * User can see current score 
* User can click a Play button to start a game
* User needs to replicate the sequence computer has displayed
* User 

## UI Notes
Main screen has 2 parts: on the left side is an image and level of difficulty; on the right side is a game board. Button "Play" is underneath the board. Box with message what to do: watch or play will be displayed above the game board. Below that user can find score and level boxes. 

## Pseudocode
* Difficulty level - easy:
    * Level = 1; Score = 0
    * Display "Watch!" message
    * Computer shows 1 round of sequence 
        * each selected card should change the opacity of the their background and illuminated border
    * Display "Play!" message
    * User needs to follow up the sequence by clicking each card with the correct order
        * each selected card should change the opacity of the their background and illuminated border
    * If user enters correct sequence of cards:
        * Modify score and level values
        * Reset for another round
    * If one of user's sequences is not correct then
        * Display message "Game Over"
        * Display "Replay" button
        * Display the highest score 
    * If user chooses to play another round:
        * Reset previous results and sequence order

## Nice to have
* Audio - each card has their own sound; winner/looser 
* Highest score

## State of the app
* computerSequence - holds computer's sequence (arr)
* userSequence - holds user's sequence (arr)
* variables to hold each round scoring and level 

## Cached elements
* Board game images
* 

## Events
* DOMContentLoaded:
  * Grab DOM refs
  * Attach event listeners
* playButton.click;
  * 
