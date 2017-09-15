const ClozeCard = require("./ClozeCard");
const BasicCard = require("./BasicCard");

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
            // console.log("Card added.  Total: " + this.numCards);
        }
    }

    this.addCard = function(text, cloze, type) {

        if(type === "cloze") {
            var newCard = ClozeCard(text, cloze);
        }

        else {
            var newCard = BasicCard(text, cloze);
        }

        this.cards.push(newCard);
        this.numCards++;
    }
}

module.exports = DeckOfCards;