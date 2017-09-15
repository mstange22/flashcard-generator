const ClozeCard = require("./ClozeCard");

function DeckOfCards() {
    
    if(!(this instanceof DeckOfCards)) {
        
        return new DeckOfCards()
    }

    this.cards = [];
    this.numCards = 0;

    // receives an array of cards: strings separated by commas
    this.buildDeck = function(arrayOfCards) {

        for(var i = 0; i < arrayOfCards.length; i++) {

            var tempCard = arrayOfCards[i].split(",");            

            // add each card to the deck
            this.addCard(tempCard[0].trim(), tempCard[1].trim());
            // console.log("Card added.  Total: " + this.numCards);
        }
    }

    this.addCard = function(text, cloze) {

        var newCard = ClozeCard(text, cloze);
        this.cards.push(newCard);
        this.numCards++;
    }
}

module.exports = DeckOfCards;