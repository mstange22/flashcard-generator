// const BasicCard = require("./BasicCard");
const ClozeCard = require("./ClozeCard");
const DeckOfCards = require("./DeckOfCards");
const inquirer = require("inquirer");
const fs = require("fs");

const maxQuestions = 12;
var randomQuestionNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var questionCounter = 0;
var score = 0;

console.log("Welcome to the trivia game!");

// initialize deck
var deck = DeckOfCards();

console.log(randomQuestionNumbers);
        
fs.readFile("flashcards.txt", "utf8", function(error, data) {
    
    var incomingData = data.split("\n");
    deck.buildDeck(incomingData);
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

        if(questionCounter < maxQuestions) {
            
            inquirer.prompt([
                {
                    message: "Again? (y/n)",
                    type: "list",
                    choices: ["y", "n"],
                    name: "again"
                }
            ]).then(function(answers) {
            
                if(answers.again.toLowerCase() === "y") {

                    askQuestion();
                }
            });
        }
    });
}