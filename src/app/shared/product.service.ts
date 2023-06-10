import {Injectable} from '@angular/core';
import {Product} from "../product/product.model";
import {ShoppingListService} from "./shopping-list.service";
import {CartModel} from "./Cart.model";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    productEventChanged = new Subject<Product[]>()
    startedEditing = new Subject<number>()

    constructor() {
    }

 /*   private products: Product[] = [
        new Product('Apple iPhone 13', 'Apple iPhone 13 128GB Mezzanotte', 'https://static1.unieuro.it/medias/sys_master/root/hab/he9/33055695667230/-api-rest-00ed29448a7522f610cac04d7b9ea7e0-assets-79d044c6fea02d6e7a9b3db78224d824-preview-sgmConversionBaseFormat.jpg', 799.00),
        new Product('Apple Watch Series 8 ', 'Apple Watch Series 8 GPS 41mm Cassa in Alluminio color Mezzanotte con Cinturino Sport Band Mezzanotte - Regular', 'https://static1.unieuro.it/medias/sys_master/root/h70/h3d/34364491202590/-api-rest-00ed29448a7522f610cac04d7b9ea7e0-assets-2335ec96b1c552a4abd56b8fd6e475db-preview-sgmConversionBaseFormat.jpg', 439.00),
        new Product('Acer Aspire 3', 'Acer Aspire 3 A315-24P-R2KM 7520U Computer portatile 39,6 cm (15.6") Full HD AMD Ryzen™ 5 8 GB DDR5-SDRAM 512 GB SSD Wi-Fi 6 (802.11ax) Windows 11 Home Argento', 'https://static1.unieuro.it/medias/sys_master/root/h94/h5d/35018026811422/-api-rest-00ed29448a7522f610cac04d7b9ea7e0-assets-70665a706568a877a83bada7228eecba-preview-sgmConversionBaseFormat.jpg', 499.90)
    ];*/
    private products: Product[] =[];
    getProducts() {
        return this.products.slice()
    }

    getProduct(index: number) {
        return this.products[index];
    }

    addProduct(newProduct: Product) {
        this.products.push(newProduct);
        this.productEventChanged.next(this.products.slice());
    }

    updateProduct(editedItemIndex: number, newProduct: Product) {
        console.log(newProduct, editedItemIndex)
        this.products[editedItemIndex] = newProduct;
        this.productEventChanged.next(this.products.slice());
    }

    deleteProduct(index: number) {
        this.products.splice(index,1);
        this.productEventChanged.next(this.products.slice());

    }

    setProducts(products: Product[]) {
        this.products = products;
        this.productEventChanged.next(this.products.slice());
    }
}
