<head><link id="lsmGrid" type="text/css" href="$!{WEBROOT}/lsm/css/LSM.css" rel="stylesheet"></link>
<link id="lsmGrid" type="text/css" href="$!{WEBROOT}/ext/ux/gridfilters/css/GridFilters.css" rel="stylesheet"></link></head>
<script type="text/javascript" src="$!{WEBROOT}/ext/GridFilters/GridFilters.js"></script>
<script type="text/javascript" src="$!{WEBROOT}/ext/GridFilters/filter/Filter.js"></script>
<script type="text/javascript" src="$!{WEBROOT}/ext/GridFilters/filter/StringFilter.js"></script>
<script type="text/javascript" src="$!{WEBROOT}/lsm/DateFilter_New.js"></script>
<script type="text/javascript" src="$!{WEBROOT}/ext/GridFilters/filter/ListFilter.js"></script>
<script type="text/javascript" src="$!{WEBROOT}/lsm/NumericFilter_new.js"></script>

<script type="text/javascript" src="$!{WEBROOT}/ext/GridFilters/filter/BooleanFilter.js"></script>
<style>
  

.deletebutton{
border-top: #C1D7EC 1px solid;
border-right: #333399 1px solid;
border-bottom: #000066 1px solid;       
border-left: #C1D7EC 1px solid;
background: #6699CC;    
color: #ffffff;               
height: 5px;  
width: 30px;
text-align: top;        
font-family: Verdana, Arial, Helvetica, sans-serif;
font-size: 9px;
font-weight: normal;      
margin: 0px;
cursor: pointer;
cursor: hand;
}

</style>

<script>


Trigger1 = new Ext.form.TriggerField({
            id:'id1',
            triggerClass:'x-form-search-trigger',
            editable: false,
            emptyText:'Select One'
        });
                    
CommentTrigger1 = new Ext.form.TriggerField({
            id:'id2',
            triggerClass:'triggerlens',
            editable: true,
                                          maxLength:500,
                                          maxLengthText:jsAlertMessages["max_length_exceeded"]
        });

DateTrigger1 = new Ext.form.DateField({
            id:'id3',
            triggerClass:'x-form-date-trigger',
                                          onTriggerClick: function() {
                                                            var pmt=this;
                                                           Ext.form.DateField.prototype.onTriggerClick.apply(this, arguments);
                                                           },
                                                        listeners: {
                                                                          // required for the first render event
                                                                            afterrender: function(combo) {
                                                                              combo.onTriggerClick();
                                                                            },
                                                                            // required after render during activating an other combo in the column
                                                                            show: function(combo) {
                                                                              combo.onTriggerClick();
                                                                            },
                                                                            select:function(combo) {
                                                                              combo.triggerBlur();
                                                                            }
                                                                     },
            editable: true,
            emptyText:''
        });
var gridTravRegions=new Array();
var dispdone=new Array();
var createOnLoad;
var readOnlyScreen=false;
var summaryFields;
var summaryLines=3;
var cmfloating=new Array();
var floatingGrid ;
var openfloatingBar;
var turnon;
var turnoff;
var storefloat;
var scrollState;
var reader;
var cellEditSucess=1;
var myhtm;
var savedFlg=1;
var gridRegion;
var currentRegion;
var currentRegionIndex;
var currentRow='';
var deleteArr=new Array();
var GridRecarr=new Array();
var GridRecarrDisp=new Array();
var gridWidth=new Array();
var inlineflag=1;
var inlinerec='';
var inlinereg='';
var flgcheckRegion='';
var flgcheckRow='';
var showingRegionid='';
var showingrec='';
var gridHiddenArr=new Array();
var gridRequiredArr=new Array();
var regions_to_render=new Array();
var regionfields=new Array();
var regionfieldtype=new Array();
var regionfieldsize=new Array();
var gridNames=new Array();
var gridfields=new Array();
var gridfieldsName=new Array();
var indexFromMulti=new Array();
var multiFromId=new Array();
var editSupportDone=new Array();
var gridRowFromCurrRow=new Array();
var gridcolmod=new Array();
var gridfilters=new Array();
var col_filters=new Array();
var memoryProxy = new Array();
 
var gridColumnModel=new Array() ;
var myGrid=new Array();
var gridDataStore=new Array();
var pageno=new Array();

var rowsperpage =new Array();
var defaultperpage=5;
var selectLabel=new Array();
var defSelectLabel = 'Select';
var selectToolTip= new Array();
var defSelectToolTip='Select item'

var deleteLabel=new Array();
var defDeleteLabel = 'Delete Selected';
var deleteToolTip= new Array();
var defDeleteToolTip='Delete the selected item'

var addItemLabel=new Array();
var defAddItemLabel='Add Item';
var addItemToolTip=new Array();
var defAddItemToolTip='Add a new row';
var copyLabel=new Array();
var defCopyLabel='Copy Selected';
var copyToolTip=new Array();
var defCopyToolTip='Copy the selected item';
var verticalViewLabel=new Array();
var defVerticalViewLabel='Vertical View';
var verticalViewToolTip=new Array();
var defVerticalViewToolTip='View the selected records Vertically';
var clearFiltersLabel=new Array();
var defClearFiltersLabel='Clear Filters';
var clearFiltersToolTip=new Array();
var defClearFiltersToolTip='Clear applied Filter';
var printLabel=new Array();
var defPrintLabel='Print';
var printToolTip=new Array();
var defPrintToolTip='Print the grid data';

var addrecflg=0;
var gridLabelOrig=new Array();
var gridLabelAppd=new Array();

var syscheckField;
var syscheckMultiFlg;
var syscheckMulti;
var syscheckMultiname;
var validateGrid;
var editValues2dArr=new Array();
var editText2dArr=new Array();
var editStored=new Array();
var editDispvalue=new Array();  
var editHtmValArr=new Array();

var gridSelList=new Array();
var prefixsuffix = new Array();
var addrowFlg=0;
var regions_pkey=new Array();

var dynaminColumSequence=new Array();
function addRecToGrid(recs,Multi,idx,calledfrom)
{
  var itemno;
       var myrow=((pageno[recs]-1 )*rowsperpage[recs])+idx-1+2;
       GridRecarr[recs][idx] = new Array();
       GridRecarrDisp[recs][idx] = new Array();
        
        if(calledfrom=="D")
         {
             itemno= (idx+((recs+1) *1000))  * -1 ;
         }
         else
         {
             itemno=idx+((recs+1) *1000);
             
          }
         
          GridRecarr[recs][idx][0] = itemno;
          GridRecarrDisp[recs][idx][0]= itemno;
         for (j=0;j<regionfields[recs].length;j++)
          {
               
    GridRecarr[recs][idx][j+1] = regionfields[recs][j].read(myrow);
             /* var actualtype= regionfieldtype[recs][j].replace('$').replace('#','');
              
              var presufindex= actualtype.indexOf('*');
              var pref=-1;
              var suff=-1;
             if(presufindex!=-1)
             {
               if(presufindex==0)
               {
                  pref= actualtype.substr(1,1);
               }
               else
               {
                  suff= actualtype.substr(actualtype.length-1,1);
               }
             }

           var appendpref='';
           var appendsuff='';
           if (pref!=-1)
           {
            
             appendpref= readprefSuffValue(prefixsuffix[pref],myrow);
           }
           if (suff!=-1)
           {
             appendsuff= readprefSuffValue(prefixsuffix[suff],myrow);
           }         
             
              if(getGridDisplayValue(regionfields[recs][j],myrow) != '')
              {
     GridRecarrDisp[recs][idx][j+1] = appendpref+''+getGridDisplayValue(regionfields[recs][j],myrow)+''+appendsuff;
              } 
              else
              {*/
                  
                   GridRecarrDisp[recs][idx][j+1] = getGridDisplayValue(regionfields[recs][j],myrow);

               /*}*/
              
         }
         
        GridRecarr[recs][idx][GridRecarr[recs][idx].length] =idx;
        GridRecarrDisp[recs][idx][GridRecarrDisp[recs][idx].length] =idx;
}
function gridRender(recs,Multi)
{
       gridProcess(recs,Multi);
       if(!GridRecarrDisp[recs])
       {
        GridRecarrDisp[recs]=new Array();
       }
       gridDataStore[recs].loadData(GridRecarrDisp[recs]);
       var grid=Ext.getCmp(Multi.name+'_grid');
      myGrid[recs].render("MSAI_TD_"+Multi.name+"_GRID"+"_1");
      
}

function gridProcess(recs,Multi)
{
          
        if(!GridRecarr[recs])
        {
            GridRecarr[recs]=new Array();
         }
         var reclength = GridRecarr[recs].length;
           if(Multi.getRowCount() > 0&&reclength ==0)
           {
              if(Multi.getRowCount()<5)
                reclength = Multi.getRowCount();
              else
                reclength =5;
           }
         var grid = Ext.getCmp(Multi.name+'_grid');
         
          grid.setWidth(gridWidth[recs]);
         if(reclength ==1 || Multi.getRowCount()==0)
         {
             Ext.getCmp(Multi.name+'_grid').setHeight(145);
             myGrid[recs].height=115;
          }
           if(reclength ==2)
         {
            Ext.getCmp(Multi.name+'_grid').setHeight(175);
             myGrid[recs].height=145;
          }
          if(reclength ==3)
         {
            Ext.getCmp(Multi.name+'_grid').setHeight(205);
             myGrid[recs].height=175;
          }
          if(reclength ==4)
         {
            Ext.getCmp(Multi.name+'_grid').setHeight(225);
             myGrid[recs].height=205;
          }
          if(reclength >=5)
         {
            Ext.getCmp(Multi.name+'_grid').setHeight(245);
            
             myGrid[recs].height=225;
          }
          var lastRowind = (Multi.getRowCount() % rowsperpage[recs]) ;
          var fromrec=0;
          var torec=0;
          if(lastRowind ==0)
          {
             lastRowind = rowsperpage[recs];
          }
          var totPages = ((Multi.getRowCount() - lastRowind )/ rowsperpage[recs])+1;
             
          if(pageno[recs]==null)
          {
              pageno[recs]=1;
          }
          if(totPages==0)
          {
             totPages=1;
          }
                 var tmpend=0;
                 
                 if(Multi.getRowCount()>0)
                 {
                 
                   fromrec = ((pageno[recs]-1 )*rowsperpage[recs])+1;
                   tmpend =((pageno[recs]-1 )*rowsperpage[recs])+rowsperpage[recs] ;
                 }
                  if( tmpend > regions_to_render[recs].getRowCount() )
                  {
                     tmpend=fromrec  + lastRowind-1;
                  }
                 torec = tmpend ;     

                    fromrec  =fromrec  +'';
                    torec =torec +'';

          var bbar = myGrid[recs].getBottomToolbar();
          if(bbar  !=null)
          {
               Ext.getCmp(Multi.name+'_first').enable();
               Ext.getCmp(Multi.name+'_prev').enable();
               Ext.getCmp(Multi.name+'_next').enable();
               Ext.getCmp(Multi.name+'_last').enable();
          if(totPages ==1)
          {
               Ext.getCmp(Multi.name+'_first').disable();
               Ext.getCmp(Multi.name+'_prev').disable();
               Ext.getCmp(Multi.name+'_next').disable();
               Ext.getCmp(Multi.name+'_last').disable();
          }
          else
          {
            if( pageno[recs] == totPages)
            {
               Ext.getCmp(Multi.name+'_next').disable();
               Ext.getCmp(Multi.name+'_last').disable();
            }
            if(pageno[recs]==1)
            {
               Ext.getCmp(Multi.name+'_first').disable();
               Ext.getCmp(Multi.name+'_prev').disable();
            }
          }
             Ext.getCmp(Multi.name+'_pg').setValue(pageno[recs]+'');
             Ext.getCmp(Multi.name+'tot').setText(totPages); 
             Ext.getCmp(Multi.name+'from').setText(fromrec); 
             Ext.getCmp(Multi.name+'to').setText(torec); 
          }
}

function saveEntryType(Multi)
{
  var runid=indexFromMulti[Multi.name];

     currentRegion=Multi.name;
     currentRegionIndex=runid;
     var flg= saveEntryTypeOnload(Multi,'NR');
      var rowToRender = (currentRow % rowsperpage[runid]) ;
      var pagetogo=pageno[runid];
      if(rowToRender!=0)
      {
       pagetogo = ((currentRow - rowToRender )/ rowsperpage[runid])+1;
      }
      if(rowToRender ==0)
      {
        rowToRender = rowsperpage[runid];
      }
     if(flg==1)
     {
      
        if(Multi.getRowCount() % rowsperpage[runid] ==1 || currentRow > pageno[runid]*rowsperpage[runid] )
        {
        GridRecarr[runid]=new Array();
        GridRecarrDisp[runid]=new Array();
        pageno[runid]=pagetogo ;                         
        goGridPage(pageno[runid],Multi,runid);
        }
        else
        {
          if(Multi.isMarkedForDeletion(currentRow))
          {
              addRecToGrid(runid,Multi,rowToRender-1,"D");
          }
          else{           
              addRecToGrid(runid,Multi,rowToRender-1,"S");
          }
          
        }
        
        savedFlg=1;
        gridRender(runid,Multi);
        
     }
     

}


function saveEntryTypeOnload(Multi,mode)
{
  var svgf=0;
  var formRenderer=getStrategyObject(Multi.id);

var reqflg=true;
   if ( mode=='S' || mode=='NR' )
   {
    reqflg = formRenderer.checkrequired();
   }
  if(reqflg)
  {

    if(gridOnSave(Multi))
    {
      var idx=indexFromMulti[Multi.name];
      currentRegion=Multi.name;
      
      deleteArr[idx]=new Array();
      if(mode=='S')
      {
        gridRender(idx,Multi);
        
      }
      savedFlg=1;
      svgf=1;
    }
    else
    {
       savedFlg=1;
     }

  }
  return svgf;
}

function saveEntryTypeSimply(Multi)
{
      var runid=indexFromMulti[Multi.name]      
      currentRegion=Multi.name;
      
      deleteArr[runid]=new Array();
       var rowToRender = (currentRow % rowsperpage[runid]) ;
      var pagetogo=pageno[runid];
      if(rowToRender!=0)
      {
       pagetogo = ((currentRow - rowToRender )/ rowsperpage[runid])+1;
      }
      if(rowToRender ==0)
      {
        rowToRender = rowsperpage[runid];
      }
          if(Multi.isMarkedForDeletion(currentRow))
          {
              addRecToGrid(runid,Multi,rowToRender-1,"D");
          }
          else{           
              addRecToGrid(runid,Multi,rowToRender-1,"S");
          }
          // alert("caller simply is " + arguments.callee.caller.toString());
           gridRender(runid,Multi);
         
   


}



function editEntryType(rowIndex,gridId)
{
    var myreg=eval('F.'+gridId.substr(0,3));
    savedFlg=0;
    var idx=indexFromMulti[myreg.name];
    currentRegion=myreg.name;
    var myrow =rowIndex-1+2;
    currentRow=((pageno[idx]-1 )*rowsperpage[idx])+myrow;
    //goDirect(myreg.id,currentRow);
    callEditSupport(myreg,currentRow-1);

          for (j=0;j<regionfields[idx].length;j++)
          {  
                  editValues2dArr[j] =new Array();
                  editText2dArr[j] =new Array();
                  
                        if(regionfields[idx][j].getColumnKind()==3)
                        {
                          
                           if(regionfields[idx][j].read(currentRow)!='')
                           {
                                        var curr_row_ind = gridFieldSequence(regionfields[idx][j],currentRow)-1 ;
                                        if(values2dArr[curr_row_ind] !=null)
                                        {
                                          editValues2dArr[j]=values2dArr[curr_row_ind].slice(0); 
                                          editText2dArr[j]=text2dArr[curr_row_ind].slice(0);
                                        }
                                        else
                                        {
                                            editValues2dArr[j][0]=valArr[curr_row_ind];
                                            editText2dArr[j][0]= dispValArr[curr_row_ind];
                                        }
                                          editStored[j] =valArr[curr_row_ind];
                                          editDispvalue[j] =dispValArr[curr_row_ind] ;
                                          editHtmValArr[j]=htmValArr[curr_row_ind];
                          }
                          else
                          {
                                        editStored[j] =valArr[curr_row_ind];
                                        editDispvalue[j] =dispValArr[curr_row_ind] ;
                          }

                       }
                       else
                       {
                                        editStored[j] =valArr[curr_row_ind];
                                        editDispvalue[j] =dispValArr[curr_row_ind] ;
                       }
          }

    
  }




