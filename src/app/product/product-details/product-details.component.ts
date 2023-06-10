import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../product.model";
import {ProductService} from "../../shared/product.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ShoppingListService} from "../../shared/shopping-list.service";
import {CartModel} from "../../shared/Cart.model";

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    productDetails: Product;
    id: number;
    productIndex:number;


    constructor(private productService: ProductService,
                private route: ActivatedRoute,
                private router: Router,
                private shoppingList: ShoppingListService) {
    }

    onAddToShoppingList() {
        this.shoppingList.addProduct(new CartModel(this.productDetails.name,1))
    }
    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.productIndex=this.id;
                this.productDetails = this.productService.getProduct(this.id);
            }
        )
    }

    onEditProduct() {
        this.router.navigate(['edit'], {relativeTo: this.route})
        // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})

    }

    onDeleteProduct() {
        this.productService.deleteProduct(this.productIndex);
        this.router.navigate(['/products'])
    }
}
