/*
import {Injectable} from "@angular/core";
import {ProductService} from "../shared/product.service";
import {DataStorageService} from "../shared/data-storage.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Product} from "./product.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductsResolverService implements Resolve<Product[]> {
    constructor(
        private productService: ProductService,
        private dataStorageService: DataStorageService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const products = this.productService.getProducts();
        if (products.length === 0) {
            return this.dataStorageService.fetchProducts()
        } else {
            return products
        }
    }


}*/
