var Config = require("../config.js");
var Functions = require("../Requires/Functions.js");
var Request = require("../Requires/Request.js");
var Event_View_Model = require('../ViewModel/Event_View_Model.js');
var Character_View_Model = require('../ViewModel/Character_View_Model.js');

		
var config = new Config();
var functions =  new Functions(); 
	
config.TIMESTAMP = functions.setTimeStamp();
config.HASH = functions.setMd5Hash(config.TIMESTAMP+
									config.PRIVATE_API_KEY+
									config.PUBLIC_API_KEY);
	
var request = new Request(config);
	
function Event_Controller(){
	
	this.GetEventByName = function(name,vSuccess){
	//this.GetEventByName = function(name){
		if ( functions.bIsOnline() ){
			functions.RequestGet(
				'name',
				name,
				config,
				'/v1/public/events?',
				function(data){
					var oResult = functions.ParseResult(data);
					switch(oResult.code){
						case 200:
							var oEvent = new Event_View_Model();
							
							oEvent.id = oResult.data[0].id;
							oEvent.title = oResult.data[0].title;
							oEvent.description =  oResult.data[0].description;
							oEvent.thumbnail = oResult.data[0].thumbnail.path +'.'+
													oResult.data[0].thumbnail.extension;
							
							//var characters = [];
							for (var count = 0; count < (oResult.data[0].characters.returned * 1); count++ ){
								
								var oCharacter = new Character_View_Model();
								oCharacter.name = oResult.data[0].characters.items[count].name;
								
								oEvent.characters.push(oCharacter);
							}
								
													
							vSuccess(oEvent);						
							//Ti.API.info ('objeto generado por view model'+'\n'+JSON.stringify(oEvent));
						break;
						case 409:
							alert(oResult.status);
						break;
						default: break;
					}
					
				},
				function(){
					
				}
			);
		}
	};
	
	this.GetEventById = function(id,vSuccess){
	//this.GetEventById = function(id){
		if ( functions.bIsOnline() ){
			functions.RequestGet(
				'id',
				id,
				config,
				'/v1/public/events?',
				function(data){
					var oResult = functions.ParseResult(data);
					switch(oResult.code){
						case 200:
							var oEvent = new Event_View_Model();
							
							oEvent.id = oResult.data[0].id;
							oEvent.title = oResult.data[0].title;
							oEvent.description =  oResult.data[0].description;
							oEvent.thumbnail = oResult.data[0].thumbnail.path +'.'+
													oResult.data[0].thumbnail.extension;
							
							//var characters = [];
							for (var count = 0; count < (oResult.data[0].characters.returned * 1); count++ ){
								
								var oCharacter = new Character_View_Model();
								oCharacter.name = oResult.data[0].characters.items[count].name;
								
								oEvent.characters.push(oCharacter);
							}
								
													
							vSuccess(oEvent);						
							//Ti.API.info ('objeto generado por view model'+'\n'+JSON.stringify(oEvent));
						break;
						case 409:
							alert(oResult.status);
						break;
						default: break;
					}
					
				},
				function(){
					
				}
			);
		}
	};
	
}

module.exports = Event_Controller;
