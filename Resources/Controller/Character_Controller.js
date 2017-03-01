var Config = require("../config.js");
var Functions = require("../Requires/Functions.js");
var Request = require("../Requires/Request.js");
var Character_View_Model = require('../ViewModel/Character_View_Model.js');

		
var config = new Config();
var functions =  new Functions(); 
	
config.TIMESTAMP = functions.setTimeStamp();
config.HASH = functions.setMd5Hash(config.TIMESTAMP+
									config.PRIVATE_API_KEY+
									config.PUBLIC_API_KEY);
	
var request = new Request(config);
	
function Character_Controller(){
	
	this.GetCharacterByName = function(name,vSuccess){
	//this.GetCharacterByName = function(name){	
		
		Ti.API.info ('inicializando controller');
		
		if ( functions.bIsOnline() ){
			functions.RequestGet(
				'name',
				name,
				config,
				'/v1/public/characters?',
				function(data){
					var oResult = functions.ParseResult(data);
					switch(oResult.code){
						case 200:
							var oCharacter = new Character_View_Model();
							
							oCharacter.id = oResult.data[0].id;
							oCharacter.name = oResult.data[0].name;
							oCharacter.description =  oResult.data[0].description;
							oCharacter.thumbnail = oResult.data[0].thumbnail.path +'.'+
													oResult.data[0].thumbnail.extension;
													
							vSuccess(oCharacter);						
							Ti.API.info ('objeto generado por view model'+'\n'+JSON.stringify(oCharacter));
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
	
	//this.GetCharacterById = function(id,vSucces){
	this.GetCharacterById = function(id){
		if ( functions.bIsOnline() ){
			functions.RequestGet(
				'id',
				id,
				config,
				'/v1/public/characters?',
				function(data){
					var oResult = functions.ParseResult(data);
					switch(oResult.code){
						case 200:
							var oCharacter = new Character_View_Model();
							
							oCharacter.id = oResult.data[0].id;
							oCharacter.name = oResult.data[0].name;
							oCharacter.description =  oResult.data[0].description;
							oCharacter.thumbnail = oResult.data[0].thumbnail.path +'.'+
													oResult.data[0].thumbnail.extension;
													
							vSuccess(oCharacter);						
							Ti.API.info ('objeto generado por view model'+'\n'+JSON.stringify(oCharacter));
						break;
						case 409:
							alert(oResult.status);
						break;
						default: break;
					}
					
				},
				function(){
					Ti.API.info('error Line');
				}
			);
		}
	};
	
	this.GetCharacterByParam = function(paramName,param,vSuccess){
		if ( functions.bIsOnline() ){
			functions.RequestGet(
				paramName,
				param,
				config,
				'/v1/public/characters?',
				function(data){
					var oResult = functions.ParseResult(data);
					switch(oResult.code){
						case 200:
							var oCharacter = new Character_View_Model();
							
							oCharacter.id = oResult.data[0].id;
							oCharacter.name = oResult.data[0].name;
							oCharacter.description =  oResult.data[0].description;
							oCharacter.thumbnail = oResult.data[0].thumbnail.path +'.'+
													oResult.data[0].thumbnail.extension;
													
							vSuccess(oCharacter);						
							Ti.API.info ('objeto generado por view model'+'\n'+JSON.stringify(oCharacter));
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

module.exports = Character_Controller;
