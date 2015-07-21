package com.metricstream.systemi.client.servlet.servant;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.metricstream.log.Logger;
import com.metricstream.systemi.interfaces.ConnectionPool;
//import com.metricstream.systemi.searchUX.helper.DMSSearchUXHelper;
import com.metricstream.systemi.server.common.Controller;
import com.metricstream.systemi.sql.SQLHelper;
import java.io.PrintStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.xml.bind.JAXBException;

public class Risktree extends BaseFormProcessor
{
  private static final long serialVersionUID = 1L;
  private static final String CLASS_ID = "Dmscategorytree";
  private static final String NAME = "name";
  private static final String RESULT_ID = "result_id";
  private static final String PATH = "PATH";
  private static final String TYPE = "TYPE";
  private static final String NODE_ID = "node_id";
  private static final String PARENT_ID = "parent_id";
  private static final String FST_CHILD_ID = "first_child_id";
  private static String STRING_DOCUMENT_TAB = "No";
  private static final String DOCUMENT_TAB = "DocumentsTab";
  private String criteria;
  private String selectedIDS;

  
  public Risktree()
  {
    setUseWrapper(false);
  }

  public ArrayList<ArrayList> produceexpandPathData() throws ClassNotFoundException
  {
	  String query = "";
	    ArrayList<String> resultSetArray_id = new ArrayList<String>();
	    ArrayList<String> resultSetArray_name = new ArrayList<String>();
	    ArrayList<ArrayList> final_list = new ArrayList<ArrayList>();
	  query="SELECT '\"'  ||ORG_ENTITY_NAME_PATH  ||'\"' AS Org_name,  '\"'  ||REPLACE( (SUBSTR(ORG_ENTITY_ID_PATH,2)), 'RISK-' )  ||'\"' ORG_ENTITY_ID_PATH FROM  (SELECT object_name                   AS ORG_ENTITY_NAME_PATH,    SYS_CONNECT_BY_PATH(object_id, '/') AS ORG_ENTITY_ID_PATH,    object_id,    PARENT_ID  FROM MS_GRC_RISK_TREE_VIEW    START WITH object_level   = 1    CONNECT BY PRIOR object_id=PARENT_ID  )";
	  Connection con = null;
      Controller controller = null;
      PreparedStatement ps = null;
      ResultSet rs = null;
      try
      {
       
        controller = Controller.getThis();
        con = controller.getPrivateConnectionPool().getConnection("Dmscategorytree");
        ps = con.prepareStatement(query);
        rs = ps.executeQuery();
        
        while (rs.next()) {
        	resultSetArray_id.add(rs.getString(1)); 
	    	resultSetArray_name.add(rs.getString(2)); 		    	
		        }
	    final_list.add(resultSetArray_id);
	    final_list.add(resultSetArray_name);
      }
      catch (SQLException e)
      {
        e.printStackTrace();
      } 
      finally
      {
        if (rs != null) {
          SQLHelper.closeAll(rs);
        }
        if (ps != null) {
            try {
            	ps.close();
            } catch (SQLException e) {
            	e.printStackTrace();
            }
        }
        Controller.getThis().getPrivateConnectionPool().returnConnection(con);
      }

    return final_list;
  }

  public ArrayList<String> producedeadNodesPathData() throws ClassNotFoundException
  {
	  String query = "";
	    ArrayList<String> resultSetArray_id = new ArrayList<String>();
	   // ArrayList<String> resultSetArray_name = new ArrayList<String>();
	    //ArrayList<ArrayList> final_list = new ArrayList<ArrayList>();
	    //String[] final_list;
	  query="SELECT REPLACE( (SUBSTR(ORG_ENTITY_ID_PATH,2)), 'RISK-' )ORG_ENTITY_ID_PATH FROM   (SELECT     SYS_CONNECT_BY_PATH(object_id, '/') AS ORG_ENTITY_ID_PATH   FROM MS_GRC_RISK_TREE_VIEW  where object_id in (Select a.Object_id From Ms_Grc_Risk A,Ms_Grc_Risk_Pri B Where A.Object_Id = B.Object_Id(+) and SYSDATE NOT BETWEEN NVL(a.VALID_FROM,sysdate) AND (a.VALID_UNTIL)  Start With  A.Object_Level=1 Connect By Prior A.Object_Id=B.Pri_Object_Parent)    START WITH object_level   = 1    CONNECT BY PRIOR object_id=PARENT_ID  )";
	  Connection con = null;
      Controller controller = null;
      PreparedStatement ps = null;
      ResultSet rs = null;
      try
      {
    	  Logger.debug("Test the dead node", "query--->" + query, null);
        
        controller = Controller.getThis();
        con = controller.getPrivateConnectionPool().getConnection("Dmscategorytree");
        ps = con.prepareStatement(query);
        rs = ps.executeQuery();
       
        while (rs.next()) {
        	resultSetArray_id.add(rs.getString(1));
        	Logger.debug("Test the dead node", "Node" + rs.getString(1), null);
	    	//resultSetArray_name.add(rs.getString(2)); 		    	
		        }
	   // final_list.add(resultSetArray_id);
	   // final_list.add(resultSetArray_name);
      }
      catch (SQLException e)
      {
        e.printStackTrace();
      }   
      finally
      {
        if (rs != null) {
          SQLHelper.closeAll(rs);
        }
        if (ps != null) {
            try {
            	ps.close();
            } catch (SQLException e) {
            	e.printStackTrace();
            }
        }
        Controller.getThis().getPrivateConnectionPool().returnConnection(con);
      }

    return resultSetArray_id;
  }