function formLink(value, metaData, record, rowIndex, colIndex, store)
         {
          
         var mulname=store.storeId.substr(0,3);
          var mulind=indexFromMulti[mulname];
          var gridname= mulname+'_grid';
          var grid= Ext.getCmp(gridname);
           var colname = grid.getColumnModel().getDataIndex(colIndex);
           var field=eval('F.'+colname );
           var disseq;
           var rec = grid.getStore().getAt(rowIndex);
           var selIndex=rec.get('sequence');
           var thisrowis=((pageno[mulind]-1 )*rowsperpage[mulind])-1+1 +1 + selIndex;
           var dispToValue=value;
           var convValue=value+'';
            var requiredFlg=0;
         var coltype='string';

          var icon='';
          
          var colwidth=5;

          if(colname !='sequence')
          {
            var disseq=getSeq(field.getSequence(),thisrowis);
            if(colIndex!=0)
            {
              colwidth=regionfieldsize[mulind][colIndex-1];
              coltype=regionfieldtype[mulind][colIndex-1];
              if(coltype.indexOf('date')!=-1)
              {
                 if(value ==null)
                 {
                   convValue='';
                 }
                 else
                 {
                     var dt = new Date(value);
                     dispToValue = dt.format('m/d/Y');
                 }
              }

               if(coltype.indexOf('float')!=-1 && convValue!='')
               {    
                    //console.log('dispToValue:'+dispToValue+' thisrowis:'+thisrowis+' coltype:'+coltype);
                    dispToValue = getFormattedNumber(dispToValue,thisrowis,coltype)  ; 
                    //console.log('After dispToValue:'+dispToValue+' thisrowis:'+thisrowis+' coltype:'+coltype);
                   //console.log('dispToValue:'+dispToValue+' thisrowis:'+thisrowis+' coltype:'+coltype);
                }
                if(coltype.indexOf('*')!=-1 && convValue!='' && dispToValue!='')
                {
                    dispToValue = getPerfSuffFormat(dispToValue,thisrowis,coltype)  ;
                }
            }
            var hashind=-1;

             
              /*if( value==0 && field.read(thisrowis)=='')
              {
                dispToValue='';
              }*/
               var rowSeq = getRowSeq(disseq);
               var colSeq = getColSeq(disseq);
               if(requiredArr[colSeq-1])
               {
                  requiredFlg =1;
               }
               if(gridRequiredArr[rowSeq]!=null && gridRequiredArr[rowSeq][colSeq]!=null) 
               {
                  requiredFlg =  gridRequiredArr[rowSeq][colSeq];
               }
             
              if(gridHiddenArr[disseq-1]==1)
              {
                  hashind=0;
              }

            
            if(colIndex!=0 && regionfieldtype[mulind][colIndex-1].indexOf('#')!=-1)
            {
             hashind=0;
            }
       
         if(F.getFormParameter("edit_flag")!='Y' && !readOnlyScreen)
         {
            if(hashind==-1)
            {
               if( convValue=='' && (field.getColumnKind()==2 ||field.getColumnKind()==3 || field.getColumnKind()==5 || field.getColumnKind()==9))
               {
                 dispToValue='$select'+' '+field.getLabel();
               }
               else if(convValue=='')
               {
                 dispToValue='$enter'+' '+field.getLabel();
               }
               
            }
          
           

          /* var color ;*/
           if(colname !='sequence' &&  hashind!=-1  )
           {
              metaData.attr = 'ext:qtip="' + dispToValue + '"'+ ' style="background-color:#D7E4F3;"';
              
              
           }
           else
           {
             metaData.attr = 'ext:qtip="' + dispToValue + '"';
        if(field.getColumnKind()==2|| field.getColumnKind()==5)
               {
                 metaData.css += ' lsmLovgrey';
               }
               else if(field.getColumnKind()==9)
               {
                  metaData.css += ' lsmCalendargrey';
               }
               /*else if(field.getColumnKind()==1)
               {
                  metaData.css += ' lsmTextgrey';
               }*/
               else if(field.getColumnKind()==3)
               {
                  metaData.css += ' lsmDropgrey';
               }
           }
            
            if( convValue=='')
            {
              metaData.css += ' lsmTextEmpty';
            }
            if(dispToValue!="" && F.getFormParameter("edit_flag")!='Y' && !readOnlyScreen && field.getColumnKind()!=1 && field.getColumnKind()!=11 &&  hashind==-1)
            {
               var mywidth= grid.getColumnModel().getColumnWidth(colIndex);
                 mywidth=mywidth-25;
              dispToValue='<div title="'+dispToValue+'"style="display: block; float: left; width: '+mywidth+'px; overflow:hidden;">'+dispToValue+'</div>';
            }
            



           return dispToValue;
        }
        else
        {
           var viewValue=''
           if(convValue=='')
           {
              viewValue=convValue;
           }
           else
           {
             viewValue=dispToValue;
           } 
            var color = '#D8D8D8';
       if(rowIndex%2==1)
       {
               metaData.attr = 'ext:qtip="' + dispToValue+ '"'+ 'style="background-color:'+ color +';"';
       }
           else{
               metaData.attr = 'ext:qtip="' + dispToValue+ '"';
            }
            return dispToValue;
        }  
       }     
    }


function formLinkView(value, metaData, record, rowIndex, colIndex, store)
         {
            var color='#D7E4F3';
            var whitecolor='#ffffff';
            var displayval='';
             if(value )
             {
                 displayval = value ;
             }
      if(rowIndex%2==1)
      {
             metaData.attr = 'ext:qtip="' + displayval + '"'+ 'style="background-color:'+ color +';"';
       }
           else{
              metaData.attr = 'ext:qtip="' + displayval + '"'+ 'style="background-color:'+ whitecolor +';"';

            }

              return value;
          }

function formLinkBold(value, metaData, record, rowIndex, colIndex, store)
         {

            var color ='#D7E4F3';
      if(rowIndex%2==1)
      {
             metaData.attr = 'ext:qtip="' + value + '"'+ 'style="background-color:'+ color +'; font-weight: bold;"';
       }
           else{
           metaData.attr = 'ext:qtip="' + value + '"'+ 'style="font-weight: bold;"';
            }
              

              return value;
          }

function callGrid()
{

  var tempreg=currentRegion;
  var temprow=currentRow;
   if(addrecflg==0)
   {
   initializeGrid();
   }
   
   populateGridLabelArr();
   gridFormation();


   addrecflg=1;
   addrowFlg=1;
   Ext.getBody().unmask();
  currentRegion =tempreg;
 currentRow =temprow;
} 

function populateGridLabelArr()
{
   for(ppGLA=0;ppGLA<regions_to_render.length;ppGLA++)
    {

    gridLabelOrig[ppGLA]=new Array();
    gridLabelAppd[ppGLA]=new Array();

    indexFromMulti[regions_to_render[ppGLA].name]=ppGLA;
    multiFromId[regions_to_render[ppGLA].id]=regions_to_render[ppGLA];
    for (ppGLAFlds=0;ppGLAFlds<regionfields[ppGLA].length;ppGLAFlds++)
    {
     gridLabelOrig[ppGLA][ppGLAFlds]= labelArr[regionfields[ppGLA][ppGLAFlds].getSequence()-1] ;
     gridLabelAppd[ppGLA][ppGLAFlds]= gridNames[ppGLA] + ':' + labelArr[regionfields[ppGLA][ppGLAFlds].getSequence()-1];
    }
   }

}
function initializeGrid()
{

if(Ext.ux.grid.GridFilters){
    Ext.apply(Ext.ux.grid.GridFilters.prototype, {
    menuFilterText: '$Filters'
 });
}

Ext.data.Types.FLOAT = {
    convert : function(v) {
        var n = parseFloat(String(v).replace(Ext.data.Types.stripRe, ''), 10);
        return isNaN(n) ? v : n;
    },
    sortType: Ext.data.SortTypes.none,
    type: 'float'
};

if(Ext.grid.GridView){
  Ext.apply(Ext.grid.GridView.prototype, {
    sortAscText  : "$SortAscending",
    sortDescText : "$SortDescending",
    columnsText  : "$Columns"  });
}

if(Ext.grid.GroupingView){
  Ext.apply(Ext.grid.GroupingView.prototype, {
    emptyGroupText : '$(None)',
    groupByText    : '$GroupByThisField',
    showGroupsText : '$ShowinGroups'
  });
}



Ext.override(Ext.grid.GroupingView, {
    beforeMenuShow : function(){
        var field = this.getGroupField();
        var g = this.hmenu.items.get('groupBy');
        if(g){
            g.setDisabled(this.cm.config[this.hdCtxIndex].groupable === false);
        }
        var s = this.hmenu.items.get('showGroups');
        if(s){
            s.setDisabled(!field && this.cm.config[this.hdCtxIndex].groupable === false);
            s.setChecked(!!field, true);
        }
    }
});


for(prefcnt=0; prefcnt<prefixsuffix.length; prefcnt++)
{


if(multiArr[prefixsuffix[prefcnt].getSequence()-1])
{
  gridColumnChangeInjection(prefixsuffix[prefcnt])
}

}

if(summaryFields && summaryFields.length>0)
{
   var myhalf = (summaryFields.length - (summaryFields.length%summaryLines))/summaryLines;
    if(summaryFields.length%summaryLines !=0)
    {
       myhalf = myhalf+1;
    }
   var summCols=new Array();
   var fieldsfloat = new Array();
   var summarycnt=0;
   var datafloat=new Array();
       for(flocol=0; flocol< myhalf; flocol ++ )
       {
             
              var col1=(flocol*2)+0;
    summCols[col1] = { header: 'floatingcol'+col1 , readOnly: false , width: 150, sortable: false ,groupable:false, hideable: false ,dataIndex: 'floatingcol'+col1 ,renderer : formLinkBold };
              fieldsfloat[col1]={name: 'floatingcol'+col1, mapping : 'floatingcol'+col1};
              

              var  col2 = (flocol*2)+1;
             summCols [col2] =   { header: 'floatingcol'+col2 , readOnly: false , width: 90, sortable: false ,groupable:false, hideable: false ,dataIndex: 'floatingcol'+col2  ,renderer :formLinkView} ;
             fieldsfloat[col2]={ name: 'floatingcol'+col2, mapping : 'floatingcol'+col2};
            for(sumlines=0; sumlines< summaryLines && summarycnt < summaryFields.length ; sumlines++)
            {
             if(!datafloat[sumlines])
             {
               datafloat[sumlines]=new Array();
             }
             datafloat[sumlines]['floatingcol'+col1]  = summaryFields[summarycnt].getLabel() ;
             datafloat[sumlines]['floatingcol'+col2] = getFieldDisplayValue(summaryFields[summarycnt],1) ;
             summarycnt=summarycnt+1;
            }
        }
             var cmfloating = new Ext.grid.ColumnModel({
    defaults: {
          menuDisabled: true,
          defaultSortable:true 
        },
          columns: summCols
               });


     /*datafloat=[{"level":"Org","Inherent":"low","Residual":"low","AssessType":"1"},
          {"level":"Process","Inherent":"Medium","Residual":"High","AssessType":"3"},
          {"level":"Risk","Inherent":"High","Residual":"Medium","AssessType":"4"}
        ];*/

     storefloat = new Ext.data.JsonStore({
      fields : fieldsfloat,
      data   : datafloat
    });

     floatingGrid = new Ext.grid.EditorGridPanel({  
          id:'floatingGrid',
          store: storefloat,
          stripeRows: true,
          renderTo:(browserType == "gecko" || Ext.isIE10)?'floatingGriddivot':'floatingGriddiv',
          layout:'fit',
          split: true,
          hidden:true,
                                   hideHeaders: true,
          columnLines : true,
          trackMouseOver:true,
          bodyStyle  : 'padding: 3px; background-color: #Fb731a',
          width:'auto',
          autoHeight:true,
          cm:cmfloating,
          viewConfig : {
            forceFit: false
          }
          
     });
    
    /*openfloatingBar=new Ext.Button({
    renderTo: (browserType == "gecko")?'centerboxot':'centerbox',
    hidden:true,
    tooltip:'Expand the Summary Grid',
    iconCls:'expandFloating',
              handler: function(){
        floatingGrid.show();
        openfloatingBar.hide();
                        }
    });*/

     turnon=new Ext.Button({
        renderTo: (browserType == "gecko" || Ext.isIE10)?'turnfuncot':'turnfunc',
    iconCls:'turnon',
    hidden:true,
        handler: function(){
        floatingGrid.show();
             turnoff.show();
                            turnon.hide();
        }
    });
     turnoff=new Ext.Button({
        renderTo: (browserType == "gecko" || Ext.isIE10)?'turnfuncot':'turnfunc',
    iconCls:'turnoff',
    hidden:true,
        handler: function(){
      floatingGrid.hide();
      turnon.show();
      turnoff.hide();
        }
    }); 

    storefloat.loadData(datafloat);
    floatingGrid.getView().refresh();
      turnon.show();
 }


}

function gridFormation()
{

     
    for(gridIdx=0;gridIdx<regions_to_render.length;gridIdx++)
    {
       regions_to_render[gridIdx].hide();
      if( (!createOnLoad || createOnLoad[gridIdx]==1 ) && !Ext.getCmp(regions_to_render[gridIdx].name+'_grid') )
      {
         var pmulti=regions_to_render[gridIdx];

    
        if(rowsperpage.length==0 || rowsperpage[gridIdx]==null || rowsperpage[gridIdx]=='' )
        {
          rowsperpage[gridIdx] = defaultperpage;
        }
        if(selectLabel.length==0 || selectLabel[gridIdx]==null || selectLabel[gridIdx]=='' )
        {
          selectLabel[gridIdx] = defSelectLabel;
        }
        if(selectToolTip.length==0 || selectToolTip[gridIdx]==null || selectToolTip[gridIdx]=='' )
        {
        selectToolTip[gridIdx] = defSelectToolTip;
        }
        if(deleteLabel.length==0 || deleteLabel[gridIdx]==null || deleteLabel[gridIdx]=='' )
        {
          deleteLabel[gridIdx] = defDeleteLabel;
        }
        if(deleteToolTip.length==0 || deleteToolTip[gridIdx]==null || deleteToolTip[gridIdx]=='' )
        {
          deleteToolTip[gridIdx] = defDeleteToolTip;
        }
        if(addItemLabel.length==0 || addItemLabel[gridIdx]==null || addItemLabel[gridIdx]=='' )
        {
          addItemLabel[gridIdx] = defAddItemLabel;
        }
        if(addItemToolTip.length==0 || addItemToolTip[gridIdx]==null || addItemToolTip[gridIdx]=='' )
        {
          addItemToolTip[gridIdx] = defAddItemToolTip;
        }
        if(copyLabel.length==0 || copyLabel[gridIdx]==null || copyLabel[gridIdx]=='' )
        {
          copyLabel[gridIdx] = defCopyLabel;
        }
        if(copyToolTip.length==0 || copyToolTip[gridIdx]==null || copyToolTip[gridIdx]=='' )
        {
          copyToolTip[gridIdx] = defCopyToolTip;
        }
       if(verticalViewLabel.length==0 || verticalViewLabel[gridIdx]==null || verticalViewLabel[gridIdx]=='' )
       {
          verticalViewLabel[gridIdx] = defVerticalViewLabel;
       }
       if(verticalViewToolTip.length==0 || verticalViewToolTip[gridIdx]==null || verticalViewToolTip[gridIdx]=='' )
       {
          verticalViewToolTip[gridIdx] = defVerticalViewToolTip;
       }
       if(clearFiltersLabel.length==0 || clearFiltersLabel[gridIdx]==null || clearFiltersLabel[gridIdx]=='' )
       {
          clearFiltersLabel[gridIdx] = defClearFiltersLabel;
       }
       if(clearFiltersToolTip.length==0 || clearFiltersToolTip[gridIdx]==null || clearFiltersToolTip[gridIdx]=='' )
       {
          clearFiltersToolTip[gridIdx] = defClearFiltersToolTip;
       }
       if(printLabel.length==0 || printLabel[gridIdx]==null || printLabel[gridIdx]=='' )
       {
          printLabel[gridIdx] = defPrintLabel;
       }
       if(printToolTip.length==0 || printToolTip[gridIdx]==null || printToolTip[gridIdx]=='' )
       {
          printToolTip[gridIdx] = defPrintToolTip;
       }
       createGrid(gridIdx);
    }
  }
  callBackAfterGrid();
}

