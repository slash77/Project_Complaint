/*Ext.define('MyApp.MyPanel', {
    extend : 'Ext.Panel',
    title  : 'Hello World',
    html   : 'Hello <b>World</b>...'
});


Ext.application({
    name   : 'TicketCounter',

    launch : function() {

       Ext.create('Ext.Panel', {
            renderTo     : Ext.getBody(),
            width        : 200,
            height       : 150,
            bodyPadding  : 5,
            title        : 'TicketPortal',
            html         : 'Welcomce to <b>ticket portal</b>'
        });
		
        Ext.create('MyApp.MyPanel', {
            renderTo : Ext.getBody(),
			width        : 200,
            height       : 150,
            bodyPadding  : 5,
            title    : 'Second Panel',
            html     : 'Second Panel'
        });

    }
});
*/
Ext.application({
    name   : 'MyApp',

    launch : function() {

        Ext.widget({
            renderTo : Ext.getBody(),
            xtype    : 'grid',
            title    : 'Grid',
            width    : 650,
            height   : 300,
            plugins  : 'rowediting',
            store    : {
                fields : [ 'name', 'age', 'votes', 'credits' ],
                data   : [
                    [ 'Bill', 35, 10, 427 ],
                    [ 'Fred', 22, 4, 42 ]
                ]
            },
            columns: {
                defaults: {
                    editor : 'numberfield',
                    width  : 120
                },
                items: [
                    { text: 'Name', dataIndex: 'name', flex: 3, editor: 'textfield' },
                    { text: 'Age', dataIndex: 'age' },
                    { text: 'Votes', dataIndex: 'votes' },
                    { text: 'Credits', dataIndex: 'credits' }
                ]
            }
        })
		
/*-------------------------Listeners egs.-----------------------------------*/
	

	/*	Ext.create('Ext.Button', {
				text: 'Click Me',
				renderTo: Ext.getBody(),
				listeners: {
					click: function() {
						Ext.Msg.alert('I was clicked!');
					}
				}
			});		
			
		Ext.create('Ext.Button', {
		renderTo: Ext.getBody(),
		text: 'My Button',
		listeners: {
			mouseover: function() {
				this.hide();
			},
			hide: function() {
				// Waits 1 second (1000ms), then shows the button again
				Ext.defer(function() {
					this.show();
				}, 1000, this);
			}
		}
	 });
	 
	
	var button = Ext.create('Ext.Button', {
    renderTo: Ext.getBody(),
    text: 'My Button'
	});

	button.on({
		
		click:function(){
		
			Ext.Msg.alert('Stop it!!');		
		}
	});
	
	


	
/*-------------------------Listeners egs.-----------------------------------*/
		
	/*	Ext.create('Ext.Panel', {
			renderTo: Ext.getBody(),
			width: 400,
			height: 300,
			layout: 'column',
			title: 'Container Panel',
			items: [
				{
					xtype: 'panel',
					title: 'Child Panel 1',
					height: 100,
					//width: '75%'
					columnWidth:0.5,
					
				},
				{
					xtype: 'panel',
					title: 'Child Panel 2',
					height: 100,
					//width: '75%'
					columnWidth:0.5,	
				}
			],
			listeners: {
			afterrender:function()
			{
				Ext.Msg.alert('child has been created');
			}}
			
		});
	var containerPanel = Ext.create('Ext.panel.Panel', {
    renderTo: Ext.getBody(),
    width: 400,
    height: 200,
    title: 'Container Panel',
    layout: 'column',
    suspendLayout: true // Suspend automatic layouts while we do several different things that could trigger a layout on their own

});

// Add a couple of child items.  We could add these both at the same time by passing an array to add(),
// but lets pretend we needed to add them separately for some reason.

containerPanel.add({
    xtype: 'panel',
    title: 'Child Panel 1',
    height: 100,
    columnWidth: 0.5
});

containerPanel.add({
    xtype: 'panel',
    title: 'Child Panel 2',
    height: 100,
    columnWidth: 0.5
});
// Turn the suspendLayout flag off.
	containerPanel.suspendLayout = false;
// Trigger a layout.
	containerPanel.doLayout();
    }
});
*/


/*
Ext.application({
name: 'first Grid',
launch :function(){

Ext.create('Ext.data.Store', {
    storeId: 'simpsonsStore',
    fields:[ 'name', 'email', 'phone'],
    data: [
        { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
        { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
        { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
        { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
    ]
});

Ext.create('Ext.grid.Panel', { 	
	xtype: 'grid',
    title: 'Simpsons',
	plugins:'rowediting',
    store: Ext.data.StoreManager.lookup('simpsonsStore'),
    columns: [
        { text: 'Name', dataIndex: 'name' },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Phone', dataIndex: 'phone' }
    ],
    height: 200,
    width: 400,
    renderTo: Ext.getBody()
});

}});
*/



/*
Ext.application({

name: 'Event',
launch : function() {

Ext.create('Ext.Panel', {
    html: 'My Panel',
    renderTo: Ext.getBody(),
    listeners: {
        afterrender: function() {
            Ext.Msg.alert('We have been rendered');
        }
    }
});


}});
*/