  public String produceMessageData()
  {
    this.selectedIDS = getStringParameterValue("selectedIDS", null, 0);
    String query = "";
    Map selectedMap = new HashMap();
    Map data1 = new HashMap();
    HashMap result = new HashMap();
    List jsonList = new ArrayList();
    query = "SELECT SUBSTR(ORG_ENTITY_NAME_PATH,2),  REPLACE(DECODE(PARENT_ID,NULL,PARENT_ID,PARENT_ID), 'RISK-' )PARENT_ORG_ENTITY_ID,  SUBSTR(object_id,6) AS ORG_ENTITY_ID,  REPLACE( (SUBSTR(ORG_ENTITY_ID_PATH,2)), 'RISK-' ) ORG_ENTITY_ID_PATH FROM  (SELECT SYS_CONNECT_BY_PATH(object_name, '/') AS ORG_ENTITY_NAME_PATH,    SYS_CONNECT_BY_PATH(object_id, '/')         AS ORG_ENTITY_ID_PATH,    object_id,    PARENT_ID  FROM MS_GRC_RISK_TREE_VIEW    START WITH object_level        = 1    CONNECT BY PRIOR object_id =PARENT_ID  )";

    Logger.debug("Dmschecktree", "query" + query, null);
    String returnString = createJsonString(query, "MessageData");

    if (!this.selectedIDS.equalsIgnoreCase("empty"))
    {/*
      Logger.debug("Dmschecktree inside if selectedIDS", this.selectedIDS, null);
      String[] selectedIDSArray = this.selectedIDS.split(",");
      String firstPart = "\"ID\":\"";
      String lastPart = "\"";

      for (int w = 0; w < selectedIDSArray.length; ++w)
      {
        String ids = firstPart + selectedIDSArray[w] + lastPart;
        System.out.println("FINAL " + ids);

        int index = returnString.indexOf(ids);

        int childrenText = returnString.indexOf("\"children\"", index + 1);
        int childrenTextEnd = childrenText + 8;

        int childCheckIndex = 0;
        String childrenTextMatch = "";
        int parentCheckIndex = 0;
        String check = "";
        if (index == -1)
          continue;
        if (childrenText != -1)
        {
          if (childrenText - index < 20)
          {
            for (int k = childrenText; k < childrenTextEnd; ++k)
            {
              childrenTextMatch = childrenTextMatch + returnString.charAt(k);
            }

            int temp = 0;

            for (int k = index; k > 0; --k)
            {
              temp = k;

              Character s = Character.valueOf(returnString.charAt(k));
              String j = s.toString();
              if (j.equalsIgnoreCase("|"))
              {
                break;
              }

            }

            for (int x = temp + 1; x < returnString.length(); ++x)
            {
              Character a = Character.valueOf(returnString.charAt(x));

              if (a.toString().equalsIgnoreCase("\""))
              {
                break;
              }

              check = check + a.toString();
            }

          }

          if (childrenTextMatch.equalsIgnoreCase("children"))
          {
            String[] arr = check.split("\\^");
            String checkingString = "";

            if (arr.length == 1)
            {
              checkingString = "|" + selectedIDSArray[w] + "^";
            }
            else if (arr.length > 1)
            {
              checkingString = "^" + selectedIDSArray[w] + "^";
            }

            int temp1 = returnString.lastIndexOf(checkingString);
            String check1 = "";
            for (int k = temp1 + 1; k < returnString.length(); ++k)
            {
              Character c = Character.valueOf(returnString.charAt(k));
              if (c.toString().equalsIgnoreCase("\""))
              {
                break;
              }

              check1 = check1 + returnString.charAt(k);
            }

            String[] arr2 = check1.split("\\^");
            int arr2Length = arr2.length;
            int temp2 = 0;

            for (int k = 0; k < arr2.length; ++k)
            {
              if (!arr2[k].equalsIgnoreCase(selectedIDSArray[w]))
                continue;
              int counter = arr2.length - k;
              int temp3 = temp1;
              for (int loop = 0; loop < counter; ++loop)
              {
                temp2 = returnString.indexOf("checked", temp3);
                temp3 = temp2 + 1;
              }

            }

            parentCheckIndex = temp2;
            parentCheckIndex += 9;
            returnString = returnString.substring(0, parentCheckIndex) + "true" + returnString.substring(parentCheckIndex + 5, returnString.length());
          }
          else
          {
            childCheckIndex = returnString.indexOf("checked", index + 1);
            returnString = returnString.substring(0, childCheckIndex + 9) + "true" + returnString.substring(childCheckIndex + 14, returnString.length());
          }
        }
        else
        {
          childCheckIndex = returnString.indexOf("checked", index + 1);
          returnString = returnString.substring(0, childCheckIndex + 9) + "true" + returnString.substring(childCheckIndex + 14, returnString.length());
        }

        System.out.println(returnString);
      }

    */}

    return returnString;
  }