function recreateGrid()
{
  createGrid(currentRegionIndex);
}
function createGrid(gridIndex)
{


  document.getElementById("MSAI_TD_"+regions_to_render[gridIndex].name+"_GRID_1").innerHTML="";  
  var myregfields=regionfields[gridIndex];
  var myregfieldtype=regionfieldtype[gridIndex];
  var myregfieldsize=regionfieldsize[gridIndex];
  currentRegion=regions_to_render[gridIndex].name;


  gridfields[gridIndex]=new Array();
  gridcolmod[gridIndex]=new Array();
  gridfilters[gridIndex]=new Array();

  gridfieldsName[gridIndex] = new Array();

  gridfields[gridIndex][0]={ name: 'check_'+regions_to_render[gridIndex].name , type:'float' , useNull: true  };
  gridfieldsName[gridIndex][0] = 'check_'+regions_to_render[gridIndex].name;
  
   var readerList = new Array();
  var readNode ;  

  gridcolmod[gridIndex][0]={ header: selectLabel[gridIndex] ,tooltip:  selectToolTip[gridIndex] , readOnly: false , width: 55, sortable: false ,groupable:false, hideable: false ,dataIndex: 'check_'+regions_to_render[gridIndex].name , renderer : function (value, metaData, record, rowIndex, colIndex, store){

            /*var color ;
      color = '#D8D8D8';
      if(rowIndex%2==1)
      {
             metaData.attr = 'style="background-color:'+ color +';"';

       }*/
               
              var delvalue;
              
              if(value < 0 )
              {
                 delvalue = value *-1;
              }
              else
              {
                 delvalue = value ;
              }

              var newInd=(delvalue-(delvalue%1000))/1000;
              var newval=delvalue%1000;
              
              
              var myMulInd=newval+1;
              
               var pencil='';
              
              var delreg = regions_to_render[newInd-1].name;
              if(regions_pkey.length>0)
              {
                  var indr=newval-1+2;
                 var pkey_value=regions_pkey[newInd-1].read(indr);
                   var color  = '#FFFF99';
                   //pencil=indr + pkey_value;
      if(pkey_value=='NONE' || pkey_value=='NONE1')
      {
                       metaData.attr = 'style="background-color:'+ color +';"';
       }
              }
              if(value >0)
              {
                return pencil+'<input type="checkbox" onClick="addRecord('+newval+',this.id)" value="'+newval+'" id="'+  'check_'+myMulInd+delreg+'"/>';
              }
              else
              {
                 return pencil+'<SPAN id=check_'+myMulInd+delreg+ ' class="deletebutton" tabIndex=0 onclick="undoDeleteRecord(this.id)" aside_onclick="undoDeleteRecord(this.id)">$Undo </SPAN>';
               }
          }};
             
   readNode = {name: 'check_'+regions_to_render[gridIndex].name ,type: 'float'  };
   readerList.push(readNode);

  for (j=0;j<myregfields.length;j++)
  {
     var colhidden;
     var colhide;
     if(myregfieldtype[j].indexOf('$') !=-1)
     {
          colhidden=true;
          colhide=false;
     }
     else
     {
          colhidden=false;
          colhide=true;
     }

   // $ to hide , * to prefix or suffix, # for readonly

    var requiredString='';
    if(requiredArr[myregfields[j].getSequence()-1])
    {
        requiredString='*';
    }
        var spanstart='';
         var spanend='';
         if(requiredString !='')
         {
			 //Commmneted by sanketh
           // spanstart='<span><font size="2" color="red" class="mandatory">*</font>';
           // spanend=' </span>';
		   //commented by sanketh
         }


    var actualtype = myregfieldtype[j].replace('$','')
     actualtype =actualtype.replace('#','');
    var presufindex= actualtype.indexOf('*');
    if(presufindex!=-1)
    {
      if(presufindex==0)
      {
         actualtype = actualtype.substr(2);
      }
      else
      {
         actualtype = actualtype.substr(0,actualtype.length-2);
      }
    }
    
    gridfields[gridIndex][j+1] = { name: myregfields[j].getName() , type: actualtype  , useNull: true};
    gridfieldsName[gridIndex][j+1]= myregfields[j].getName() ;

    var gridEditorOpen;
    if(myregfieldtype[j].indexOf('#') ==-1 /*&& myregfields[j].getColumnKind()!=11*/)
    {
          /*if(myregfields[j].getColumnKind()==2  || myregfields[j].getColumnKind()==5 )
         {
            gridEditorOpen= Trigger1;
            gridColumnChangeInjection(myregfields[j]);
         }
         else*/ if(myregfields[j].getColumnKind()==3 )
         {
            gridEditorOpen= new Ext.form.ComboBox({
                                          store: new Ext.data.SimpleStore({
                                                 id: myregfields[j].name+'_st',
                                                 fields: ['stored', 'display'],
                                                 data : [
                                                            ['', '']
                                                       ]
                                                 }),

                                                                           displayField:'display',
                                                                           valueField: 'stored',
                                                                           mode: 'local',
                                                                           typeAhead: false,
                                                                           triggerAction: 'all',
                                                                           lazyRender: true,
                                                                           emptyText: 'Select One',
                                                                           editable: false

        });

        

            gridColumnChangeInjection(myregfields[j]);
         }
         else if(myregfields[j].getColumnKind()==9)
         {
            
              gridEditorOpen= new Ext.form.DateField({
            id:'id3'+myregfields[j].name+regions_to_render[gridIndex].name,
            triggerClass:'x-form-date-trigger',
                                          onTriggerClick: function() {
                                                            var pmt=this;
                                                           Ext.form.DateField.prototype.onTriggerClick.apply(this, arguments);                                                            
                                                           },
                                           listeners: {
                                                            // required for the first render event
                                                            afterrender: function(combo) 
                                                            {
                                                               combo.onTriggerClick();
                                                            },
                                                            // required after render during activating an other combo in the column
                                                            show: function(combo) 
                                                            {
                                                            combo.onTriggerClick();
                                                            },
                                                            select:function(combo) 
                                                            {
                                                            combo.triggerBlur();
                                                            }
                                                      },

            editable: true,
                                          invalidText: jsAlertMessages["date_error"]+myregfields[j].getLabel(),
            emptyText:''
        });

           /* gridEditorOpen= new Ext.form.TriggerField({
            id:'id3'+myregfields[j].name+regions_to_render[gridIndex].name,
            triggerClass:'x-form-date-trigger',
            editable: true,
            emptyText:''
        });*/

            gridColumnChangeInjection(myregfields[j]);
         }
         else if(myregfields[j].getColumnKind()==2 || myregfields[j].getColumnKind()==5  )
         {
             
              gridEditorOpen=  new Ext.form.TriggerField({
            id:'id3'+myregfields[j].name+regions_to_render[gridIndex].name,
            triggerClass:'x-form-search-trigger',
            editable: false,
            emptyText:'Select One'
        });

            gridColumnChangeInjection(myregfields[j]);
         }
         else if(myregfields[j].getColumnKind()==11)
         {
              gridEditorOpen = CommentTrigger1;
             gridColumnChangeInjection(myregfields[j]);
         }
         else if(actualtype=='float')
         {
            //alert('float');
             gridEditorOpen= new Ext.form.NumberField({allowBlank: true ,decimalPrecision:2,maxLength : lenArr[myregfields[j].getSequence()-1],maxLengthText:jsAlertMessages["max_length_exceeded"],
             
             validator:function(val){
                var ct = 0;
                // console.log("call : ",val," counter: ",ct++)
                //var maxLen = this.maxLength;
                var maxLen = 19;
                var max_whole_len=15;
                var max_dec_len=3;

                var dec_place;
                dec_place=val.indexOf('.');

                dec_place=dec_place<0?val.length:dec_place;

                var whole_num=val.substr(0,dec_place);
                var dec_num=val.substr(dec_place+1,val.length);


                if(whole_num.length>max_whole_len){
                  var newVal = Ext.util.Format.substr(val,0,max_whole_len);
                  this.setValue(newVal);
                  return alert("You have exceeded the maximum number of digits allowed for whole number. The amount will be truncated to "+max_whole_len+" characters.");
                }

                if(dec_num.length>3){
                  var newVal = Ext.util.Format.substr(val,0,whole_num.length+dec_num.length);
                  this.setValue(newVal);
                  return alert("Maximum number of digits allowed after decimal point is "+max_dec_len+ ". The amount will be truncated to "+(whole_num.length+max_dec_len+1)+" characters.");
                }

                /*if(whole_num.length>max_whole_len){
                  var newVal = Ext.util.Format.substr(val,0,max_whole_len);
                  this.setValue(newVal);
                  return alert("You have exceeded the maximum number of digits allowed. The amount will be truncated to "+max_whole_len+" characters.");
                }else if(dec_num.length>3){
                  var newVal = Ext.util.Format.substr(val,0,whole_num.length+4);
                  this.setValue(newVal);
                  return alert("You have exceeded the maximum number of digits allowed. The amount will be truncated to "+max_whole_len+" characters.");
                }*/

             }});

             gridColumnChangeInjection(myregfields[j]);
         }
         else if(actualtype=='date')
         {
             gridEditorOpen= new Ext.form.DateField({allowBlank: true});
             gridColumnChangeInjection(myregfields[j]);
         }
         else
         {
             gridEditorOpen= new Ext.form.TextField({allowBlank: true ,maxLength : lenArr[myregfields[j].getSequence()-1],maxLengthText:jsAlertMessages["max_length_exceeded"],

             validator:function(val){
                var ct = 0;
                // console.log("call : ",val," counter: ",ct++)
                var maxLen = this.maxLength;
                  if(val.length > maxLen){
                   var newVal = Ext.util.Format.substr(val,0,maxLen);
                   this.setValue(newVal);
                   //You have exceeded the maximum number of characters allowed. The text will be truncated to 500 characters. 
                   return alert("You have exceeded the maximum number of characters allowed. The text will be truncated to "+maxLen+" characters.");
                }       
             }});

             gridColumnChangeInjection(myregfields[j]);
         }
         
         gridcolmod[gridIndex][j+1] =  { itemId: myregfields[j].id , header:  spanstart + labelArr[myregfields[j].getSequence()-1]+spanend, /*readOnly: true  ,*/ width: myregfieldsize[j],  tooltip: labelArr[myregfields[j].getSequence()-1]+requiredString, 
                                    sortable: true , dataIndex: myregfields[j].getName() , /*align:"right" ,*/ renderer : formLink,hidden:colhidden,hideable: colhide,editor: gridEditorOpen,sortType:sortVals
                                    };
         if(actualtype=='float')
         {
           gridcolmod[gridIndex][j+1]['align'] = "right";
         }
    }  
   else
   {
       gridcolmod[gridIndex][j+1] =  {  itemId: myregfields[j].id, header:  spanstart + labelArr[myregfields[j].getSequence()-1]+spanend , /*readOnly: true  ,*/ width: myregfieldsize[j],  tooltip: labelArr[myregfields[j].getSequence()-1]+requiredString, 
                                    sortable: true , dataIndex: myregfields[j].getName() ,/* align:"right" ,*/  renderer : formLink,hidden:colhidden,hideable: colhide,sortType:sortVals
                                    }; 
      gridColumnChangeInjection(myregfields[j]);
   }  
           
            gridColumnHideInjection(myregfields[j]);
            gridColumnShowInjection(myregfields[j]);

    readNode = {name: myregfields[j].getName(),type: actualtype , useNull: true };
    readerList.push(readNode);

    gridfilters[gridIndex][j] =  { dataIndex: myregfields[j].getName() , type:actualtype , useNull: true  };
     
             
  }
  
 
  gridfields[gridIndex][myregfields.length+1]={ name: 'sequence' , type:'float' , useNull: true};
  gridfieldsName[gridIndex][myregfields.length+1]='sequence';
  gridcolmod[gridIndex][myregfields.length+1]={ header: '' , readOnly: true , width: 60, sortable: true , dataIndex: 'sequence' , hidden:true,hideable: false, renderer : formLink };

   readNode = {name: 'sequence' ,type: 'float', useNull: true  };
   readerList.push(readNode); 


 
  reader = new Ext.data.ArrayReader({}, readerList );
  /*if(addrecflg==0)
    {*/
    GridRecarr[gridIndex]=new Array();
    GridRecarrDisp[gridIndex]=new Array();
   /*}*/
      
 
     col_filters[gridIndex] = new Ext.ux.grid.GridFilters(
   {
      encode : false, 
      local : true,
      filters : gridfilters[gridIndex]
   }
   );

  
 callPanel(gridIndex);
 if(createOnLoad)
 {
   callBackAfterGrid();
  }  
 
  
}


function callPanel(gridIndex)
{
  
 
   memoryProxy[gridIndex] = new Ext.data.DirectProxy(GridRecarrDisp[gridIndex]);
   
 
      gridDataStore[gridIndex]= new Ext.data.GroupingStore({
      storeId:regions_to_render[gridIndex].name+'_grid',
     data: GridRecarrDisp[gridIndex],
     proxy : memoryProxy[gridIndex],
     groupOnSort: false,
     groupField: gridfieldsName[gridIndex][1],
     sortInfo: {field: gridfieldsName[gridIndex][1] , direction: 'ASC'},
      reader : reader /*new Ext.data.ArrayReader(
   {
      id : gridfieldsName[gridIndex][1]
   }   , gridfieldsName[gridIndex] )*/
          


    });
  
 
   gridColumnModel[gridIndex]  = new Ext.grid.ColumnModel (gridcolmod[gridIndex]);
  
     createPanel(gridIndex);

     gridRender(gridIndex,regions_to_render[gridIndex]);


  var myregpoint=gridIndex;
  if(regions_to_render[myregpoint].getRowCount()>0)
  {
    currentRegion=regions_to_render[myregpoint].name;
      
       if(!pageno[myregpoint] || pageno[myregpoint]==null )
       {
          pageno[myregpoint]= 1;
       }
        goGridPage(pageno[myregpoint],regions_to_render[myregpoint],myregpoint);
  }
  gridRender(myregpoint,regions_to_render[myregpoint]);

}

