Ext.application({
    name : 'trialApp',
    
    launch : function(){
        
        Ext.create('Ext.container.Viewport', 
        {
            layout : 'fit',
            
            items : [{
                title : 'First ExtJS Application',
                html : 'Application Viewport area.'
            }]
        });
        
    }
});
