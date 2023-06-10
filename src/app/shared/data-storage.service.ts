import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "./product.service";
import {Product} from "../product/product.model";
import {AuthService} from "../auth/auth.service";
import {exhaustMap, take, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {


    constructor(private http: HttpClient, private productService: ProductService, private authService: AuthService) {
    }

    storeProducts() {
        const products = this.productService.getProducts();
        this.http.put('https://angular-app-384d0-default-rtdb.firebaseio.com/products.json' + this.authService, products)
            .subscribe(
                response => {
                    console.log(response)
                }
            )
    }

    fetchProducts() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            console.log(user.token)
                return this.http.get<Product[]>('https://angular-app-384d0-default-rtdb.firebaseio.com/products.json?auth=' + user.token)
            }),
            tap(
                products => {
                    this.productService.setProducts(products)
                }
            ))
    }

}