function createPanel(gridIndex)
{   

var myplugins;
if(F.getFormParameter("edit_flag")!='Y' && !readOnlyScreen)
{
   myplugins=  [col_filters[gridIndex]/*,{ptype: 'editable-grid'}*/]  ;            
}
else
{
  myplugins=  [col_filters[gridIndex] ];
}
myGrid[gridIndex] = new Ext.grid.EditorGridPanel({
id: regions_to_render[gridIndex].name+"_grid",
plugins : myplugins,
    enableColumnHide:false,
    enableDragDrop:false,
              enableColumnMove:false, 
store: gridDataStore[gridIndex],
cm: gridColumnModel[gridIndex] ,
sm:new Ext.grid.RowSelectionModel({singleSelect: true}),
clicksToEdit: 1,
tbar: { xtype: "toolbar", items:[{
            text:addItemLabel[gridIndex],
            id: regions_to_render[gridIndex].name+'_add',
            tooltip:addItemToolTip[gridIndex],
            iconCls: 'silk-add',
            mulIndex:gridIndex,
            multiname: regions_to_render[gridIndex].name,
            handler : function()
                      {
                         var Multi= eval("F."+this.multiname);
                           flgcheckRegion=Multi.name;
                           flgcheckRow=-1;
                           inlineflag=1;
                            var idx=this.mulIndex;
                           if(getSavedFlg()==1)
                           {
                            
                              if(gridOnAdd(Multi))
                              {
                                scrollState = null;
                                savedFlg=0;
                                var myreg =Multi.name;
                               
                                var remin=Multi.getRowCount() % rowsperpage[idx];
                                if(remin==0)
                                {
                                        remin=rowsperpage[idx];
                                }
                               
                                addrowFlg=0;
                                currentRegion=Multi.name;
                                currentRow=Multi.getRowCount()+1;

                                var rem=currentRow%rowsperpage[idx];
                                if(rem==0)
                                {
                                  rem =rowsperpage[idx]
                                }
                                var totpag=(currentRow -rem)/rowsperpage[idx];
                                GridRecarr[idx]=new Array();
                                GridRecarrDisp[idx]=new Array();
                                pageno[idx]=totpag -1+1+1;
                               /* on add goes to next page */ 
                                goGridPage(pageno[idx],Multi,idx);

                                Multi.addRow(true,true);
                                //goDirect(Multi.id,currentRow);
                                callAddSupport(Multi);
                                 savedFlg=1;
                                GridRecarr[idx]=new Array();
                                GridRecarrDisp[idx]=new Array();
             goGridPage(pageno[idx],Multi,idx);
          /* on add goes to next page */

                                gridRender(idx,Multi);
                                inlineflag=1;
                                inlinerec=currentRow;
                                inlinereg=currentRegion;
                            }
                         }
                         else
                         {
                            gridSelList[idx]=new Array();
                         } 
                      }

        }, '-', {
            text:deleteLabel[gridIndex],
            id: regions_to_render[gridIndex].name+'_delete',
            tooltip:deleteToolTip[gridIndex],
            iconCls:'silk-delete',
            mulIndex:gridIndex,
            multiname: regions_to_render[gridIndex].name,
            handler : function()
                      {
                          var Multi= eval("F."+this.multiname);
                          if(F.getFormParameter("edit_flag")!='Y' && !readOnlyScreen)
                          {
                              var idx=this.mulIndex;
          
                              currentRegion=Multi.name;
                              var myreg=Multi.name;
        
 
                              readSelectedGridList(idx,Multi);

                              if(gridSelList[idx].length!=null&&gridSelList[idx].length!=0)
                              {
             scrollState = null;
            for(k=0;k<gridSelList[idx].length;k++)
            {
                             
                                  var rowcalc=gridSelList[idx][k];
                                  //goDirect(Multi.id,rowcalc);
                               
              document.getElementById("mrrowdb"+rowcalc+"id"+Multi.id).checked=true;
              Multi.markRowForDelete(rowcalc,this);
                                  Multi.isMarkedForDeletion(rowcalc);
                                  gridAferDelete(idx,Multi);
        
                           
            }
                            
            gridSelList[idx]=new Array();             
                                GridRecarr[idx]=new Array();
                                GridRecarrDisp[idx]=new Array();
                                    
                                goGridPage(pageno[idx],Multi,idx);
                                gridRender(idx,Multi);
                             }
                             else
                             {
                                alert("$entry_to_delete");

                             }
                          }
                      }
         }, '-', {
            text:copyLabel[gridIndex],
            id: regions_to_render[gridIndex].name+'_copy',
            tooltip:copyToolTip[gridIndex],
            iconCls:'silk-copy',
            mulIndex:gridIndex,
            multiname: regions_to_render[gridIndex].name,
            handler : function()
                      {
                             var Multi= eval("F."+this.multiname);

                           flgcheckRegion=Multi.name;
                           flgcheckRow=Multi.getRowCount()+1;
                            var idx=this.mulIndex;
                       if(getSavedFlg()==1)
                          {
                            inlineflag=0;
                           
         
                              currentRegion=Multi.name;
                              var myreg=Multi.name;
        
                           readSelectedGridList(idx,Multi);

                           if(gridSelList[idx].length!=null&&gridSelList[idx].length!=0)
                           {
          if(gridSelList[idx].length == 1)
          {   
                                var rowcalc =  gridSelList[idx][0];
                               if(gridOnAdd(Multi))
                               {
                                     scrollState = null;
                                    var remin=Multi.getRowCount() % rowsperpage[idx];
                                     if(remin==0)
                                     {
                                        remin=rowsperpage[idx];
                                     }
                                     
            currentRow=Multi.getRowCount()+1;
            var rem=currentRow%rowsperpage[idx];
                                     if(rem==0)
                                     {
                                         rem=rowsperpage[idx];
                                     }
                                     var totpag=(currentRow -rem)/rowsperpage[idx];
                                     pageno[idx]=totpag -1+1+1;
                                     GridRecarr[idx]=new Array();
                                     GridRecarrDisp[idx]=new Array();
                                     pageno[idx]=totpag -1+1+1;
                                     goGridPage(pageno[idx],Multi,idx);

                                     Multi.addRow(false,false);
                                     
                                  
                                    for(cpind=0; cpind < regionfields[idx].length; cpind++)
                                    {
                                        var dispvalue=getGridDisplayValue(regionfields[idx][cpind],rowcalc);
                                        var stored=regionfields[idx][cpind].read(rowcalc);
                                                                         
                                       if(regionfields[idx][cpind].getColumnKind()==3)
                                       {
                                        
                                           regionfields[idx][cpind].enable(currentRow);
                                           /*var opts=regionfields[idx][cpind].getReference(currentRow).options; 
                                           opts.length=0;*/
                                           var copied_row_ind =gridFieldSequence(regionfields[idx][cpind],rowcalc)-1 ;
                                           var curr_row_ind =gridFieldSequence(regionfields[idx][cpind],currentRow)-1 ;
                                           if(values2dArr[copied_row_ind]!=null)
                                           values2dArr[curr_row_ind]=values2dArr[copied_row_ind];
                                           if(text2dArr[copied_row_ind]!=null)
                                           text2dArr[curr_row_ind]=text2dArr[copied_row_ind];
                                           valArr[curr_row_ind]=stored ;
                                           dispValArr[curr_row_ind]=dispvalue  ;
                                           htmValArr[curr_row_ind]=htmValArr[copied_row_ind];
                                           
            if(text2dArr[curr_row_ind])
            {
                 write_picklist(curr_row_ind+1,values2dArr[curr_row_ind],text2dArr[curr_row_ind],text2dArr[curr_row_ind].length);
            }
                                        regionfields[idx][cpind].writeValue( stored , dispvalue ,currentRow);
                                       } 
                                       else
                                       {     
                                           regionfields[idx][cpind].writeValue( stored , dispvalue ,currentRow);  
                                       }
                                    }

                                    //goDirect(Multi.id,currentRow);
                                   /* for(cpind=0; cpind < regionfields[idx].length; cpind++)
                                    {
                                       if(regionfields[idx][cpind].getColumnKind()==3)
                                       {
                                          regionfields[idx][cpind].writeValue( regionfields[idx][cpind].read(currentRow) , readDisplayedValueCustom(regionfields[idx][cpind], currentRow),currentRow);
                                       }
                                    }*/

                                    savedFlg=0;
                                    callEditSupport(Multi,currentRow-1);
                                    
                                    savedFlg=1;
                                

                                goGridPage(pageno[idx],Multi,idx);
                                gridSelList[idx]=new Array();
                                gridRender(idx,Multi);
                                inlineflag=1;
                                inlinerec=currentRow;
                                inlinereg=currentRegion;
                               }
                                                               
                             }
         else
                             {
                                gridSelList[idx]=new Array();
                                alert("$one_entry_to_copy");

                             }
                          }
                          else
                          {
                            
                            alert("$entry_to_copy");
                          } 
                       }
                       else
                       {
                           gridSelList[idx]=new Array();
                       } 
                  }  
         }, '-', {
            text:verticalViewLabel[gridIndex],
            id: regions_to_render[gridIndex].name+'_view',
            tooltip:verticalViewToolTip[gridIndex],
            iconCls:'silk-view',
            mulIndex:gridIndex,
            multiname: regions_to_render[gridIndex].name,
            
            handler : function()
                      {
                           var Multi= eval("F."+this.multiname)
                         flgcheckRegion=Multi.name;
                           flgcheckRow=currentRow;
                         if(getSavedFlg()==1)
                          {
                             inlineflag=1;
                             var idx=this.mulIndex;
         
                              currentRegion=Multi.name;
                              var myreg=Multi.name;
         
                             readSelectedGridList(idx,Multi);

                           if(gridSelList[idx].length!=null&&gridSelList[idx].length!=0)
                           {
                                 scrollState = null;                               
                                var verfields = new Array();
                                var vercols =  new Array();
                                  verfields [0]  = {name: 'Field' , type: 'String'} ;
                                  vercols[0]= { header: 'Field', readOnly: true , width: 100,  tooltip: 'Field', 
                                                                     sortable: true , dataIndex: 'Field' , renderer : formLinkBold,hidden:false,hideable: false };
                                  
                                  for( fld=1; fld <= gridSelList[idx].length; fld++ )
                                  {
                                    verfields [fld] =   {name: 'Value'+fld , type: 'String' };
                                    vercols[fld]= { header: getGridName()+fld , readOnly: true , width: 100,  tooltip: 'Value', 
                                                                    sortable: true , dataIndex: 'Value'+fld , renderer : formLinkView,hidden:false,hideable: false } ;
                                  }
                                    
                                  
                                  var verdata= new Array();
                                   var sin=-1;
                                  for( versin=0; versin < regionfields[idx].length ; versin++)
                                  {
                                    
                                     if(regionfieldtype[idx][versin].indexOf('$')==-1)
                                     {
                                       sin=sin+1;
                                       verdata[sin]=new Array();
                                       verdata[sin][0]= labelArr[regionfields[idx][versin].getSequence()-1];

                                         var actualtype= regionfieldtype[idx][versin].replace('$').replace('#','');
              
              var presufindex= actualtype.indexOf('*');
              var pref=-1;
              var suff=-1;
             if(presufindex!=-1)
             {
               if(presufindex==0)
               {
                pref= actualtype.substr(1,1);
               }
               else
               {
                suff= actualtype.substr(actualtype.length-1,1);
               }
             }
                                     
                                     for(par=1;par<= gridSelList[idx].length ;par++)
                                     {
                                       var rowcalc=gridSelList[idx][par-1];

                  var appendpref='';
                  var appendsuff='';
                  if (pref!=-1)
                  {
                                             appendpref= readprefSuffValue(prefixsuffix[pref],rowcalc);
                                               
                  }
                  if (suff!=-1)
                  {
                 appendsuff= readprefSuffValue(prefixsuffix[suff],rowcalc);
                   }         
              
                                       var dispvalue;
                                        var stored=regionfields[idx][versin].read(rowcalc);


                                        var tempdisp = getGridDisplayValue(regionfields[idx][versin],rowcalc);
                                         var coltype=regionfieldtype[idx][versin];
                                         if(coltype.indexOf('float')!=-1 && tempdisp!='')
                                         {

                                              tempdisp = getFormattedNumber(tempdisp-1+1,rowcalc,coltype)  ;
                                              //console.log('tempdisp:'+tempdisp); 
                                         }
                                        if(tempdisp  != '')
               {
             dispvalue =  appendpref+tempdisp+appendsuff ;

               }
               else
               {
             dispvalue  =  stored ;

               }
                                       
                                       verdata[sin][par]=  dispvalue  ;
                                     }
                                   }
                                  }

                              
                                  

                               var  verproxy = new Ext.data.MemoryProxy(verdata);
   
 
                               var verstore= new Ext.data.SimpleStore({
                                      id:currentRegion+'_viewer',
                                      fields : verfields ,
                                      data: verdata,
                                      proxy : verproxy

                                 });
  
                                  
                                 var vercolmod  = new Ext.grid.ColumnModel (vercols);

                                 var mypanel = new Ext.grid.GridPanel({
                                                   id: 'vergrid',
                                                   store: verstore,
                                                   cm: vercolmod,
                                                    height: regionfields[idx].length*50, 
                                                   width: (gridSelList[idx].length +3)*100
                                                 });
                                 
                               var w = new Ext.Window({
                                                height: regionfields[idx].length*50, 
                                                width: (gridSelList[idx].length +3)*100,
                                                 title: 'Vertical View',
                                                  items: [mypanel],
                                                 requires: 'Ext.XTemplate',
                                                  x:200,
                                                  y:100
                                                  });
                              w.show();
                              
                                gridSelList[idx]=new Array();
                                gridRender(idx,Multi);
                                 
                          }
                          else
                          {
                            
                            alert("$entry_to_view");
                          } 
                       }
                      }
           },
           {
            text   : clearFiltersLabel[gridIndex],
            id: regions_to_render[gridIndex].name+'_filter',
            tooltip : clearFiltersToolTip[gridIndex],
            iconCls:'silk-cross',
            mulIndex:gridIndex,
            multiname: regions_to_render[gridIndex].name,
            handler : function()
            {
                 var Multi= eval("F."+this.multiname)
                 flgcheckRegion=Multi.name;
                 flgcheckRow=currentRow;
               if(getSavedFlg()==1)
               {
                             var idx=this.mulIndex;
          inlineflag=0;
                              currentRegion=Multi.name;
                              var myreg=Multi.name;
                 Ext.getCmp(Multi.name+'_grid').filters.clearFilters();
               }

            }
      } /*,'->', {
            text:printLabel[gridIndex],
            id: regions_to_render[gridIndex].name+'_print',
            tooltip:printToolTip[gridIndex],
            iconCls:regions_to_render[gridIndex].name,
            mulIndex:gridIndex,
            multiname: regions_to_render[gridIndex].name,
            handler : function()
                      {
                       if(getSavedFlg()==1)
                          {
                             var idx=this.mulIndex;
          var Multi= eval("F."+this.multiname)
                              currentRegion=Multi.name;
                              var myreg=Multi.name;
                         
                          var printcols= new Array();
                            printcols=  gridcolmod[idx].slice(0);
                            printcols.splice(0,1);
                            printcols.splice(printcols.length-1,1);
                          var printfields= new Array();
                           printfields=  gridfields[idx].slice(0);
                            printfields.splice(0,1);
                            printfields.splice(printfields.length-1,1);


                           var printData = new Array();
                          for(printintd=0;printintd<Multi.getRowCount();   printintd++)
                            {  
                                
                                printData[printintd]=new Array();
                                 var rowcalc=printintd+1;
                                 for(prind=0; prind< regionfields[idx].length; prind++)
                                  {
                                        var dispvalue;
                                        var stored=regionfields[idx][prind].read(rowcalc);
                                        var tempdisp = readDisplayedValueCustom(regionfields[idx][prind],rowcalc)
                                       
                                     if( tempdisp != null && tempdisp != '' && tempdisp != '0')
            {
             dispvalue =  tempdisp ;

             }
             else
             {
             dispvalue  =  stored ;

             }
                                     printData[printintd][prind]= dispvalue;
                                     
                                  }
                          }  
                           var printColMod= new Ext.grid.ColumnModel (printcols);
                           var printMemory = new Ext.data.MemoryProxy(printData);
        var printStore=gridDataStore[gridIndex]= new Ext.data.SimpleStore({
                                                fields : printfields ,
                                                 data: printData,
                                              proxy : printMemory

                                             });             
                            

                            
                           var mypanel = new Ext.grid.GridPanel({
                                         id: 'print_grid',
                                         store: printStore,
                                          cm: printColMod ,
                                                   requires: 'Ext.XTemplate',
                                                    stylesheetPath: 'ux/grid/gridPrinterCss/print.css',
                                                                printAutomatically: true,
                                                                headerTpl: [
                                                                 '<tr>',            
                                                                  '<tpl for=".">',   
                                                                  '<th bgcolor="#D7E4F3">{header}</th>', 
                                                                  '</tpl>',          
                                                                  '</tr>'  
                                                                ],
                                                                bodyTpl: [           
                                                                 '<tr>',        
                                                           '<tpl for=".">',
                                                           '<td>\{{dataIndex}\}</td>', 
                                                           '</tpl>',
                                                           '</tr>'  
                                                                ] ,
                                                         height: 500, width: 500

                                          } );
                           var grid=mypanel ;
                           var columns = printColMod;  
                              var data = [];
                                   var convertedData = new Array();
                                   var inc_count=-1;
                              grid.store.data.each(function(item) {
                              inc_count=inc_count+1;
                                   convertedData[inc_count]=new Array();
                              for (var key in item.data) {
                                var value = item.data[key];
                                  Ext.each(columns, function(column) {
                                                
                                    convertedData[inc_count][key] =  item.data[key];                       
                                                 
                             }, grid);
                             }
 
                             data.push(convertedData);            
                             });
  
                             var headings_col = new Ext.XTemplate (grid.headerTpl, {compiled:true});   
     
                             var headings= headings_col.apply(printcols);

                             var body     = new Ext.XTemplate (grid.bodyTpl, {compiled:true}).apply(printcols);
  
                             var htmlMarkup = [                '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',                                  '<html>',
                                                              '<head>',   
                                             '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />',
                                             '<link href="' + grid.stylesheetPath + '" rel="stylesheet" type="text/css" media="screen,print" />',
                                             '<title>' + getGridName() + '</title>',
                                              '</head>',
                                             '<body>', 
                                             '<table  border="1" width="400">',
                                              headings,
                                             '<tpl for=".">', 
                                             body,
                                              '</tpl>',
                                             '</table>', 
                                             '</body>',  
                                              '</html>'
                                     ];
 
                            var html = new Ext.XTemplate (htmlMarkup, {compiled:true}).apply(convertedData); 
                            var win = window.open(new Ext.XTemplate(), 'printgrid');
                            win.document.write(html);
                             // win.print();

                     }
                      
                  }  
         }*/


 

       ]},
 bbar: [{
            text:'',
            id: regions_to_render[gridIndex].name+'_first',
            tooltip:'$FirstPage',
            iconCls : 'lsmFirstpage',
            mulIndex:gridIndex,
            multiname: regions_to_render[gridIndex].name,
            handler : function()
                      {
                        var Multi= eval("F."+this.multiname);
                         flgcheckRegion=Multi.name;
                           flgcheckRow=-1;
                         /*if(getSavedFlg()==1)
                          {*/
                             
                             var idx=this.mulIndex;
                              
          
                               if(Multi.getRowCount()>0)
                               {

                                   currentRegion=Multi.name;
                                   currentRegionIndex = idx;
                                   var myreg=Multi.name;
               readSelectedGridList(idx,Multi);

                       GridRecarr[idx]=new Array();
                                          GridRecarrDisp[idx]=new Array();
                                    pageno[idx]= 1;
                                    goGridPage(pageno[idx],Multi,idx);
                                      gridRender(idx,Multi);
                                    checkFromList(idx,Multi)
                              }
                         /* }*/


                    }
         }, '-', {
            text:'',
            id: regions_to_render[gridIndex].name+'_prev',
            tooltip:'$PreviousPage',
            iconCls:'lsmPrevpage',
            mulIndex:gridIndex,
            multiname: regions_to_render[gridIndex].name,
            handler : function()
                      {
                        var Multi= eval("F."+this.multiname);
                         flgcheckRegion=Multi.name;
                           flgcheckRow=-1;
                         /*if(getSavedFlg()==1)
                          {*/
                             
                             var idx=this.mulIndex;
          
                               if(Multi.getRowCount()>0)
                               {

                                   currentRegion=Multi.name;
                                   currentRegionIndex = idx;
                                   var myreg=Multi.name;
         
                if(pageno[idx]!=1)
                                    {
                                           GridRecarr[idx]=new Array();
                                          GridRecarrDisp[idx]=new Array();
                                      readSelectedGridList(idx,Multi);
                                      pageno[idx]= pageno[idx] -1 ;
                                      goGridPage(pageno[idx],Multi,idx);
                                       gridRender(idx,Multi);
                                       checkFromList(idx,Multi)
                                    }
                              }
                         /* }*/


                    }
         }, '-','$Page',{
                    xtype: 'textfield',
                   text: '$GoPage', 
                    id: regions_to_render[gridIndex].name+'_pg',
                    mulIndex:gridIndex,
                    multiname: regions_to_render[gridIndex].name,
                    width: 50,
                    listeners: 
                           {
                              'change': 
                                function(){
                                            var enteredPage=this.getValue();
                                            
                                             var idx=this.mulIndex;
                          var Multi= eval("F."+this.multiname);
                                              currentRegion=Multi.name;
                                              currentRegionIndex = idx;
                                              var myreg=Multi.name;
         
                        flgcheckRegion=Multi.name;
                                            flgcheckRow=-1;
                                              /*if(getSavedFlg()==1)
                                              {*/
                                                if(isNaN(enteredPage))
                                                {
                                                       alert("$enter_numeric_value");
                                                       this.setValue(pageno[idx]);
                                                }
                                                else
                                                {
                                                  
                                                  if(Multi.getRowCount()>0)
                                                   {

                                                        
                                                          var rowToRender = (Multi.getRowCount() % rowsperpage[idx]) ;
                                                          var availablePage=enteredPage;
                                                          if(rowToRender!=0)
                                                          {
                                                              availablePage = ((Multi.getRowCount() - rowToRender )/ rowsperpage[idx])+1;
                                                          }
                                                          if(enteredPage <= availablePage )
                                                          {
                                                             readSelectedGridList(idx,Multi);
                                                             pageno[idx]=enteredPage ;
                                                          
                                                           GridRecarr[idx]=new Array();
                                                           GridRecarrDisp[idx]=new Array();
                                                           
                                                           goGridPage(pageno[idx],Multi,idx);
                                                              gridRender(idx,Multi);
                                                             checkFromList(idx,Multi)
                                                         }
                                                     }
                                                   }
                                                 }

         
                                           /*}*/
                           }

         },' $of ' , 
            { xtype: 'tbtext', id:regions_to_render[gridIndex].name+'tot' ,text:'aa' } ,
            { xtype: 'tbtext' ,text:'[$Rows '} , 
            { xtype: 'tbtext' ,id:regions_to_render[gridIndex].name+'from' ,text: 'aa'} ,
            { xtype: 'tbtext' ,text: ' $to '} ,
            { xtype: 'tbtext' ,id:regions_to_render[gridIndex].name+'to' ,text: 'aa'} ,
            { xtype: 'tbtext' ,text: ']' }
         , '-', {
            text:'',
            id: regions_to_render[gridIndex].name+'_next',
            tooltip:'$NextPage',
            iconCls:'lsmNextpage',
            multiname: regions_to_render[gridIndex].name,
            mulIndex:gridIndex,
            handler : function()
                      {
                        var Multi= eval("F."+this.multiname);
                         flgcheckRegion=Multi.name;
                           flgcheckRow=-1;
                         /*if(getSavedFlg()==1)
                          {*/
                             
                             var idx=this.mulIndex;
                               if(Multi.getRowCount()>0)
                               {

                                   currentRegion=Multi.name;
                                   currentRegionIndex = idx;
                                   var myreg=Multi.name;
         
               
                                     var remin=Multi.getRowCount() % rowsperpage[idx];
                                     if(remin==0)
                                     {
                                        remin=rowsperpage[idx];
                                     }                                 
                                     var lastp= (( Multi.getRowCount() - remin ) / rowsperpage[idx])+1;
                                    if(pageno[idx]!=lastp)
                                    {
                                           GridRecarr[idx]=new Array();
                                          GridRecarrDisp[idx]=new Array();
                                     readSelectedGridList(idx,Multi);
                                      pageno[idx]= pageno[idx] -1+1+1 ;
                                    goGridPage(pageno[idx],Multi,idx);
                                       gridRender(idx,Multi);
                                    checkFromList(idx,Multi)
                                    }
                              }
                         /* }*/


                    }
         }, '-', {
            text:'',
            id: regions_to_render[gridIndex].name+'_last',
            tooltip:'$LastPage',
            iconCls:'lsmLastpage',
            multiname: regions_to_render[gridIndex].name,
            mulIndex:gridIndex,
            handler : function()
                      {
                        var Multi= eval("F."+this.multiname);
                         flgcheckRegion=Multi.name;
                           flgcheckRow=-1;
                         /* if(getSavedFlg()==1)
                          {*/
                             
                             var idx=this.mulIndex;
                               if(Multi.getRowCount()>0)
                               {

                                   currentRegion=Multi.name;
                                   currentRegionIndex = idx;
                                   var myreg=Multi.name;
         
         
                                     var remin=Multi.getRowCount() % rowsperpage[idx];
                                     if(remin==0)
                                     {
                                        remin=rowsperpage[idx];
                                     }
                                          GridRecarr[idx]=new Array();
                                          GridRecarrDisp[idx]=new Array();
                                          readSelectedGridList(idx,Multi);
                                    pageno[idx]= (( Multi.getRowCount() - remin ) / rowsperpage[idx])+1;
                                    goGridPage(pageno[idx],Multi,idx);
                                      gridRender(idx,Multi);
                                      checkFromList(idx,Multi)
                              }
                          /*}*/


                    }

         }
 ],

enableColLock:false,
enableColumnResize:true,
autoHeight : false,
resizable : true,
height: 90,
stateful:false,
columnLines : true,
trackMouseOver:true,
      width : gridWidth[gridIndex],
 view:  new Ext.grid.GroupingView({
 forceFit:false,
 preserveScrollOnRefresh: true
 }),
      cls:'x-grid-custom',
      region : 'center',
  /*onLoad: Ext.emptyFn,*/

listeners : {  

render : function(grid){
                  grid.store.on('load', function(store, records, options)
                  {
                      var selmod = grid.getSelectionModel()
                      if(currentRow!='' && currentRegion == grid.id.substr(0,3)) 
                      {
                          if(scrollState)
                         {
                           grid.getView().restoreScroll(scrollState);
                         }

                          selectCurrentRow(grid.id.substr(0,3))
                          headerStyling(grid);
                         
                         
                     }
         });                      
  },
 'cellclick' : function(grid, rowIndex, columnIndex, e) 
               {  
                  var columnName = grid.getColumnModel().getDataIndex(columnIndex);
                  var field = eval("F."+columnName);
                 if(columnIndex!=0)
                 {
                   
                     var rec = grid.getStore().getAt(rowIndex);
                     var selIndex=rec.get('sequence');
                     
                      var mygridid=grid.id;
                      var tempmul=mygridid.substr(0,3);
                      var tempidx=indexFromMulti[tempmul]
                     
                     var clickedRow=((pageno[tempidx]-1 )*rowsperpage[tempidx])-1+1 +1 + selIndex;
                     var disseq=getSeq(field.getSequence(),clickedRow);
                       flgcheckRegion=mygridid.substr(0,3);
                       flgcheckRow=clickedRow;
                     if(getSavedFlg()==1)
                     {
                       if(gridHiddenArr[disseq-1]==null || gridHiddenArr[disseq-1]==0)
                       {
                         
                         var checkStr='check'+"_"+mygridid.substr(0,3);
                         var checkvalue=rec.get(checkStr);
                         
                         Multi=eval("F."+mygridid.substr(0,3));
                          
                         currentRegion=Multi.name;
                         if(checkvalue!="-1")
                         {
                           if( columnName != checkStr)
                           {
                               var runid=indexFromMulti[Multi.name]                           
                               currentRow=clickedRow;
                               if(showingRegionid!=Multi.id || showingrec!=currentRow)
                               {
                                  //goDirect(Multi.id,currentRow);
                               }          
                               inlineflag=1;
                               inlinerec=currentRow;
                               inlinereg=currentRegion;
                               flgcheckRegion=currentRegion;
                               flgcheckRow=currentRow;
                               headerStyling(grid);
                               if(gridRowFromCurrRow[runid]==null)
                               {
                                 gridRowFromCurrRow[runid]=new Array();
                               }
                               gridRowFromCurrRow[runid][currentRow]=rowIndex;

                               if(regionfieldtype[runid][columnIndex-1].indexOf('#')==-1)
                               {
                                 if(field.getColumnKind()==2 /*||field.getColumnKind()==3*/)
                                 {
                                      getlov(getSeq(field.getSequence(),currentRow),field.getSequence(),currentRow);
                                 }
                                 if(field.getColumnKind()==5)
                                 {
                                      getmlov(getSeq(field.getSequence(),currentRow),field.getSequence(),currentRow);   
                                  }
                                 if(field.getColumnKind()==9)
                                 {
                                     //calender('','','','\/si_image',getSeq(field.getSequence(),currentRow));
                                  }

                              }

                           }
                       
                         }
                         cellEditSucess=1;
                       }
                       else
                       {
                          cellEditSucess=0;
                         return false;
                       }

                     }
                      else
                       {
                          cellEditSucess=0;
                         return false;
                       }

                 }
                 
              },
                'afteredit': function(e)
                  {
                      
                     gridAfteredit(e,'E');
                     return true; 
                   },
                  beforeedit: function (roweditor, rowIndex) {
                           if(cellEditSucess==1)
                           {
                             doBeforeEdit(roweditor, rowIndex);

                           }
                  } ,
                 'columnresize':function(argColIndex, argNewWidth){
                     Ext.getCmp(this.id).getView().refresh();
                 }


     } 


});

    
}

