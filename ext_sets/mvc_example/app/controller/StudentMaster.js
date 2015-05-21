Ext.define('School.controller.StudentMaster', {
    extend: 'Ext.app.Controller',
    models: ['School.model.Student'],
    views: ['School.view.StudentMaster'],

    refs: [{
        ref: 'studentMasterForm',
        selector: 'viewport > container > StudentMaster'
    }],

    init: function () {
        this.control({

            'viewport > container > StudentMaster button[itemId=btnCreate]': {
                click: this.onCreateClick
            },
            'viewport > container > StudentMaster button[itemId=btnLoad]': {
                click: this.onLoadClick
            },
            'viewport > container > StudentMaster button[itemId=btnUpdate]': {
                click: this.onUpdateClick
            },
            'viewport > container > StudentMaster button[itemId=btnDelete]': {
                click: this.onDeleteClick
            },
            'viewport > container > StudentMaster button[itemId=btnReset]': {
                click: this.onResetClick
            },
            'viewport > container > StudentMaster button[itemId=btnClear]': {
                click: this.onClearClick
            }
        });
    },
   
    onResetClick: function () {
        this.getStudentMasterForm().getForm().reset();
    },
   
    onClearClick: function () {
        this.getStudentMasterForm().clearForm();
    }
});
