var ClozeCard = function(text, cloze) {

	if(!(this instanceof ClozeCard)) {

		return new ClozeCard(text, cloze); 
	}

	this.text = text;
	// console.log(this.text);

	this.cloze = cloze;
	// console.log(this.cloze);
	
	if(text.includes(cloze)) {

		this.partial = text.replace(cloze, "...");
	}

	else {
		console.log("Error: Text does not include cloze.");
		this.partial = "Error";
	}
}

module.exports = ClozeCard;