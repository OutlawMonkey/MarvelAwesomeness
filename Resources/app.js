
var Root_tabGroup = Ti.UI.createTabGroup();
Root_tabGroup.tabBarHidden=true;

var Root_View = require("/View/Root_View.js");
var root_win = new Root_View();
    
var Root_tab = Ti.UI.createTab({
        window: root_win
});

root_win.containingTab=Root_tab;


Root_tabGroup.addTab(Root_tab); 
   
Root_tabGroup.open();
