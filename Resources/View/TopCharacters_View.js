var Character_Controller = require("../Controller/Character_Controller.js");


function TopCharacters_View(_args){
	
	var aEvent = [
		'Iceman',
		'Magneto',
		'Hulk',
		'Thor',
		'X-Man',
		'Jean Grey',
		'Wolverine',
		'Thanos',
		'Galactus',
		'Franklin Richards'
	];
	
	Ti.API.info('entre en TopCharacters_View');
	
	var window_win = Ti.UI.createWindow({
		backgroundColor:'white',
		title:'Top Characters'
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
			
		var char_view = Ti.UI.createImageView({
			left:5, right:5, top:5, bottom:5,
			width:300, height:300,
			image:charViewModel.thumbnail,
		});
		
		
		char_view.addEventListener('click', function(){
		
			
			var window_temp = require('View/Character_View.js');
			
			win = new window_temp({
				title:charViewModel.name, 
				containingTab:_args.containingTab,
				tabGroup:_args.tabGroup
				});
			
			win.charParamName='id';
			win.charParamData=charViewModel.id;
			
			_args.containingTab.open( win , {animated:true});
	
			
			
		});
		
		//event_view.add(event_label);
		
		Ti.API.info("vista creada");
			
		return char_view;
	}	
	
	
	function loadCharacters(){
		
		content_view.removeAllChildren();
		
		for (var count = 0 ; count < aEvent.length; count++){	
			var characterController = new Character_Controller();
			
			characterController.GetCharacterByParam(
				'name',
				aEvent[count],
				function(charViewModel){
					 content_view.add( createCharView(charViewModel)  );
				});
							
		}
	}
	
	window_win.addEventListener('open',function(){
		
		Ti.API.info("evento open");
		
		loadCharacters();		

		load_ind.show();

		setTimeout(function(){
			
			load_ind.hide();
		
			panel_scl.remove(temp_content_view);
		}, 3000);
		
			
	});
	
	return window_win;	
}

module.exports = TopCharacters_View;