function changeCommentType(e,mode)
{

var Field= eval('F.'+e.field);

  if(Field.getColumnKind()==11)
  {
    var cm = e.grid.getColumnModel();
     var c = cm.getColumnAt(e.column);
    c.editor= new Ext.form.TriggerField({
            id: Field.name+'textarea'+currentRow ,
            triggerClass:'triggerlens',
            editable: true,
                                          maxLength:500,
                                          maxLengthText:jsAlertMessages["max_length_exceeded"]
 
        });
  }


}
function gridAfteredit(e,mode)
{
   var Field= eval('F.'+e.field);
  var grid=Ext.getCmp(currentRegion+'_grid');
  scrollState = grid.view.getScrollState();
  changeCommentType(e,mode);
   var Multi=eval("F."+currentRegion);
   var runid=indexFromMulti[Multi.name];
   var display=e.value;
   if(mode!='E' && e.displayValue !=null && e.displayValue !='undefined')
   {
      display= e.displayValue;
   }
    var storeSame=false;
  var dispSame=false;
    if(Field.read(currentRow) ==e.value)
  {
     storeSame=true;
  }
   
   Field.writeValue(e.value,display,currentRow);
   if(Field.getColumnKind()==9 && Field.read(currentRow).indexOf('NaN')!=-1)
   {
      alert(jsAlertMessages["date_error"]+Field.getLabel());
      Field.writeValue('','',currentRow);
   }
   
   Field.onChange(currentRow);
   if(!storeSame)
   {
     
   var afterseq= Field.getSequence();
   if(dependentsArr[afterseq-1]!=null)
   {
      Field.callInfolet(currentRow);
     }
   }
  inlineflag=1;
   inlinerec=currentRow;
   inlinereg=currentRegion;
}

function doBeforeEdit(roweditor, rowIndex)
{
 var grid= roweditor.grid;
                            var mygridid=grid.id
                               var Multi=eval("F."+mygridid.substr(0,3));
                               var runid=indexFromMulti[Multi.name];
                          
                             var rec = grid.getStore().getAt(roweditor.row);

                              var selIndex=rec.get('sequence');

                          
                            var cm = grid.getColumnModel();
                            var c = cm.getColumnAt(roweditor.column);                           
                           
                              
                               currentRegion=mygridid.substr(0,3);
                               currentRow=((pageno[runid]-1 )*rowsperpage[runid])-1+1 +1 + selIndex;
                                                             
                                var editfield= regionfields[runid][roweditor.column-1];
                                var fldref=editfield.getReference(currentRow);

                                var fseq=getSeq(editfield.getSequence(),currentRow);
                                
                                c.editor.enable();

                                if ( gridHiddenArr[fseq-1]=='1' || editfield.getColumnKind()==2 || editfield.getColumnKind()==5 ) 
                                 {
                                    if ( gridHiddenArr[fseq-1]=='1')
                                    {
                                      c.editor=null;
                                    }
                                    else
                                    {
                                     //c.editor.disable();
                                    }
                                     return false;
                                }
                                else if(editfield.getColumnKind()==3)
                                {
                                     
                                       var dropArray= new Array;
                                        dropArray= getGridOptions(editfield,currentRow);
                                       c.editor.destroy();
                                       c.editor=   new Ext.form.ComboBox({
                                                                           store: new Ext.data.SimpleStore({
                                                                                                              id: editfield.name+'_st'+currentRow,
                                                                                                              fields: ['stored', 'display'],
                                                                                                              data : dropArray  
                                                                                                          }),
                                                                           id: editfield.name+'_combo'+currentRow,
                                                                           displayField:'display',
                                                                           valueField: 'stored',
                                                                           mode: 'local',
                                                                           typeAhead: false,

                                                                           triggerAction: 'all',
                                                                           lazyRender: true,
                                                                           forceSelection:true,
                                                                           emptyText: 'Select One',
                                                                           editable: true,
                                                                           listeners: {
                                                                            // required for the first render event
                                                                            afterrender: function(combo) {
                                                                              combo.onTriggerClick();
                                                                            },
                                                                            // required after render during activating an other combo in the column
                                                                            show: function(combo) {
                                                                              combo.onTriggerClick();
                                                                            },
                                                                            select:function(combo) {
                                                                              combo.triggerBlur();
                                                                            }

                         }
                                                   });
                                  var theSelectionModel = grid.getSelectionModel();
                                  theSelectionModel.onEditorKey = function(field, e)
                                  {
                                     var k = e.getKey(), newCell, g = theSelectionModel.grid, ed = g.activeEditor || g.lastActiveEditor;
                                     if(k == e.TAB && !e.ctrlKey)
                                     {
                                       try
                                       {
                                         e.stopEvent();
                                         ed.completeEdit();
                                       }
                                       catch(err)
                                       {
                                       }
                                     }
                                  };
                                 //c.aa();
                                    
                                }
                                else if(editfield.getColumnKind()==11)
                                {
                                       c.editor= new Ext.form.TextArea({id: editfield.name+'textarea'+currentRow , allowBlank: true,value:editfield.read(currentRow),
                                                                            maxLength:500,
                                                                            maxLengthText:jsAlertMessages["max_length_exceeded"]});
                                       c.editor.enable();  
                                }


                        /* }
                         else
                          {
                              c.editor.disable();
                          }*/
                  
}

function callEditSupport(myreg,rowIndex)
{

}

function callAddSupport(myreg)
{

}

function addRecord(val,idrec)
{
  
}


function goSingleDirect(multiId,val)
{
showingRegionid=multiId;
showingrec=val;
var formRenderer=getStrategyObject(multiId);
formRenderer.getMultirowPage(multiId,val);
afterGoDirect(multiId,val);
}


function goDirect(multiId,val)
{
showingRegionid=multiId;
showingrec=val;
goSingleDirect(multiId,1);
}

function afterGoDirect(multiId,val)
{

}

function showAllMulti(multi,no_of_rows)
{
var multiId =multi.id

         if(multi.getRowCount()>0)
          {

           getRef("mrrpid" + multiId).value=no_of_rows;
          }

  var formRenderer=getStrategyObject(multiId);
  formRenderer.writedata_inarray(multiId,true);
  formRenderer.getMultirowPage(multiId,1);
 
}

function gridOnSave(Multi)
{
return true;
}

function gridOnAdd(Multi)
{
return true;
}

