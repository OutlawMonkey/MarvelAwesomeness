var Result = require("../Requires/Result.js");


function Functions(){

	
	this.setTimeStamp = function(){
		var d = new Date();
		return  Math.floor(d/1000);
	};
	
	this.setMd5Hash = function(value){
		return Ti.Utils.md5HexDigest(value);
	};
	
	this.bIsOnline = function(){
		var online = true;
		if (Titanium.Network.online == false) {
			online = false;
		}
		return online;
	};
	
	this.RequestPost = function(url,params,action,error){
		
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function(){
			Ti.API.info(this.responseText);
			action(this.responseText);
		};
		xhr.onerror = function(){
			error();
		};
		xhr.open("POST",url);
		xhr.send(params);
	};
	
	this.RequestGet = function(paramsName,params,config,resource,action,error){
		
		var paramString = 'apikey='+config.PUBLIC_API_KEY+'&hash='+config.HASH+'&ts='+config.TIMESTAMP;
		
		if (params != ""){
			paramString += ( '&'+paramsName+'='+ params );
		}
		
		var url = config.ENDPOINT+resource+paramString;
		
		//Ti.API.info(url);
		
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function(){
			//Ti.API.info(this.responseText);
			action(this.responseText);
		};
		xhr.onerror = function(){
			Ti.API.info(this.responseText);
		};
		xhr.open("GET",url);
	
		xhr.send( );
	};
	
	this.ParseResult = function(aResponse){
		
		var aResultData=eval('(['+aResponse+'])');
		var result=new Result();
		result.code=aResultData[0].code;
		result.status=aResultData[0].status;
		
		if(aResultData[0].data.results==null){
			result.data={};
		}else{
			result.data=aResultData[0].data.results;
		}
		
		return result;
	};
	

}

module.exports =  Functions;

