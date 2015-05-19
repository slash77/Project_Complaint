Ext.application({
	//requires : ['Ext.window.MessageBox'],
	//Ext.app.Controller --base class for any controller.
	//Ext.data.proxy. --base class for proxy.
	//Ext.data.Store --base class for all data stores.
	//https://fiddle.sencha.com/#fiddle/3kt
    name : 'trialApp',
    
    launch : function(){
        Ext.Msg.alert('Status', 'This is First ExtJS 4 Alert.');
        Ext.create('Ext.container.Viewport', 
        {
            layout : 
			{
				type:'border'
			},
            
            items : [
			{
            region: 'west',
            title: 'Left bar (west region)',
            width: 150,
            html:'Navigation goes here'
			
        },{
				region: 'center',
                title : 'First ExtJS Application',
                html : '<h1>Application Viewport area</h1>'
				
				
            }]
        });
        
    }
});