function gridCancel(Multi)
{
 
   
   var recs=indexFromMulti[Multi.name];
       var rowToRender = (currentRow % rowsperpage[recs]) ;
      
      if(rowToRender ==0)
      {
        rowToRender = rowsperpage[recs];
      }

   var idx = rowToRender -1;
   


  if(currentRow > rowsperpage[recs]*pageno[recs])
  {
    idx = -1;
  }
   

  if(GridRecarr[recs][idx]!=null && GridRecarr[recs][idx].length!=0)
  {
    
    for (j=0;j<regionfields[recs].length;j++)
    {    
       if(GridRecarr[recs][idx][j+1]!='')
      {
       
                                     if(regionfields[recs][j].getColumnKind()==3)
                                     {  
                                        regionfields[recs][j].enable(currentRow);
                                        
                                
                                         
                                        var curr_row_ind =gridFieldSequence(regionfields[recs][j],currentRow)-1 ;
                                        if(editValues2dArr[j]!=null)
                                        values2dArr[curr_row_ind]=editValues2dArr[j];
                                        if(editText2dArr[j]!=null)
                                        text2dArr[curr_row_ind]=editText2dArr[j];
                                        valArr[curr_row_ind]=editStored[j] ;
                                        dispValArr[curr_row_ind]=editDispvalue[j]  ;
                                        htmValArr[curr_row_ind]=editHtmValArr[j];
                                                                               
                                        regionfields[recs][j].writeValue( editStored[j] , editDispvalue[j]  ,currentRow);
                                       
                                     } 
                                     else
                                     {                                      
                                       regionfields[recs][j].writeValue( GridRecarr[recs][idx][j+1],GridRecarrDisp[recs][idx][j+1],currentRow);        
                                     }
                                     regionfields[recs][j].onChange();
                                     //goDirect(Multi.id,currentRow);
                                    if(regionfields[recs][j].getColumnKind() !=null && regionfields[recs][j].getColumnKind()==3)
                                     {
                                       regionfields[recs][j].writeValue( regionfields[recs][j].read(currentRow) , readDisplayedValueCustom(regionfields[recs][j],currentRow),currentRow);
                                     }
                                  

      }
    }
  }
  else
  {
        
        currentRow=currentRow-1;
        Multi.deleteRow();
   }
  savedFlg=1;
  gridOnCancel(Multi);


}

function gridCancelSimply(Multi)
{
   
 
   var recs=indexFromMulti[Multi.name];
       var rowToRender = (currentRow % rowsperpage[recs]) ;
      
      if(rowToRender ==0)
      {
        rowToRender = rowsperpage[recs];
      }

   var idx = rowToRender -1;
   


  if(currentRow > rowsperpage[recs]*pageno[recs])
  {
    idx = -1;
  }
   

  if(GridRecarr[recs][idx]!=null && GridRecarr[recs][idx].length!=0)
  {
    
    for (j=0;j<regionfields[recs].length;j++)
    {    
       if(GridRecarr[recs][idx][j+1]!='')
      {
                                     
           regionfields[recs][j].writeValue( GridRecarr[recs][idx][j+1],GridRecarrDisp[recs][idx][j+1],currentRow); 
      }     
    }  
  }

}


function getGridName()
{

  var idx=indexFromMulti[currentRegion];
   if(gridNames[idx]!=null)
   {
       return gridNames[idx];
   }
    else
   {

     return 'Entry';
   }

}

function prepareStored(myreg,start,end,pagenumber,recind)
{

}

function goGridPage(pagenumber,Multi,recind)
{
      var pgstart = ((pagenumber-1 )*rowsperpage[recind])+1;
       var pgend = ((pagenumber-1 )*rowsperpage[recind])+rowsperpage[recind];
     pageno[recind]=pagenumber;
        GridRecarr[recind]=new Array();
              GridRecarrDisp[recind]=new Array();
        
       if(Multi.getRowCount()>= pgstart  )
       {
          if(!dispdone[recind])
          {
             dispdone[recind]=new Array();
          }

           if(!dispdone[recind][1])
        {
           var tmpregion=regionArray.slice(0);
           regionArray=[Multi];
           traverse();
           regionArray=tmpregion.slice(0);
        }
          prepareStored(Multi,pgstart,pgend ,pagenumber ,recind);
          
          dispdone[recind][pagenumber]=pagenumber;
             pageno[recind]=pagenumber;
              GridRecarr[recind]=new Array();
              GridRecarrDisp[recind]=new Array();
          for(numrec=pgstart ;numrec <= Multi.getRowCount()&&numrec <= pgend ;numrec++)
          {

              var currpos=numrec-pgstart;
             
             var myrow=pgstart+currpos;
             currentRegion=Multi.name;
             
             if(!editSupportDone[recind]  || !editSupportDone[recind][myrow] )
             {
               if(!editSupportDone[recind])
               {
                 editSupportDone[recind]=new Array();
               }
                 //goDirect(Multi.id,myrow);
                 callEditSupport(Multi,myrow-1);
                 
                 editSupportDone[recind][myrow]=1;
             }

             if(Multi.isMarkedForDeletion(myrow))
             {
                 addRecToGrid(recind,Multi,currpos,"D");
             }
             else{
                 addRecToGrid(recind,Multi,currpos,"S");
             }
          }
       }
}

function gridOnCancel(Multi)
{
}

function gridAferDelete(idx,Multi)
{
}

function putGridNamesInLabel()
{
 
    for(putIdx=0; putIdx < regions_to_render.length;putIdx++)
    {
     if(gridLabelAppd[putIdx])
     {
      
       var regsub=regionfields[putIdx];
       for (putIdxfld=0;putIdxfld<regsub.length;putIdxfld++)
       {
         labelArr[regsub[putIdxfld].getSequence()-1] = gridLabelAppd[putIdx][putIdxfld];

       }
     }
    }

}

function revertGridNamesInLabel()
{

    for(revIdx=0;revIdx<regions_to_render.length;revIdx++)
    {
     if(gridLabelOrig[revIdx])
     {
       var regsub=regionfields[revIdx];
       for (revIdxfld=0;revIdxfld<regsub.length;revIdxfld++)
       {
         labelArr[regsub[revIdxfld].getSequence()-1] = gridLabelOrig[revIdx][revIdxfld];

       }
     }
    }
}
function onGridSubmit()
{
  var reqflg=false;
  if(readOnlyScreen || getSavedFlg()==1)
  {
    reqflg=true;
    
    putGridNamesInLabel();
  
    var formRenderer=getStrategyObject();
    var reqflg= formRenderer.checkrequired();
    revertGridNamesInLabel();
    
  }
  if(reqflg)
  {
    reqflg =  validateGridOnSubmit();
  }
  return reqflg;

}

function validateGridOnSubmit()
{

var retflg =true;

var actual_row=currentRow;
var actual_reg = currentRegion;
if(validateGrid && validateGrid.length>0)
{

  for(valid=0;valid<validateGrid.length;valid++)
  {
     currentRegion=validateGrid[valid].name;
     retflg = validateGridReg(validateGrid[valid]);
     if(!retflg)
     {
       break;
     }
  }
}
  currentRow = actual_row;
  currentRegion = actual_reg;
if(!retflg)
{
  return false;
}
  /*currentRow = actual_row;
  currentRegion = actual_reg;*/
return true;

}


function validateGridReg(Multi)
{
var retuflg = true;
  for(mulirec=1; mulirec <=Multi.getRowCount()  ; mulirec++)
  {
     if( !Multi.isMarkedForDeletion(mulirec))
     {
       currentRow=mulirec;
       retuflg =gridOnSave(Multi);
       if(!retuflg)
       {
          break;
       }
     }
  }
if(!retuflg)
{
  return false;
}
return true;
}
function checkValueInSystem()
{
  
  var cntflg=1;
    for (sys=0;sys<syscheckField.length;sys++)
    {
      
      if(syscheckMultiFlg[sys]==1)
      { 
     
         for(mulind=1;mulind<=syscheckMulti[sys].getRowCount();mulind++)
         {
          
           if(syscheckField[sys].read(mulind)!='' && readDisplayedValueCustom(syscheckField[sys],mulind) =='')
           {
            alert('$not_available'+ '$in '+syscheckMultiname[sys]+'$for_field' + labelArr[syscheckField[sys].getSequence()-1] + '(Row'+mulind+')' );
            cntflg=0;
            break;
           }
         }
      }
      else
      { 
           
           if(valArr[syscheckField[sys].getSequence()-1] !='' && syscheckField[sys].read() =='')
           {
              alert('$enter_value_not_available'+ labelArr[syscheckField[sys].getSequence()-1] );
              cntflg=0;
           }
      }
      if(cntflg==0)
      {
         break;
       }
   }
   if(cntflg==1)
   {
     return true;
   }
}


function undoDeleteRecord(checkid)
{
    
    var myreg=checkid.substr( checkid.length-3 ,3);
    var rowind= checkid.substr(6,checkid.length-9);
   
    
    var Multi = eval('F.'+myreg);
    var idx=indexFromMulti[Multi.name];
      var rowcalc= (rowind-1+1) + ( (pageno[idx]-1) * rowsperpage[idx] );

   if((rowcalc==currentRow && myreg == currentRegion)|| getSavedFlg() ==1 )
   {
     scrollState = null;
     //goDirect(Multi.id,rowcalc);
     currentRow=rowcalc;
     currentRegion=Multi.name
     document.getElementById("mrrowdb"+rowcalc+"id"+Multi.id).checked=false;
     Multi.markRowForDelete(rowcalc,this);
     Multi.isMarkedForDeletion(rowcalc);
    /*if(!gridOnSave(Multi))
    {
       gridCancelSimply(Multi);
       document.getElementById("mrrowdb"+rowcalc+"id"+Multi.id).checked=true;
  Multi.markRowForDelete(rowcalc,this);
       Multi.isMarkedForDeletion(rowcalc);
    }*/
     gridAferDelete(idx,Multi);
     inlineflag=1;
     inlinerec=currentRow;
     inlinereg=currentRegion;
     goGridPage(pageno[idx],Multi,idx);
     currentRegionIndex = idx;
     gridRender(idx,Multi);
   }
}

function refreshContruction()
{
  for( call =0 ; call <regions_to_render.length; call++)
   {
       /*if(!Ext.getCmp(regions_to_render[call].name+'_grid'))
       {
         createGrid(call);
       }*/
       if(Ext.getCmp(regions_to_render[call].name+'_grid'))
        {
         gridRender(call,regions_to_render[call]);
        }
    }

}

function readSelectedGridList(idx,Multi)
{

  var myreg=Multi.name;
  var selloc=new Array();
   if(gridSelList[idx] == null)
   {
     gridSelList[idx]=new Array();
     
   }
   
  // debuga(myreg);

   var cnt=0;
   for(k=1; k<=Multi.getRowCount();k++)
   {

   if( document.getElementById("check_"+k+myreg)!=null && eval(document.getElementById("check_"+k+myreg).checked) )
   {
             
     var mmm=k-1;
     
     selloc[cnt]=mmm+'o';
     cnt++;
    }
        else if( document.getElementById("check_"+k+myreg)!=null && !eval(document.getElementById("check_"+k+myreg).checked) )
         {
              var mmm=k-1;
     
     selloc[cnt]=mmm+'p';
     cnt++;
          }
           
   }
  if(selloc.length!=null&&selloc.length!=0)
  {
           
           for(selk=0;selk<selloc.length;selk++)
      {
                             
                var ss;
                var remflg=0;
                
                 if( selloc[selk].indexOf('p') == -1)   
                 {
                    
                    ss = selloc[selk].substr(0,selloc[selk].length-1);
                    remflg=0;
                    
                 }
                 else
                 {
                    ss = selloc[selk].substr(0,selloc[selk].length-1);
                    remflg=1;
                    
                 }
                
                var checkrow=ss-1+2;
                var rowcalc= (ss-1+2) + ( (pageno[idx]-1) * rowsperpage[idx] );
      var indic=gridSelList[idx].indexOf(rowcalc);
                if(remflg==1)
                {
                  
                  if(indic != -1  )
                  {
                   gridSelList[idx].splice(indic,1);
                   }
                   
                }
                else
                   {
                     
                     if(indic == -1  )
                     {
                       gridSelList[idx][gridSelList[idx].length]= rowcalc;
                     }
                   }
                
           }
  }
   
}

function checkFromList(idx,Multi)
{
  if(gridSelList[idx]!=null)
  {
   
   var myreg=Multi.name;
   for( gridsel=0;gridsel< GridRecarrDisp[idx].length;gridsel++)
   {
     
      var sel= gridsel;
      var checkrow= ( (pageno[idx]-1 ) * rowsperpage[idx] ) + sel+1;
      
      var k = sel-1+2;
      
      if(gridSelList[idx].indexOf(checkrow) > -1)
      {

        var check_in = eval(document.getElementById("check_"+k+myreg));
        check_in.checked=true;
      }

   }
  }
}


function gridFieldSequence(Field,row)
{
  if(row==1)
  {
   return Field.getSequence();
  }
  else
  {
  return getSeq(Field.getSequence(),row);
  }
}

function checkGridDuplicate(Multi,Field)
{
var flag=0;
  for(i=1;i<=Multi.getRowCount();i++)
  { 
          if(!Multi.isMarkedForDeletion(i) && (Field.read(i)==Field.read(currentRow)) && i!=currentRow ) 
          {
            flag=1;
            break;
          }
      }
         
   if(flag==1) 
   {
     alert("$already_exists" + labelArr[Field.getSequence()-1] );
     return false;
   }

    return true;

}

function checkGridDecimal(Multi,Field)
{
    var myvalnum= Field.read(currentRow) + '';
    if(myvalnum.indexOf('.') ==-1)
    {
      return true;
    }
    else
    {
      alert("$whole_namuber" + labelArr[Field.getSequence()-1] );
      return false;
    }
}

function checkGridDuplicateCombination(Multi,FieldArray,alertString)
{
var flag=0;
var fieldvalue =new Array();
var fieldvalueappend;
 for(fld=0; fld<FieldArray.length;fld++)
 {
   fieldvalue[fld] =FieldArray[fld].read(currentRow);
 }
  fieldvalueappend = fieldvalue.join('_$$_');

  for(dupcomb=1;dupcomb<=Multi.getRowCount() ;dupcomb++)
  { 
          var innerfieldvalue =new Array();
          var innerfieldvalueappend;
          for(innfld=0; innfld<FieldArray.length;innfld++)
         {
            innerfieldvalue[innfld] =FieldArray[innfld].read(dupcomb);
         }
           innerfieldvalueappend = innerfieldvalue.join('_$$_');
          if( fieldvalueappend ==innerfieldvalueappend  &&!Multi.isMarkedForDeletion(dupcomb) && dupcomb!=currentRow) 
          {
            flag=1;
            break;
          }
      }
         
   if(flag==1) 
   {
     alert(alertString);
     return false;
   }

    return true;

}

function clearGrouping(Multi)
{

 var idx=indexFromMulti[Multi.name];

gridDataStore[idx].clearGrouping();

}


function gridGroupSum(Multi,groupField,checkField,checkVal,mode,mesg)
{

  var appd_mesg = mesg + ':' +labelArr[groupField.getSequence()-1] + ' - '  ;
  var multiplier=1000000000;
  var grouparr=new Array();
  var distinct_entry = new Array();
  var distinct_entry_disp = new Array();
  var inc=0;
         
  for(summing=1;summing<=Multi.getRowCount();summing++)
  {
      var grvalue=groupField.read(summing);
    if(!Multi.isMarkedForDeletion(summing))
    {
      if(grouparr[grvalue]==null)
      {
        grouparr[grvalue]=0;
        distinct_entry[inc]=grvalue;
        distinct_entry_disp[inc]=getGridDisplayValue(groupField,summing);
        inc=inc+1;
      }
      grouparr[grvalue] = eval(grouparr[grvalue] * multiplier ) + eval(checkField.read(summing) * multiplier );
      grouparr[grvalue] = grouparr[grvalue] / multiplier;
      
      if(grouparr[grvalue] > checkVal )
       {
          alert(appd_mesg+getGridDisplayValue(groupField,summing));
          return false;
       }
    }
  }
   
     if(mode=='E')
     {
       for(ent=0;ent<distinct_entry.length;ent++)
       {
          if(grouparr[distinct_entry[ent]] != checkVal )
         {
             alert(appd_mesg+distinct_entry_disp[ent]);
             return false;
         }
       }
    }
   return true;
}

function callBackAfterGrid()
{
  Ext.getBody().unmask();
}


function getGridDisplayValue(myfields,row)
{
              var dispvalue;
        if(F.getFormParameter("edit_flag")!='Y' && !readOnlyScreen)
        {
    var stored=myfields.read(row);

              var tempdisp = readDisplayedValueCustom(myfields,row);
    if( /*myfields.getColumnKind()!=3 &&*/ tempdisp != null && tempdisp != '' && tempdisp != '0')
    {
      dispvalue =  tempdisp ;

    }
    else
    {
      dispvalue  =  stored ;

    }
         }
         else
         {
            dispvalue =getFieldDisplayValue(myfields,row);

         }
   return dispvalue;

}

function getFieldDisplayValue(myfields,row)
{

              var dispvalue;
    var stored=myfields.read(row);
               var tempdisp = readDisplayedValueCustom(myfields,row);
               var fseq=getSeq(myfields.getSequence(),row);
    if( tempdisp != null && tempdisp != '' && tempdisp != '0')
    {
                
        dispvalue =  tempdisp ;


    }
    else
    {
                if(dispValArr[fseq-1] && dispValArr[fseq-1]!='')
                {
                   dispvalue = dispValArr[fseq-1];
                }
                else
                {
        dispvalue  =  stored ;
                }
    }

   return dispvalue;

}

