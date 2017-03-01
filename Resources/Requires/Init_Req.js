
Ti.API.info('apunto de inicializar la clase config');


var Config = require("../config.js");

Ti.API.info('Clase config inicializada');

Config.TIMESTAMP = setTimeStamp();
Config.HASH = setMd5Hash(Config.TIMESTAMP+Config.PRIVATE_API_KEY+Config.PUBLIC_API_KEY);
