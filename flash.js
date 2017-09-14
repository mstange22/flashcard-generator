var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");

var flashcard = BasicCard("Who was the first president?", "George Washington");
var clozeCard = ClozeCard("George Washington was the first president.", "George Washington");

console.log(flashcard.front, flashcard.back);
console.log (clozeCard.partial);