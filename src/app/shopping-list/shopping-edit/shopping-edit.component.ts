import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../shared/product.service";
import {Product} from "../../product/product.model";
import {CartModel} from "../../shared/Cart.model";
import {ShoppingListService} from "../../shared/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{
    editMode = false;
    @ViewChild('form')form: NgForm;
    editedItemIndex:number;
    editedItem:CartModel;
    subscription:Subscription


    constructor(private shoppingService: ShoppingListService) {
    }

    onAddItem() {
        const value = this.form.value;
        const newProduct = new CartModel(value.name, value.amount)
        if(this.editMode){
            this.shoppingService.updateProduct(this.editedItemIndex,newProduct);
            this.form.reset();
            this.editMode=false;
        }else {
            this.shoppingService.addProduct(newProduct);
            this.form.reset();
            this.editMode=false;
        }
    }

    onDelete() {
        this.shoppingService.deleteProduct(this.editedItemIndex);
        this.form.reset();
        this.editMode=false;
    }

    ngOnInit(): void {
        this.subscription=this.shoppingService.startedEditing.subscribe(index=>{
            this.editedItemIndex=index;
            this.editMode=true;
            this.editedItem=this.shoppingService.getProductFromList(index);
            this.form.setValue({
                name:this.editedItem.name,
                amount:this.editedItem.amount
            })
        })
    }
}
