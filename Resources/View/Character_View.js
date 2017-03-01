var Character_Controller = require("../Controller/Character_Controller.js");


function Character_View(_args){
	
	//this.CharParamName ="";
	//this.CharParamData ="";
	Ti.API.info('entre en Character_View');
	
	var window_win = Ti.UI.createWindow({
		backgroundColor:'white',
		title:'Character Detail'
	});
	
	
	var panel_scl = Ti.UI.createScrollView({
	left:0, right:0, bottom:0, top:0,
	contentWidth:Ti.UI.FILL,
	contentHeight:Ti.UI.SIZE,
	showVerticalScrollIndicator: true,
	showHorizontalScrollIndicator: false
	});
	window_win.add(panel_scl);
	
	var content_view =  Ti.UI.createView({
		left:0, right:0,
		height:'auto',
		layout:'horizontal'
	});
	panel_scl.add(content_view);

	
	var temp_content_view =  Ti.UI.createView({
		left:0, right:0,
		height:'auto',
		layout:'horizontal',
		backgroundColor:'white'
	});
	panel_scl.add(temp_content_view);
	
	var load_ind = Ti.UI.createActivityIndicator({
		top: 50, center: 0, 
		width: 100, height: 100,
		color : 'black',
		message : 'Fetching...'
	});
	
	temp_content_view.add(load_ind);
	
	function createCharView (charViewModel){
		
		var char_name_lbl = Ti.UI.createLabel({
			left:5, right:5, top:5, height:40,
			font:{fontSize:22, fontWeight:'bold'}, color:'#000', textAlign:'center',
			text: charViewModel.name 
		});
			
		var char_img_view = Ti.UI.createImageView({
			left:5, right:5, top:5,
			width:300, height:300,
			image:charViewModel.thumbnail
		});
		
		
		var char_description_lbl = Ti.UI.createLabel({
			left:5, right:5, top:5, height:'auto',
			font:{fontSize:16, fontWeight:'bold'}, color:'#000', 
			textAlign:Ti.UI.TEXT_ALIGNMENT_JUSTIFY,
			text: charViewModel.description
		});
					
		content_view.add(char_name_lbl);
		Ti.API.info('agregue nombre');
		content_view.add(char_img_view);
		Ti.API.info('agregue imagen');
		content_view.add(char_description_lbl);
		Ti.API.info('agregue descripción');
	}
	
	
	function loadCharacter(paramName,paramData){
		
		content_view.removeAllChildren();
		
		var characterController = new Character_Controller();
		
		characterController.GetCharacterByParam(
			paramName,
			paramData,
			function(charViewModel){
				Ti.API.info('valor de charViewModel en linea 88' + '\n'+ JSON.stringify(charViewModel) );
				createCharView(charViewModel);
				Ti.API.info('vista creada');		 
		});
							
	}
	
	
	window_win.addEventListener('open',function(){
		
		Ti.API.info("evento open");
		
		loadCharacter(window_win.charParamName,window_win.charParamData);		

		load_ind.show();

		setTimeout(function(){
			
			load_ind.hide();
		
			panel_scl.remove(temp_content_view);
			
			
		}, 3000);
		
		
		
		
	});
	
	return window_win;	
}

module.exports = Character_View;
