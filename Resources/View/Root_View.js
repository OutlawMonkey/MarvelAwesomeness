//var Event_List_View = require('../View/Event_List_View.js');
//var eventView_win = new Event_List_View(); 
function Root_View(){
	
	var window_win = Ti.UI.createWindow({
		//title:title,
		backgroundColor:'white'
	});
	
	var content_view =  Ti.UI.createView({
		left:0, right:0,
		top:0, bottom:0,
		layout:'vertical'
	}); 
	
	window_win.add(content_view);
	
	var events_view = Ti.UI.createView({
		top:5, width:'90%', height:'45%',
		backgroundImage:'/assets/images/events.jpg'
	});
	
	
	var events_label = Ti.UI.createLabel({
		top:'30%', left:5, right:5, height:40,
		backgroundColor:'#80000000',
		font:{fontSize:20, fontWeight:'bold'}, color:'#FFF', textAlign:'center',
		text: 'MOST AWESOME EVENTS'
	});
	
	events_view.addEventListener('click', function(){
		
		var window_temp = require('View/Event_List_View.js');;
		win = new window_temp({title:'Most Awesome Events', containingTab:window_win.containingTab,tabGroup:window_win.tabGroup});
		window_win.containingTab.open(win,{animated:true});
		
	});

	events_view.add(events_label);
	window_win.add(events_view);
	
	var characters_view = Ti.UI.createView({
		top:'55%', width:'90%', height:'45%',
		backgroundImage:'/assets/images/characters.jpg'
	});
	
	
	var characters_label = Ti.UI.createLabel({
		top:'30%', left:5, right:5, height:40,
		backgroundColor:'#80000000',
		font:{fontSize:20, fontWeight:'bold'}, color:'#FFF', textAlign:'center',
		text: 'TOP CHARACTERS'
	});
	
	characters_view.addEventListener('click', function(){
		
		var window_temp = require('View/TopCharacters_View.js');;
		win = new window_temp({title: 'TOP CHARACTERS', containingTab:window_win.containingTab,tabGroup:window_win.tabGroup });
		window_win.containingTab.open(win,{animated:true});
		
	});
	

	characters_view.add(characters_label);
	window_win.add(characters_view);
	
	return window_win;
	
}

module.exports = Root_View;
