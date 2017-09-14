var ClozeCard = function(text, cloze) {

	if(!(this instanceof ClozeCard)) {

		return new ClozeCard(text, cloze); 
	}

	this.text = text;
	this.cloze = cloze;

	if(text.includes(cloze)) {

		this.partial = text.replace(cloze, "...");
	}

	else {
		error.console.log("Text does not include cloze.");
	}

}

module.exports = ClozeCard;