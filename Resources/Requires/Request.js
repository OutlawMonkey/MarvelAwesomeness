//function Request(config){
function Request(config){
	/*
	this.apikey = config.PUBLIC_API_KEY;
	this.ts = config.TIMESTAMP;
	this.hash = config.HASH;
	*/
	this.params = new params(config);
	//this.data = null;
}

function params(config){
	this.apikey = config.PUBLIC_API_KEY;
	this.ts = config.TIMESTAMP;
	this.hash = config.HASH;
}

module.exports = Request;