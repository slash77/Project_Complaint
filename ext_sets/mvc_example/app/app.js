 onLoad: function(){

        var existingStudent = Ext.ModelMgr.getModel('School.model.Student');

        existingStudent.load(1, {
            scope: this, //controller would be accessible inside load
            failure: function (record, operation) {
                Ext.Msg.alert('Status', 'Service request faild.');
            },
            success: function (record, operation) { //do something if the load succeeded
                try {
                    this.getStudentMasterForm().loadRecord(record);
                    Ext.Msg.alert('Status', 'Records loaded successfully.');

                }
                catch (ex) {
                    Ext.Msg.alert('Status', 'Invalid data in server response: ' + ex.Message);
                }

            }
        });

    }