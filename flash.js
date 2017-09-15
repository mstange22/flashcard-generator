// const BasicCard = require("./BasicCard");
const ClozeCard = require("./ClozeCard");
const DeckOfCards = require("./DeckOfCards");
const inquirer = require("inquirer");
const fs = require("fs");

var questionCounter = 0;
var score = 0;

var randomQuestionNumbers = [];

console.log("Welcome to the trivia game!");

// initialize deck
var deck = DeckOfCards();
        
fs.readFile("flashcards.txt", "utf8", function(error, data) {
    
    var incomingData = data.split("\n");
    deck.buildDeck(incomingData);

    // build array for random number management
    for(var i = 0; i < deck.numCards; i++) {
        randomQuestionNumbers.push(i);
    }

    askQuestion();
});

function askQuestion() {

    // get random card index from array and remove from randomQuestionNumbers
    var cardIndex = randomQuestionNumbers.splice(Math.floor(Math.random() *
                                            randomQuestionNumbers.length), 1);
    questionCounter++;
    
    inquirer.prompt([
        {
            message: deck.cards[cardIndex].partial,
            name: "partial"
        }            
    ]).then(function(answers) {

        if(answers.partial.toUpperCase() === deck.cards[cardIndex].cloze.toUpperCase()) {
            console.log("Correct!");
            score++;
            console.log("Score: " + score + "/" + questionCounter);
        }

        else {
            console.log("Incorrect.");
            console.log(deck.cards[cardIndex].text)
            console.log("Score: " + score + "/" + questionCounter);
        }

        if(questionCounter < deck.numCards) {
            
            inquirer.prompt([
                {
                    message: "Again?",
                    type: "list",
                    choices: ["yes", "no"],
                    name: "again"
                }
            ]).then(function(answers) {
            
                if(answers.again.toLowerCase() === "yes") {

                    askQuestion();
                }

                else {
                    
                    console.log("Thank you for playing. Goodbye.");
                }
            });
        }

        else {
            console.log("Thank you for playing.  Goodbye.");
        }
    });
}