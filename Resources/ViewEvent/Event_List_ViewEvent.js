var Event_Controller = require("../Controller/Event_Controller.js");

function Event_List_ViewEvent(){
	
	var aEvent = [
		'Maximum Carnage',
		'Onslaught',
		'Planet Hulk',
		'World War Hulk',
		'Age of Ultron',
		'Civil War',
		'Infinity',
		'Infinity Gauntlet',
		'Infinity War',
		'Secret Wars'
	];	
	
	
	this.loadEvent = function(){
		
		var aResult = [];
		
		for (var count = 0; count < aEvent.length;count++ ){
			
			var eventController = new Event_Controller();
			
			eventController.GetEventByName(
				aEvent[count],
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

module.exports = Event_List_ViewEvent;
