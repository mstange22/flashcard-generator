const ClozeCard = require("./ClozeCard");
const BasicCard = require("./BasicCard");
const Capitals = require("./Capitals");

function DeckOfCards(type) {
    
    if(!(this instanceof DeckOfCards)) {
        
        return new DeckOfCards(type)
    }

    this.cards = [];
    this.numCards = 0;
    this.type = type;

    // receives an array of cards: strings separated by commas
    this.buildDeck = function(arrayOfCards) {

        for(var i = 0; i < arrayOfCards.length; i++) {

            var tempCard = arrayOfCards[i].split(",");            

            // add each card to the deck
            this.addCard(tempCard[0].trim(), tempCard[1].trim(), this.type);
        }
    }

    this.addCard = function(text, cloze, type) {

        if(type === "cloze") {
            var newCard = ClozeCard(text, cloze);
        }

        else if(type === "basic") {
            var newCard = BasicCard(text, cloze);
        }

        else {
            var newCard = Capitals(text, cloze);
        }

        this.cards.push(newCard);
        this.numCards++;
    }
}

module.exports = DeckOfCards;