var Capitals = function(country, capital) {

	if(!(this instanceof Capitals)) {

		return new Capitals(country, capital); 
	}

	this.country = country;
    this.capital = capital;
}

module.exports = Capitals;