function readprefSuffValue( Field , row)
{
  var valuerow='';
  var myrow=1;
   if(multiArr[Field.getSequence()-1])
   {
      myrow=row;
   }
    if(Field.read(myrow)!='')
    {
      valuerow= getFieldDisplayValue(Field ,myrow);
    }
  return valuerow;
}



function pencilEdit(p)
{
var clickMulti=p.substr(p.length-3,3);
var selIndex = p.substr(4,p.length-7);
 currentRegion=clickMulti;
   if(getSavedFlg()==1)
   {
        savedFlg=0;
        editEntryType(selIndex,clickMulti+'_grid');
        inlineflag=0;
    }
            
}

function gridColumnChangeInjection(Field)
{
    
    var actualFunc= Field.onChange.toString();
   var replacement='gridInlineEditfunc(this,row)\;\n';
   var changefunc  = 'function(row)\{\n '+replacement+' \}' ;
   
   if(actualFunc != '' && actualFunc.indexOf('row,col,i')== -1 && actualFunc.indexOf('gridInlineEditfunc') ==-1 )
   {
      changefunc=actualFunc.replace(/\}([^\}]*)$/,replacement+'\}'+'$1');
   }
   
   eval('F.'+Field.name+'.onChange= '+changefunc); 

}

function gridColumnHideInjection(Field)
{
   
   var actualFunc= Field.hide.toString();
   var replacement='gridHideEditfunc(this,row)\;\n';
   var hidefunc  = 'function(row)\{\n '+replacement+' \}' ;
   
   if(actualFunc != '' && actualFunc.indexOf('gridHideEditfunc') ==-1 )
   {
      hidefunc=actualFunc.replace('\{','\{'+replacement);
   }
   eval('F.'+Field.name+'.hide= '+hidefunc);

}

function gridColumnShowInjection(Field)
{
   
   var actualFunc= Field.show.toString();
   var replacement='gridShowEditfunc(this,row)\;\n';
   var showfunc  = 'function(row)\{\n '+replacement+' \}' ;
   
   if(actualFunc != ''  && actualFunc.indexOf('gridShowEditfunc') ==-1 )
   {
      showfunc=actualFunc.replace('\{','\{'+replacement);
   }
   eval('F.'+Field.name+'.show= '+showfunc);

}


function gridInlineEditfunc(Field,erow)
{
  var row=erow;
  var origRow=currentRow;
  currentRow=row-1+1; 
  if(isNaN(erow) || erow=='0')
  {
     currentRow=origRow;
   row=origRow;
  }
  var thisReg=multiFromId[multiIdArr[Field.sequence-1]].name;
  currentRegion=thisReg;
  
  var Multi = eval('F.'+thisReg);
  if(inlineflag==1 && addrowFlg==1 && addrecflg ==1 /*&& (Field.getColumnKind()==2 ||Field.getColumnKind()==5 )*/)
  {
          var Multi= eval('F.'+thisReg)
        
    if(Field.getColumnKind()==2 ||Field.getColumnKind()==5 || Field.getColumnKind()==9 )
    {
    var grid=Ext.getCmp(thisReg+'_grid');
    scrollState = grid.view.getScrollState();
    }
    var runid = indexFromMulti[thisReg];

    var thisrow=row%rowsperpage[runid];
     if(thisrow==0){
        thisrow= rowsperpage[runid];
     }

     if(Multi.isMarkedForDeletion(row))
     {
         addRecToGrid(runid,Multi,thisrow-1,"D");
      }
       else{
          addRecToGrid(runid,Multi,thisrow-1,"S");
       }


   if((Field.getColumnKind()!=2  && Field.getColumnKind()!=5 &&  Field.getColumnKind()!=9 ))
   {
    var endRow=Multi.getRowCount()%rowsperpage[runid];
     if(endRow==0){
        endRow= rowsperpage[runid];
     }


     var grid= Ext.getCmp(Multi.name+'_grid');
     for(edrow=0;edrow<endRow;edrow++ )
     {
       var reco = grid.store.getAt(edrow);
       if(reco )
       {
         var selIndex=reco.get('sequence');
        
         if(thisrow-1 == selIndex)
         {
            grid.getView().refreshRow(edrow);
            break;
         }
       }
    }
   }
   gridDataStore[runid].loadData(GridRecarrDisp[runid]);

  }

}

function gridHideEditfunc(Field,row)
{
  var filseq=getSeq(Field.getSequence(),row);
  gridHiddenArr[filseq-1] = 1;
}

function gridShowEditfunc(Field,row)
{
  var filseq=getSeq(Field.getSequence(),row);
  gridHiddenArr[filseq-1] = 0;
}

function getSavedFlg()
{

if(F.getFormParameter("edit_flag")!='Y' && !readOnlyScreen)
{
  return 1;
}
else
{
  return 0;
}
//alert('-inlineflag-'+inlineflag+'-savedFlg-'+savedFlg+'-inlinereg-'+inlinereg+'-flgcheckRegion-'+flgcheckRegion+'-inlinerec-'+inlinerec+'-flgcheckRow-'+flgcheckRow)
if(F.getFormParameter("edit_flag")!='Y' && !readOnlyScreen)
{
var Multi=eval('F.'+currentRegion);
if(savedFlg==0)
{
  alert("$save_grid_message_prefix"+" "+getGridName()+" "+"$save_grid_message_suffix");
  selectCurrentRow(currentRegion);
  return 0;
}
 
if(inlinerec=='')
{

  return 1;
}
if(inlineflag==0&&savedFlg==1)
{

  return 1;
}

if(inlineflag==1 && ( savedFlg==0 || inlinereg!=flgcheckRegion|| inlinerec!=flgcheckRow) && !(Multi.isMarkedForDeletion(currentRow)) && saveEntryTypeOnload(Multi,'NR')==0)
{
    
   if(Multi.name != flgcheckRegion)
  {
     var cgrid=Ext.getCmp(flgcheckRegion+'_grid');
     cgrid.blur();
     gridRender(indexFromMulti[flgcheckRegion] ,eval('F.'+flgcheckRegion))
  }

   var grid=Ext.getCmp(Multi.name+'_grid');
    grid.blur();
  gridRender( indexFromMulti[Multi.name], Multi);
  
 return 0;
}

return 1;
}
else
{
return 0;
}
return 1;
}


function selectCurrentRow(Reg)
{

                    if(currentRow!='') 
                    {
                        var grid = Ext.getCmp(Reg+'_grid');
                        var selmod = grid.getSelectionModel()
                        var runid = indexFromMulti[grid.id.substr(0,3)]
                        var rowToRender = (currentRow % rowsperpage[runid]) ;
                        if(rowToRender ==0)
                        {
                           rowToRender = rowsperpage[runid];
                        }
                        var selRow=rowToRender-1;
                        var matchedrow=1;
                        for(recsearch=0;recsearch<rowsperpage[runid]; recsearch++)
                        {
                            var rec = grid.getStore().getAt(recsearch);
                            if(!rec)
                            {
                               break;
                            }
                            if(selRow==rec.get('sequence'))
                            {
                               matchedrow =recsearch;
                               break;
                            }
                        }

                         selmod.selectRow(matchedrow);
                         grid.getView().focusRow(matchedrow);
                    }

}

function getGridOptions(Field,row)
{

var girdArr=new Array();
var dropref=Field.getReference(row);

if(dropref)
{
  for( opt=0; opt<dropref.options.length; opt++)
  {
    girdArr[opt]= new Array();
    girdArr[opt][0]=dropref.options[opt].value;
    girdArr[opt][1]=dropref.options[opt].text;
  }
}
else
{
  girdArr[0]= new Array();
  girdArr[0][0]='';
  girdArr[0][1]='Select One';

}
return girdArr;
}



function isOptionThere(Field,row)
{
var dropref=Field.getReference(row);
try
{
  return dropref.options.length;
}
catch(e)
{
  return 1;
}

}

function enable_mandatory_label(rowSeq, colSeq) {
  //alert("rowSeq:"+rowSeq+" colSeq:"+colSeq);
  if (!gridRequiredArr[rowSeq]) gridRequiredArr[rowSeq] = new Array();
  gridRequiredArr[rowSeq][colSeq] = 1;
  var req = requiredArr[colSeq - 1];
  requiredArr[colSeq - 1] = true;
  var name = nameArr[colSeq - 1];
  if (rowSeq > 1) {
    name = "_" + (rowSeq - 1) + "__" + name
  }
  var id = name + "_label__div";
  var e = getRef(id);
  if (e != null) {
    e.innerHTML = addFieldLabel(rowSeq, colSeq)
  }
  requiredArr[colSeq - 1] = req;
  //alert(req);
  //alert("enable_mandatory_label "+req);
}



function disable_mandatory_label(rowSeq,colSeq){


if(!gridRequiredArr[rowSeq])
gridRequiredArr[rowSeq]=new Array();
gridRequiredArr[rowSeq][colSeq]=0;

var req=requiredArr[colSeq-1];
requiredArr[colSeq-1]=false;
var name=nameArr[colSeq-1];
if(rowSeq>1){name="_"+(rowSeq-1)+"__"+name
}
var id=name+"_label__div";
var e=getRef(id);
if(e!=null)
{
e.innerHTML=addFieldLabel(rowSeq,colSeq)
}
requiredArr[colSeq-1]=req;
//alert(req);
}



function headerStyling(grid)
{
   var runid = indexFromMulti[grid.id.substr(0,3)];
   for(requ=0;requ<regionfields[runid].length;requ++)
   {
    var field= regionfields[runid][requ];
    var disseq=getSeq(field.getSequence(),currentRow);

    var rowSeq = getRowSeq(disseq);
    var colSeq = getColSeq(disseq);
    var requiredFlg=0;
    var requiredFlgo=0;
    if(requiredArr[colSeq-1])
    {
              requiredFlgo =1;
    }

    if(requiredFlgo!=1)
    {
     if(gridRequiredArr[rowSeq]!=null && gridRequiredArr[rowSeq][colSeq]!=null) 
     {
      requiredFlg =  gridRequiredArr[rowSeq][colSeq];
     }
     var headerCell= grid.getView().getHeaderCell(requ+1);
     if(requiredFlg==1)
     {
      if( headerCell.innerHTML.toString().indexOf('*') == -1)
      {
         var myhtml = headerCell.innerHTML.toString();
                           if(browserType!='gecko' && ! Ext.isIE10)
                           {
         var myaindex = myhtml.indexOf('</A>');
         var myimgindex = myhtml.indexOf('<IMG ');
                           }
                           else
                           {
                              var myaindex = myhtml.indexOf('</a>');
         var myimgindex = myhtml.indexOf('<img ');

                           }
                            var headerpref=myhtml.substr(0, myaindex+4 );
         var headersuff=myhtml.substr(myimgindex,myhtml.length );
        var spanstart='<span><font size="2" color="red">*</font>';
        var spanend=' </span>'; 
                              var myhtmltodisplay=  headerpref +spanstart + labelArr[field.getSequence()-1]+spanend +headersuff;
                           
          headerCell.innerHTML=myhtmltodisplay;
      }
     }
     else
     {
      if( headerCell.innerHTML.toString().indexOf('*') != -1)
      {
                          var myhtml = headerCell.innerHTML.toString();
                           if(browserType!='gecko' && ! Ext.isIE10)
                           {
        
         var myaindex = myhtml.indexOf('</A>');
                             var myimgindex = myhtml.indexOf('<IMG ');
                           }
                           else
                           {
         var myaindex = myhtml.indexOf('</a>');
                             var myimgindex = myhtml.indexOf('<img ');
                           }
         
         var headerpref=myhtml.substr(0, myaindex+4 );
         var headersuff=myhtml.substr(myimgindex,myhtml.length );

         headerCell.innerHTML=headerpref + labelArr[field.getSequence()-1]+headersuff;

      }
     }
    }
   }
}




var infoletCalled=new Array();
var cickedLov='';
var cickedLovStr='';

function handleCascadingResponse(results)
{
  var outputArr=results[0].output;
  defaulting_disable=false;
  addrowFlg=1;
  if(results[0].flag=="Y"&&results[0].error=="")
  {
    for(var i=0;i<outputArr.length;i++)
    {
      var output=outputArr[i];
      var seq=output.OUTPUT_SEQ;
      var value=output.STORED_VALUE;
      var colSeq=getColSeq(seq);

      if(cickedLov==seq && (!infoletCalled[seq] || infoletCalled[seq]!='1'))
      {
        if(kindArr[colSeq-1]==2)
         showPostPopup("Fastlovpopup?"+cickedLovStr,"instance","LOVPopup"+seq,650,580,"yes",150,0,"yes","yes");
         if(kindArr[colSeq-1]==5)
         showPostPopup("Fastmlovpopup?"+cickedLovStr,"instance","MLOVPopup"+seq,650,580,"yes",150,0,"yes","yes");
         infoletCalled[seq]=1;
      }
       if(seq==colSeq && multiArr[colSeq-1])
       {
          var casCalRow=getRowSeq(seq);
             for(var gets=0;gets<outputArr.length;gets++)
             {
                
                if(seq != outputArr[gets].OUTPUT_SEQ && casCalRow < getRowSeq(outputArr[gets].OUTPUT_SEQ) )
                {
                    casCalRow = getRowSeq(outputArr[gets].OUTPUT_SEQ);
                    seq=getSeq(colSeq , casCalRow);
                    continue;
                }
             }
        }
      
      try{
          
          if(valArr[seq -1] && (kindArr[colSeq-1]==5||kindArr[colSeq-1]==2) && cickedLov==seq)
          {
             writeToValArray(seq,valArr[seq -1],output.DISPLAY_VALUE,output.STORED_PICK_VALUES,output.DISPLAY_PICK_VALUES);
          }
          else
          {

            writeToValArray(seq,value,output.DISPLAY_VALUE,output.STORED_PICK_VALUES,output.DISPLAY_PICK_VALUES);
          }
         if(getRef("id"+seq)!=null)
         {
            
            var Field=eval('F.'+nameArr[colSeq-1]);
            if(valArr[seq -1] )
            {
              var  disp = output.DISPLAY_VALUE;
               if((output.DISPLAY_VALUE=='' || output.DISPLAY_VALUE =='undefined') && (output.DISPLAY_PICK_VALUES !='' && output.DISPLAY_PICK_VALUES !='undefined')  )
               {
                   var outStoredInd=output.STORED_PICK_VALUES.indexOf(valArr[seq -1]);
               
                   var myDispArr = output.DISPLAY_PICK_VALUES;
                   disp =myDispArr[outStoredInd]
                }
               addinmain(seq,valArr[seq -1],disp ,output.STORED_PICK_VALUES,output.DISPLAY_PICK_VALUES);
            }
            else
            {
               addinmain(seq,value,output.DISPLAY_VALUE,output.STORED_PICK_VALUES,output.DISPLAY_PICK_VALUES);
            }
         }
         
      }
      catch(e){
        //alert(jsAlertMessages.cascade_error+output.OUTPUT_SEQ+". "+e.name+" => "+e.message)
      }
    }
  }


  window.status=""
  
}


