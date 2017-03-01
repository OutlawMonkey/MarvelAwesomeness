var Event_Controller = require("../Controller/Event_Controller.js");


function Event_List_View(_args){
	
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
	
	Ti.API.info('entre en Event_List_View');
	
	var window_win = Ti.UI.createWindow({
		backgroundColor:'white',
		title:'Awesome Events'
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
			
		var event_view = Ti.UI.createImageView({
			left:5, right:5, top:5, bottom:5,
			width:300, height:300,
			image:eventViewModel.thumbnail,
		});
		
		
		event_view.addEventListener('click', function(){
			
			var window_temp = require('View/Event_View.js');
			
			win = new window_temp({
				title:eventViewModel.title, 
				containingTab:_args.containingTab,
				tabGroup:_args.tabGroup
				});
			
			win.eventParamData=eventViewModel.id;
			
			_args.containingTab.open( win, {animated:true});
			
			
		});
		
		//event_view.add(event_label);
		
		Ti.API.info("vista creada");
			
		return event_view;
	}	
	
	
	function loadEvents(){
		
		content_view.removeAllChildren();
		
		for (var count = 0 ; count < aEvent.length; count++){	
			var eventController = new Event_Controller();
			
			eventController.GetEventByName(
				aEvent[count],
				function(eventViewModel){
					 content_view.add( createEventView(eventViewModel)  );
				});
							
		}
	}
	
	window_win.addEventListener('open',function(){
		
		Ti.API.info("evento focus");
		
		loadEvents();		

		
		load_ind.show();

		setTimeout(function(){
			
			load_ind.hide();
		
			panel_scl.remove(temp_content_view);
			
		}, 3000);
		
		
		
		
	});
	
	return window_win;	
}

module.exports = Event_List_View;