  private int getIntParameterValue(String string, Object object, int i)
  {
    return 0;
  }

  String getCancelPage()
  {
    return getSubmitPage();
  }

  HashMap producePageData()
  {
    HashMap res = getSessionData();

   /* String query = "select substr(ORG_ENTITY_NAME_PATH,2),decode(PARENT_ORG_ENTITY_ID,1,null,PARENT_ORG_ENTITY_ID) PARENT_ORG_ENTITY_ID,org_entity_id,substr(ORG_ENTITY_ID_PATH,2) ORG_ENTITY_ID_PATH  from (select SYS_CONNECT_BY_PATH(ORG_ENTITY_NAME, '/') as ORG_ENTITY_NAME_PATH, SYS_CONNECT_BY_PATH(ORG_ENTITY_ID, '/') as ORG_ENTITY_ID_PATH,org_entity_id,PARENT_ORG_ENTITY_ID  from  SI_ORG_ENTITY_HIER_BRC_V start with org_level = 1  CONNECT BY PRIOR ORG_ENTITY_ID =PARENT_ORG_ENTITY_ID )";

    Logger.debug("Dmschecktree", "query-------------------------- " + query, null);
    String strJsonString = createJsonString(query, "ProducePageData");
    String mystring = strJsonString.toString();
    Logger.debug("Dmschecktree", "Shail------------------------ " + mystring, null);
    res.put("tree", strJsonString);*/
    return res;
  }

  public String produceDocumentsTabData()
  {
    String query = "";

    Logger.debug("Dmschecktree", "query::::::::::::::::::::::::::::::::::: " + query, null);

    return createJsonString(query, "DocumentsTab");
  }

  HashMap validateFormData()
  {
    return null;
  }

  String getTemplateName()
  {
    String strTemplateName = null;

    strTemplateName = "MS_BRC/MS_RISK_TREE.htmp";

    return strTemplateName;
  }

  String getSubmitPage()
  {
    return "";
  }
  String createJsonString(String query, String invoker) {
    Logger.debug("Dmschecktree", "Inside createJsonString()", null);
    Connection connection = null;
    Controller controller = null;
    controller = Controller.getThis();
    PreparedStatement ps = null;
    ResultSet rs = null;
    ArrayList lstNodeList = new ArrayList();
    String strJsonString = "";
    try
    {
      Integer NoOfChildren = Integer.valueOf(0);
      Gson gson = new GsonBuilder().disableHtmlEscaping().create();
      connection = controller.getPrivateConnectionPool().getConnection("Dmscategorytree");

      connection.setAutoCommit(false);
      Logger.debug("Dmscategorytree", "inside the Category Tree " + query, null);
      ps = connection.prepareStatement(query);
      rs = ps.executeQuery();
      int i = 0;
      while (rs.next())
      {
        HashMap hsNodeDetails = new HashMap();
        String cat_name_path = rs.getString(1);

        String result_id = rs.getString(1).replace("/", "^");
        String cat_id_path = rs.getString(4);
        String[] catname = null;
        String[] catid = null;
        String type = "";
        String cat_id_path_for_tree_expand = "";
        StringBuilder path = new StringBuilder();
        catname = cat_name_path.split("/");
        cat_id_path_for_tree_expand = cat_id_path;
        catid = cat_id_path.split("/");

        cat_id_path = cat_id_path.replace("/", "^");
        int cat_name_len = catname.length;

        for (int j = 0; j < catname.length - 1; ++j) {
          path.append(catname[j]).append("->");
        }

        if (cat_name_len == 1) {
          type = "CATEGORY";
          NoOfChildren = Integer.valueOf(0);
        }
        else if (cat_name_len > 1) {
          int ist = cat_name_len - 1;
          type = "SUB_CATEGORY" + ist;
          NoOfChildren = Integer.valueOf(ist);
        }

        hsNodeDetails.put("name", catname[(cat_name_len - 1)]);
        hsNodeDetails.put("node_id", catid[(cat_name_len - 1)]);
        hsNodeDetails.put("first_child_id", rs.getString(3));
        hsNodeDetails.put("result_id", result_id);
        hsNodeDetails.put("parent_id", rs.getString(2));
        hsNodeDetails.put("TYPE", type);
        hsNodeDetails.put("NoOfChildren", NoOfChildren);
        hsNodeDetails.put("PATH", path.toString());
        hsNodeDetails.put("exppath", cat_id_path_for_tree_expand);
        hsNodeDetails.put("VALUE", result_id + "|" + cat_id_path);

        ++i;

        lstNodeList.add(hsNodeDetails);
      }

      if (lstNodeList != null) {
        ControlTreeTravers treeTravers = new ControlTreeTravers(lstNodeList, false, true);

        ArrayList arrListNodeIds = treeTravers.getGroupNodeIds();
        strJsonString = gson.toJson(arrListNodeIds);
        Logger.debug("Dmschecktree selectedATTR", "inside selectedATTR " + this.criteria, null);
        Logger.debug("Dmschecktree selectedIDS", this.selectedIDS, null);
      }

      Logger.debug("Dmschecktree", "strJsonString :" + strJsonString, null);
      Logger.debug("Dmschecktree", "query value :" + query, null);
    }
    catch (SQLException e) {
      Logger.error("Dmschecktree", "SQLException  :" + e, null);

      return null;
    }
    finally
    {
      if (rs != null) {
        SQLHelper.closeAll(rs);
      }
      Controller.getThis().getPrivateConnectionPool().returnConnection(connection);
    }

    return strJsonString;
  }