function getmlov(seq,colSeq,rowSeq){

if(ajaxSubmitFlag?defaultingDisableArr.length>0:defaulting_disable){
g_timeout_id=setTimeout("getmlov("+seq+","+colSeq+","+rowSeq+")",100)
}else{
clearTimeout(g_timeout_id);
if(allDependenciesHasValues(colSeq,rowSeq,seq)==false)
{
alert(getEmptyDependencies(colSeq,rowSeq,seq));
return 
}
var paramstr="x_proc_id="+getprocess()+"&x_seq="+seq+"&x_col_seq="+colSeq+"&x_row_seq="+rowSeq+"&x_col_name="+encodeURIComponent(getLovLabel(colSeq,rowSeq))+"&x_reference="+getreference()+"&x_page_title="+encodeURIComponent(getTitle())+"&pageaction=dogetlist&mlov_delimiter="+getMlovDelimiter(colSeq);
var fv="",loc="";
var multiId=multiIdArr[colSeq-1];
var mr=FormRendererFactory.getRegion(multiId);
if(mr&&(mr.getSorted()==true||mr.getFilterBy()!=false||mr.fetchLovCorrection==true)){
var dependentSeq=getSeq(colSeq,rowSeq);
var dependencySeqArr=getAllDependencies(colSeq,rowSeq);
var dependencyValuesArr=getAllDependencyValues(dependencySeqArr);
if(allOrNothingHasValues(dependencyValuesArr)){
loc+="&out_seq="+dependentSeq;result=true;
for(var k=0;k<dependencySeqArr.length;k++){
fv+=getFieldName(dependencySeqArr[k],getColSeq(dependencySeqArr[k]))+"="+encodeURIComponent(dependencyValuesArr[k])+"&"}
}
paramstr=paramstr+"&"+fv+"x_api=Y"
}

if(dependenciesArr[colSeq-1]!=null && dynaminColumSequence.length>1)
{
  if(!infoletCalled[seq] || infoletCalled[seq]!='1')
 {
    infoletCalled[seq]='1';
   for(depdyn=0; depdyn < dependenciesArr[colSeq-1].length ; depdyn++)
   { 
      
      if(dynaminColumSequence.indexOf('$'+dependenciesArr[colSeq-1][depdyn]+'$') !=-1)
      {
           var dynSeq=dependenciesArr[colSeq-1][depdyn];
           var tmpdep=dependentsArr[dynSeq-1];
            dependentsArr[dynSeq-1]= [colSeq,''];
            var tmpfld = eval('F.'+nameArr[dynSeq-1]);
            cickedLov=seq;
            cickedLovStr=paramstr;
   
            infoletCalled[seq]=0;
            tmpfld.callInfolet(rowSeq);
            dependentsArr[dynSeq-1]=tmpdep;    
      }
   }
   
  }
}
else
{
  infoletCalled[seq]='1';
}
if( infoletCalled[seq] && infoletCalled[seq]=='1')
{
 showPostPopup("Fastmlovpopup?"+paramstr,"instance","MLOVPopup"+seq,650,580,"yes",150,0,"yes","yes");
}

//setTimeout(function(){showPostPopup("Fastmlovpopup?"+paramstr,"instance","MLOVPopup"+seq,650,580,"yes",150,0,"yes","yes");},3000);
}
}

function getlov(seq,colSeq,rowSeq){
if(ajaxSubmitFlag?defaultingDisableArr.length>0:defaulting_disable){
g_timeout_id=setTimeout("getlov("+seq+","+colSeq+","+rowSeq+")",100)
}else{
 clearTimeout(g_timeout_id);
 if(allDependenciesHasValues(colSeq,rowSeq,seq)==false){
 alert(getEmptyDependencies(colSeq,rowSeq,seq));return 
 }
 clearSuggestStuff();
 var paramstr="x_proc_id="+getprocess()+"&x_seq="+seq+"&x_col_seq="+colSeq+"&x_row_seq="+rowSeq+"&x_col_name="+encodeURIComponent(getLovLabel(colSeq,rowSeq))+"&x_reference="+getreference()+"&x_page_title="+encodeURIComponent(getTitle())+"&pageaction=dogetlist";
 var fv="",loc="";var multiId=multiIdArr[colSeq-1];
 var mr=FormRendererFactory.getRegion(multiId);
 if(mr&&(mr.getSorted()==true||mr.getFilterBy()!=false||mr.fetchLovCorrection==true)){
 var dependentSeq=getSeq(colSeq,rowSeq);
 var dependencySeqArr=getAllDependencies(colSeq,rowSeq);
 var dependencyValuesArr=getAllDependencyValues(dependencySeqArr);
 if(allOrNothingHasValues(dependencyValuesArr)){
 loc+="&out_seq="+dependentSeq;result=true;
 for(var k=0;k<dependencySeqArr.length;k++){
 fv+=getFieldName(dependencySeqArr[k],getColSeq(dependencySeqArr[k]))+"="+encodeURIComponent(dependencyValuesArr[k])+"&"
 }
 }
 paramstr=paramstr+"&"+fv+"x_api=Y"
 }

if(dependenciesArr[colSeq-1]!=null && dynaminColumSequence.length>1)
{
  if(!infoletCalled[seq] || infoletCalled[seq]!='1')
 {
   infoletCalled[seq]='1';
   for(depdyn=0; depdyn < dependenciesArr[colSeq-1].length ; depdyn++)
   { 
      if(dynaminColumSequence.indexOf('$'+dependenciesArr[colSeq-1][depdyn]+'$') !=-1)
      {
           var dynSeq=dependenciesArr[colSeq-1][depdyn];
           var tmpdep=dependentsArr[dynSeq-1];
            dependentsArr[dynSeq-1]= [colSeq,''];
            var tmpfld = eval('F.'+nameArr[dynSeq-1]);
            cickedLov=seq;
            cickedLovStr=paramstr;
   
            infoletCalled[seq]=0;
            tmpfld.callInfolet(rowSeq);
            dependentsArr[dynSeq-1]=tmpdep;    
      }
   }
   
  }
}
else
{
  infoletCalled[seq]='1';
}
if( infoletCalled[seq] && infoletCalled[seq]=='1')
{
  
 showPostPopup("Fastlovpopup?"+paramstr,"instance","LOVPopup"+seq,650,580,"yes",150,0,"yes","yes");
}
 //showPostPopup("Fastlovpopup?"+paramstr,"instance","LOVPopup"+seq,650,580,"yes",150,0,"yes","yes")
 }
 }

function renderFloatingArray()
{
  if(storefloat)
  {
     var myhalf = (summaryFields.length - (summaryFields.length%summaryLines))/summaryLines;
    if(summaryFields.length%summaryLines !=0)
    {
       myhalf = myhalf+1;
    }
    var summarycnt=0;
   var datafloat=new Array();
       for(flocol=0; flocol< myhalf; flocol ++ )
       {
              var col1=(flocol*2)+0;
    
              var  col2 = (flocol*2)+1;
            for(sumlines=0; sumlines< summaryLines && summarycnt < summaryFields.length ; sumlines++)
            {
             if(!datafloat[sumlines])
             {
               datafloat[sumlines]=new Array();
             }
             datafloat[sumlines]['floatingcol'+col1]  = summaryFields[summarycnt].getLabel() ;
             datafloat[sumlines]['floatingcol'+col2] = getFieldDisplayValue(summaryFields[summarycnt],1) ;
             summarycnt=summarycnt+1;
            }
        }
    storefloat.loadData(datafloat);
    floatingGrid.getView().refresh();
  }
}

function printForm()
{ 
/*msai_tab_show('MSAI_6','MSAI_7');
msai_tab_show('MSAI_6','MSAI_8');
msai_tab_show('MSAI_6','MSAI_9');
msai_tab_show('MSAI_6','MSAI_10');
msai_tab_show('MSAI_6','MSAI_1389');
       var html= document.body.document.body.innerHTML.toString(); 
       html =html.replace('msai_tab_align','aa');   
       var win = window.open(new Ext.XTemplate(), 'printgrid');
       win.document.write(html);*/
}

function showInfo(val)
{
}

function sortVals(v){
 var n = parseFloat(v);
  return isNaN(n) ? v : n;
}
 function convertVals(v)
 {
   return v;
 }


function getPerfSuffFormat(val,myrow,col){
           var actualtype= col.replace('$').replace('#','');
              var retval=val ;
              var presufindex= actualtype.indexOf('*');
              var pref=-1;
              var suff=-1;
             if(presufindex!=-1)
             {
               if(presufindex==0)
               {
                  pref= actualtype.substr(1,1);
               }
               else
               {
                  suff= actualtype.substr(actualtype.length-1,1);
               }
             }

           var appendpref='';
           var appendsuff='';
           if (pref!=-1)
           {
             appendpref= readprefSuffValue(prefixsuffix[pref],myrow);
           }
           if (suff!=-1)
           {
             appendsuff= readprefSuffValue(prefixsuffix[suff],myrow);
           }   
      if(appendpref!='')
      {
         retval = appendpref + retval;
      }
       if(appendsuff !='')
      {
         retval = retval +appendsuff ;
      }
     return retval ;

}

function getFormattedNumber(val,myrow,col){
    //console.log('sanketh:'+val);
  try{
    var decimalPrecision=2;
              var decimalSeparator='.';
              var thousandSeparatorDigits=3;
              var thousandSeparator=',';
      var neg = null;
      
      //console.log('inside getFormattedNumber before:'+val);

      val = (neg = val < val) ? val* -1 : val;  
      val =  val.toFixed(decimalPrecision) ;
      

      

      var strval = String(val);
        var ps = strval.split('.');
                ps[1] = ps[1] ? ps[1] : null;
                
                var whole = ps[0];

                if(thousandSeparatorDigits==2)
                {
                 var regexp = /(\d+)(\d{3})/;   
                  while (regexp.test(whole)) 
                  {
                    whole = whole.replace(regexp, '$1' + thousandSeparator + '$2' );
                    regexp = /(\d+)(\d{2})/;
                  }
                      if(whole.substr(whole.length-3,1)==thousandSeparator )
                      {
                        var wholeArr=whole.split('');
                        wholeArr.splice(whole.length-3,1);
                        whole = wholeArr.join('');
                      }
                }
                else
                {
                  var regexp = /(\d+)(\d{3})/;    
                  while (regexp.test(whole)) 
                    whole = whole.replace(regexp, '$1' + thousandSeparator + '$2');
                }
          strval = whole + (ps[1] ? decimalSeparator + ps[1] : '');
      
      return String.format('{0}{1}{2}', (neg ? '-' : ''),  strval,'');
        }
       catch(e)
       {
      //console.log(e);
          return '';
       }
    }

function getFormatNumbNoSerparator(val){
   
  try{
    var decimalPrecision=2;
              var decimalSeparator='.';
              var thousandSeparatorDigits=3;
              var thousandSeparator='';
      var neg = null;
      
      val = (neg = val < val) ? val* -1 : val;  
      val =  val.toFixed(decimalPrecision) ;
      
      var strval = String(val);
        var ps = strval.split('.');
                ps[1] = ps[1] ? ps[1] : null;
                
                var whole = ps[0];
         
          strval = whole + (ps[1] ? decimalSeparator + ps[1] : '');
      
      return String.format('{0}{1}{2}', (neg ? '-' : ''),  strval,'');
        }
       catch(e)
       {
      //console.log(e);
          return '';
       }
    } 

function readDisplayedValueCustom(Field, row)
{
try{
   
     if(!row) row=1;

     if(Field.getColumnKind()==3) //Drop Down or Radio Group
     {
        if(!values2dArr[getSeq(Field.sequence,row)-1])
        {
          values2dArr[getSeq(Field.sequence,row)-1]=values2dArr[Field.sequence-1];
          text2dArr[getSeq(Field.sequence,row)-1]=text2dArr[Field.sequence-1];
        }
        for(i=0; i<values2dArr[getSeq(Field.sequence,row)-1].length; i++)
        {
            if(decodeHtmlContent(values2dArr[getSeq(Field.sequence,row)-1][i])== valArr[getSeq(Field.sequence,row)-1])
            {
              
               return decodeHtmlContent(text2dArr[getSeq(Field.sequence,row)-1][i]);
            }
        }
        return Field.read(row);
     }
     else
     {
       if(Field.read(row)!='')
       {
          return Field.readDisplayedValueSilent(row);
       }
       else
       {
          return '';
       }
     }
}
catch(e)
{
   //return Field.read(row);
}
};


function triggerLSMCascading(seq){
        
      beforeCascading(seq);
      var t=new Date().getTime();

     if(ajaxSubmitFlag?defaultingDisableArr.length>0:defaulting_disable){

      setTimeout("triggerLSMCascading("+seq+")",1000);
      return false
      }
      var loc="";
      var fv="";var colSeq=getColSeq(seq);
      var rowSeq=getRowSeq(seq);var result=false;
       if(hasDependents(colSeq)==false){
           return result;
       }
       else
     {

           var dependents=dependentsArr[colSeq-1];
           if(dependents!=null)
       {
                 for(var i=0;i<dependents.length-1;i++)
         {
                     var dependent=dependents[i];
                     if(multiArr[dependent-1]&&!multiArr[colSeq-1])
           {
                          var multiId=multiIdArr[dependent-1]; var no_of_rows=getMultirowRowCount(multiId);
                          for(var j=1;j<=no_of_rows;j++)
                          {
                             var dependentSeq=getSeq(dependent,j);var dependencySeqArr=getAllDependencies(dependent,j);var dependencyValuesArr=getAllDependencyValues(dependencySeqArr);
                              if(allOrNothingHasValues(dependencyValuesArr)){
                                    loc+="&out_seq="+dependentSeq;result=true;
                                    for(var k=0;k<dependencySeqArr.length;k++){
                                          fv+=getFieldName(dependencySeqArr[k],getColSeq(dependencySeqArr[k]))+"="+encodeURIComponent(dependencyValuesArr[k])+"&";
                                    }
                              }
                          }
                     }
                     else
           {
             
              var dependentSeq=getSeq(dependent,rowSeq);
                                        
              var dependencySeqArr=getAllDependencies(dependent,rowSeq);
                                         
              var dependencyValuesArr=getAllDependencyValues(dependencySeqArr);
                                       
              if(allOrNothingHasValues(dependencyValuesArr))
            {
                  loc+="&out_seq="+dependentSeq;result=true;
                  for(var k=0;k<dependencySeqArr.length;k++)
              {
                               fv+=getFieldName(dependencySeqArr[k],getColSeq(dependencySeqArr[k]))+"="+encodeURIComponent(dependencyValuesArr[k])+"&";
                            }
                        }
                      }
                 }
            }
       }
if(result)
{
   loc+="&x_reference="+getreference();loc+="&x_no_of_cols="+no_of_columns;
   if(isSSVEnabled)
   {
      loc+="&origRowSeqJSON="+getOrigRowSeqObjInJSON()
   }
   var tc=new Date().getTime();spliceDefaultingArray("cascade");
   window.status="Cascading field(s) Please wait ..";
   makeJSONAjaxCall("Fastcascader/ajax/Cascade",fv+"&"+loc,false,handleCascadingResponse,handleCascadingError)
}
afterCascading(seq);
return result;
}


function createOptionReturn(OptStr,Field,row)
{
  
    
    var runningSeq=  getSeq(Field.getSequence(),row);

    var leeVal=decodeHtmlContent(valArr[runningSeq-1]);
     
    var drop = OptStr.split(',');
    if(OptStr)
    {
      Field.enable(row); 
      if(!values2dArr[runningSeq-1])
      {
           values2dArr[runningSeq-1]=new Array();
           text2dArr[runningSeq-1]=new Array();
      }
        for(j=0;j<=drop.length-1;j++ )
        {
        
           var optionvals = drop[j].split('@$@');
           if(optionvals[0]!='')
           {
             values2dArr[runningSeq-1][j]=optionvals[0];
             text2dArr[runningSeq-1][j]=optionvals[1];
           } 
        }
          if(F.getFormParameter("edit_flag")!='Y')
          {
            write_picklist(runningSeq,values2dArr[runningSeq-1],text2dArr[runningSeq-1],text2dArr[runningSeq-1].length);
          }
          Field.write(leeVal,row);
   }

   
}


function traverse()
{
     
      for( regtrav=0; regtrav<regionArray.length;regtrav++)
      {
         var colAllarr=getMultirowColSeqs(regionArray[regtrav].id);
         var travneed=0;
         var colarr=new Array();
         for(dropcnt=0;dropcnt<colAllarr.length;dropcnt++)
         {
            if(kindArr[colAllarr[dropcnt]-1]==3)
            {
              colarr[colarr.length]=colAllarr[dropcnt];
            }
         }

         /*if( !dispdone[gridTravRegions.indexOf(regionArray[regtrav].name)] )
         {*/
           for(rowtrav=1;rowtrav<=regionArray[regtrav].getRowCount();rowtrav++)
           {
             
              if(regionArray[regtrav].isMarkedForDeletion(rowtrav))
              {
                continue;
              }
              else
              {
                
                for(coltrav=0;coltrav<colarr.length;coltrav++)
                {
                     var colSeq=colarr[coltrav];                     
                     var fld = eval('F.'+nameArr[colSeq-1]);
                     
                     if(/*kindArr[colSeq-1]==3 &&*/ fld.read(rowtrav)!='')
                     {
                        
                         var seq=getSeq(colSeq,rowtrav);

                        if( (!text2dArr[seq-1] || text2dArr[seq-1].length == 0) && (!getRef('id'+seq) || !getRef('id'+seq).options || getRef('id'+seq).options.length<=1) )
                        {
                          travneed=1;


                          createOptionReturn(decodeHtmlContent(fld.read(rowtrav))+'@$@'+decodeHtmlContent(fld.read(rowtrav)),fld,rowtrav);
                          fld.writeValue(fld.read(rowtrav),fld.read(rowtrav),rowtrav);
                        }




                  
                    }
               }
               
             }
             if(travneed==1)
             {
                  if(regionArray[regtrav].rowsPerPage==1)
                  {
                     goSingleDirect(regionArray[regtrav].id,rowtrav);
                  }
                  else
                  {
                    if(regionArray[regtrav].getRowCount()==rowtrav)
                    {
                      //goDirect(regionArray[regtrav].id,rowtrav);
                    }
                  }
            }
          }
      /*} */ 
     }
}

/*
function triggerCascading(seq){
     triggerLSMCascading(seq);
}
*/

</script>