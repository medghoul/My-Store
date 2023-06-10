import {CartModel} from "../shared/Cart.model";

export  class Product{
  public name:string;
  public description:string;
  public imageUrl:string;
  public price:number;


  constructor(name: string, description: string, imageUrl: string, price: number) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

}
