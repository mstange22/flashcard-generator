// const BasicCard = require("./BasicCard");
const ClozeCard = require("./ClozeCard");
const DeckOfCards = require("./DeckOfCards");
const inquirer = require("inquirer");
const fs = require("fs");

const maxQuestions = 10;
var questionCounter = 0;
var score = 0;

console.log("Welcome to the trivia game!");

// initialize deck
var deck = DeckOfCards();
        
fs.readFile("flashcards.txt", "utf8", function(error, data) {
    
    var incomingData = data.split("\n");
    deck.buildDeck(incomingData);
    // askQuestion();
});

function askQuestion() {

    var cardIndex = Math.floor(Math.random() * deck.numCards);
    questionCounter++;
    
    inquirer.prompt([
        {
            message: deck.cards[cardIndex].partial,
            name: "partial"
        }            
    ]).then(function(answer) {

        if(answer === deck.cards[cardIndex].cloze) {
            console.log("Correct!");
            console.log("Score: " + score);
            score++;
        }

        else {
            console.log("Incorrect.");
            console.log("Score: " + score);
        }

        if(questionCounter < 10) {
            
            inquirer.prompt([
                {
                    message: "Again? (y/n)",
                    type: "list",
                    choices: ["y", "n"]
                }
            ]).then(function(answer) {
            
                if(answer === "y") {

                    askQuestion();
                }
            });
        }
    });
}