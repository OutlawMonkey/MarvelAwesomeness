

function Event_View(_args){
	
	var Event_Controller = require ("/Controller/Event_Controller.js");
	var Character_Controller = require("/Controller/Character_Controller.js");
	
	Ti.API.info('entre en Event_View');
	
	var window_win = Ti.UI.createWindow({
		backgroundColor:'white',
		title:'Event Detail'
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
	
	function createEventView (eventViewModel){
		
		var event_name_lbl = Ti.UI.createLabel({
			left:5, right:5, top:5, height:40,
			font:{fontSize:22, fontWeight:'bold'}, color:'#000', textAlign:'center',
			text: eventViewModel.title 
		});
			
		var event_img_view = Ti.UI.createImageView({
			left:5, right:5, top:5,
			width:300, height:300,
			image:eventViewModel.thumbnail,
		});
		
		var event_description_lbl = Ti.UI.createLabel({
			left:5, right:5, top:5, height:'auto',
			font:{fontSize:16}, color:'#000', 
			textAlign:Ti.UI.TEXT_ALIGNMENT_JUSTIFY,
			text: eventViewModel.description
		});
		
		var event_characters_lbl = Ti.UI.createLabel({
			left:5, right:5, top:5, height:40,
			font:{fontSize:22, fontWeight:'bold'}, color:'#000', textAlign:'center',
			text: 'Characters' 
		});
		
		
		content_view.add(event_name_lbl);
		content_view.add(event_img_view);
		content_view.add(event_description_lbl);
		content_view.add(event_characters_lbl);
		
		for (var count = 0 ; count < eventViewModel.characters.length; count++ ){
				
			var characterController = new Character_Controller(); 
				
			characterController.GetCharacterByParam(
				'name',
				eventViewModel.characters[count].name,
				function(charViewModel){
					 content_view.add( createCharView(charViewModel)  );
				});
				
		}
				
		
	}	
	
	
	function createCharView (charViewModel){
		
		var char_img_view = Ti.UI.createImageView({
			left:5, right:5, top:5,
			width:200, height:200,
			image:charViewModel.thumbnail,
		});
		
		char_img_view.addEventListener('click',function(){
			
			var window_temp = require('View/Character_View.js');
			
			win = new window_temp({
				title:charViewModel.name, 
				containingTab:_args.containingTab,
				tabGroup:_args.tabGroup
				});
			
			win.charParamName='name';
			win.charParamData=charViewModel.name;
			
			_args.containingTab.open( win , {animated:true});
			
		});
		
							
		return char_img_view;
	}
	
	
	function loadEvent(paramData){
		
		content_view.removeAllChildren();
		
		var eventController = new Event_Controller();
			
		eventController.GetEventById(
			paramData,
			function(eventViewModel){
				Ti.API.info(JSON.stringify(eventViewModel));
				createEventView(eventViewModel);
			}
		);
		
							
	}

	window_win.addEventListener('open',function(){
		
		Ti.API.info("evento open");
		
		loadEvent(window_win.eventParamData);		

		
		load_ind.show();


		setTimeout(function(){
			
			load_ind.hide();
			panel_scl.remove(temp_content_view);
			
			
		}, 3800);
		
		
		
		
	});
	
	return window_win;	
}

module.exports = Event_View;
