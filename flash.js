const DeckOfCards = require("./DeckOfCards");
const inquirer = require("inquirer");
const fs = require("fs");

var questionCounter = 0;
var score = 0;
var deck;
var randomQuestionNumbers = [];
var incorrectCapitals = [];

console.log("Welcome to the trivia game!");

inquirer.prompt([
    {
        message: "Choose from basic or cloze trivia cards or try world capitals?",
        type: "list",
        choices: ["basic", "cloze", "world capitals"],
        name: "cardType"
    }     
]).then(function(answers){

    deck = DeckOfCards(answers.cardType);

    if(answers.cardType === "cloze") {
             
        fs.readFile("cloze-cards.txt", "utf8", function(error, data) {
            
            var incomingData = data.split("\n");
            deck.buildDeck(incomingData);

            // build array for random number management
            for(var i = 0; i < deck.numCards; i++) {
                randomQuestionNumbers.push(i);
            }

            askQuestion();
        });
    }

    else if (answers.cardType === "basic") {
             
        fs.readFile("basic-cards.txt", "utf8", function(error, data) {
            
            var incomingData = data.split("\n");
            deck.buildDeck(incomingData);

            // build array for random number management
            for(var i = 0; i < deck.numCards; i++) {
                randomQuestionNumbers.push(i);
            }

            askQuestion();
        });
    }

    else {

        fs.readFile("world-capitals.txt", "utf8", function(error, data) {
            
            var incomingData = data.split("\n");
            deck.buildDeck(incomingData);

            // build array for random number management
            for(var i = 0; i < deck.numCards; i++) {
                randomQuestionNumbers.push(i);
            }

            askQuestion();
        });        
    }

});

function askQuestion() {

    // get random card index from array and remove from randomQuestionNumbers
    var cardIndex = randomQuestionNumbers.splice(Math.floor(Math.random() *
                                            randomQuestionNumbers.length), 1);
    questionCounter++;

    // cloze questions    
    if(deck.type === "cloze") {

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
                
                playAgainPrompt();
            }
    
            else {

                console.log("Thank you for playing.  Goodbye.");
            }
        });
    }

    // basic questions
    else if(deck.type === "basic") {
        
        inquirer.prompt([
            {
                message: deck.cards[cardIndex].front,
                name: "front"
            }            
        ]).then(function(answers) {
    
            if(answers.front.toUpperCase() === deck.cards[cardIndex].back.toUpperCase()) {
                console.log("Correct!");
                score++;
                console.log("Score: " + score + "/" + questionCounter);
            }
    
            else {
                console.log("Incorrect.");
                console.log("The answer is " + deck.cards[cardIndex].back);
                console.log("Score: " + score + "/" + questionCounter);
            }
    
            if(questionCounter < deck.numCards) {
                
                playAgainPrompt();
            }
    
            else {
                console.log("Thank you for playing.  Goodbye.");
            }
        });
    }
    
    // world capitals
    else {
        
        inquirer.prompt([
            {
                message: "What is the capital of " + deck.cards[cardIndex].country + "?",
                name: "country"
            }            
        ]).then(function(answers) {
    
            if(answers.country.toUpperCase() === deck.cards[cardIndex].capital.toUpperCase()) {
                console.log("Correct!");
                score++;
                console.log("Score: " + score + "/" + questionCounter);
            }
    
            else {
                console.log("Incorrect.");
                console.log("The capital of " + deck.cards[cardIndex].country + " is " +
                                                                 deck.cards[cardIndex].capital);
                console.log("Score: " + score + "/" + questionCounter);
                incorrectCapitals.push(deck.cards[cardIndex]);
            }
    
            if(questionCounter < deck.numCards) {
                
                playAgainPrompt();
            }
    
            else {

                if(incorrectCapitals.length > 0) {
                    
                    console.log("You got the following capitals wrong:")
                    for(var i = 0; i < incorrectCapitals.length; i++) {

                        console.log(incorrectCapitals[i].country + ": " + incorrectCapitals[i].capital);
                    }
                }

                console.log("Thank you for playing.  Goodbye.");
            }
        });
    }
}

function playAgainPrompt() {

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

            if(incorrectCapitals.length > 0) {
                
                console.log("You got the following questions wrong:")
                for(var i = 0; i < incorrectCapitals.length; i++) {

                    console.log(incorrectCapitals[i].country + ": " + incorrectCapitals[i].capital);
                }
            }

            console.log("Thank you for playing. Goodbye.");
        }
    });
}