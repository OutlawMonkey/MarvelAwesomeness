var Character_Controller = require("../Controller/Character_Controller.js");


function TopCharacters_ViewEvent(){
	
	var aChar = [
		'Iceman',
		'Magneto',
		'Hulk',
		'Thor',
		'X-Man',
		'Jean Grey',
		'Galactus',
		'Thanos',
		'Galactus',
		'Franklin Richards'
	];	
	
	
	this.loadTopCharacter = function(){
		
		var aResult = [];
		
		for (var count = 0; count < aChar.length;count++ ){
			
			var characterController = new Character_Controller();
			
			characterController.GetCharacterByName(
				aChar[count],
				function(data){
					//Ti.API.info(data);
					aResult.push(data);
				}
			);
				
		}
		
		Ti.API.info("contenido array "+aResult);
		
		return aResult;
			
	};
	
	
}

module.exports = TopCharacters_ViewEvent;
