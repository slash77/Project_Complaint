<script type="text/javascript" src="D:/Git/Project_Complaint/ext_sets/ext-4.0.1/ext-all.js"></script>
<script type="text/javascript" src="D:/Git/Project_Complaint/ext_sets/ext-4.0.1/ext.js"></script>
<script>
Ext.define('Student', 
{
    name : 'unnamed',
    getName : function(){
        return "Student name is" + this.name; 
    }
}, function(){
    console.log('Student object created');
});
</script>