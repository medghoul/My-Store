import {EventEmitter, Injectable} from '@angular/core';
import {CartModel} from "./Cart.model";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    productEventChanged = new Subject<CartModel[]>()
    startedEditing = new Subject<number>()
    private cart: CartModel[] = [
        new CartModel('Iphone 13', 1),
        new CartModel('Iphone 12 Pro', 1),
    ]

    constructor() {
    }

    getShoppingList() {
        return this.cart.slice()
    }

    getProductFromList(index: number) {
        return this.cart[index]
    }

    addProductToList(productSelected: CartModel[]) {
        this.cart.push(...productSelected)
        this.productEventChanged.next(this.cart.slice())
    }

    addProduct(newProduct: CartModel) {
        this.cart.push(newProduct);
        this.productEventChanged.next(this.cart.slice());
    }

    deleteProduct(index: number) {
        this.cart.splice(index, 1);
        this.productEventChanged.next(this.cart.slice())
    }

    updateProduct(index: number, newProduct: CartModel) {
        this.cart[index].name = newProduct.name;
        this.cart[index].amount = newProduct.amount;
    }
}
