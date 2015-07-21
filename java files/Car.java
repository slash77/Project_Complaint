package stApp;
//import java.util.*;
public class Car {
	

    public String brand;

    public Car(String theBrand) {
        this.brand = theBrand;
    }
    
    
    public String getBrand() {
        return this.brand;
    }
    
    
	public static void main(String[] xyz)
	{	
		Car ob= new Car("audi");
		System.out.println("sup");
		String a = ob.getBrand();
		System.out.println(a);
	}
		
    
    
}