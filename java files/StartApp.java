package stApp;

import java.util.Arrays;

public class StartApp {

		public static void main(String[] xyz)
		{
			System.out.println("sup");
			/*	
			double no1 = 100;
			double no2 = 8;

			double result = no1 / no2;
			System.out.println(result);
		
		int [] fc=new int[10];
		for (int i= 0;i<fc.length;i++)
		{
			fc[i]= i;
		}
		for (int i= 0;i<fc.length;i++)
		{
			System.out.println(fc[i]);
		}

		int[][] b=new int[2][4];
		
		b[0][2]=4;
		
		
		for (int i=0;i<b.length;i++)
		{
			for(int j=0;j<b[i].length;j++)
			{
				System.out.println(b[i][j]);
			}
		}
		
	public void removeFromArr(int[] arr, int ind)
	{
		
		for (int i=ind;i<arr.length-1;i++)
		{	
			arr[i]=arr[i+1];
		}
	}
	
	

	int[] u=new int[10];
	
	Arrays.fill(u, 123);
	
	u[0]=2;
	u[2]=6;
	u[7]=1;
	
	for(int i=0;i<u.length;i++)
	{
		System.out.println(u[i]);
	}

	String one   = "aaa";
	String two   = "def";
	String three = "abd";

	System.out.println( one.compareTo(two)   );
	System.out.println( one.compareTo(three) );
	
	
	//int d= 786;
	Integer d= new Integer(786);
	String ot= d.toString();
	System.out.println( ot);
	
	
	int amount = 10;

	switch(amount) {
	    case     0 : System.out.println("amount is  0"); break;
	    case     5 : System.out.println("amount is  5"); break;
	    case    10 : System.out.println("amount is 10"); break;
	    default    : System.out.println("amount is something else");
	}
		*/
	//for each loop
//Syntax  for(data_type var:array)			
	int n=0;
	int[] m=new int[9];
	Arrays.fill(m,4);
	m[4]=5;
	m[6]=5;
	m[5]=5;
	for(int k:m)
	{
		if (!(k==4))
		{
			//System.out.println(m[k]);
			continue;
		}
		
		n+=1;
	}
	
	System.out.println("the count:"+n);
	
}}









//string.indexOf("xyz")
//string.substring(STRTindx,ENDindx)
//trim()--white space
//replace()-- all with 'string.'
//split
//charAt('NUM')
//toUpperCase()
//toLowerCase()