  public String produceCategoryTreeXmlData() throws JAXBException {
    String query = "select substr(attrib,2),parent_id,attribute_id,substr(attrib_conc, 2) attrib_conc from (select SYS_CONNECT_BY_PATH(ATTRIBUTE_NAME, '/') as attrib, TREESTRUCT_ATTRIBUTE_NAME,parent_id,attribute_id ,SYS_CONNECT_BY_PATH(attribute_id, '/') as attrib_conc from MS_PMI_ATTR_TREESTRUCT where TREESTRUCT_ATTRIBUTE_NAME = '" + this.criteria + "' start with attribute_level =1 connect by prior attribute_id = parent_id)  order by 1";

    Logger.debug("Dmschecktree", "Query to get Category node list for SearchUX : " + query, null);

    String categoryXmlStr = null;
    List categoryList = getCategoryNodeList(query);
    Logger.debug("Dmschecktree", "categoryList list for SearchUX : " + categoryList, null);

    if (categoryList != null) {
    }
    return categoryXmlStr;
  }

  private List<HashMap<String, String>> getCategoryNodeList(String query)
  {
    Connection con = null;
    Controller controller = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    controller = Controller.getThis();
    List lstNodeList = new ArrayList();
    try {
      con = controller.getPrivateConnectionPool().getConnection("Dmscategorytree");
      ps = con.prepareStatement(query);
      rs = ps.executeQuery();
      while (rs.next()) {
        HashMap hsNodeDetails = new HashMap();
        String cat_name_path = rs.getString(1);
        String cat_id_path = rs.getString(4);
        String[] catname = null;
        String[] catid = null;
        String type = "";
        StringBuilder path = new StringBuilder();
        catname = cat_name_path.split("/");
        catid = cat_id_path.split("/");

        int cat_name_len = catname.length;

        if (cat_name_len == 1)
          type = "CATEGORY";
        else if (cat_name_len == 2)
          type = "SUB_CATEGORY1";
        else if (cat_name_len == 3)
          type = "SUB_CATEGORY2";
        else if (cat_name_len == 4)
          type = "SUB_CATEGORY3";
        else if (cat_name_len == 5) {
          type = "SUB_CATEGORY4";
        }

        hsNodeDetails.put("name", catname[(cat_name_len - 1)]);
        hsNodeDetails.put("cat_id", rs.getString(3));
        hsNodeDetails.put("parent_id", rs.getString(2));
        hsNodeDetails.put("type", type);
        hsNodeDetails.put("cat_name_path", cat_name_path);

        hsNodeDetails.put("cat_id_path", cat_id_path);

        lstNodeList.add(hsNodeDetails);
      }
    }
    catch (SQLException e) {
      Logger.error("Dmschecktree", "SQLException  :" + e.getMessage(), e);
    } finally {
      if (ps != null) {
        try {
          ps.close();
        } catch (SQLException e) {
          e.printStackTrace();
        }
      }
      if (rs != null) {
        SQLHelper.closeAll(rs);
      }

      Controller.getThis().getPrivateConnectionPool().returnConnection(con);
    }

    return lstNodeList;
  }
}