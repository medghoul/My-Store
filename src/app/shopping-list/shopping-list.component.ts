import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartModel} from "../shared/Cart.model";
import {ShoppingListService} from "../shared/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{
  cart: CartModel[];
  private igChangeSub:Subscription
  constructor(private shoppingList: ShoppingListService) {
  }

  ngOnInit() {
    this.cart = this.shoppingList.getShoppingList();
    this.igChangeSub=this.shoppingList.productEventChanged.subscribe(
      (cart:CartModel[])=>{
        this.cart=cart;
      }
    )
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingList.startedEditing.next(index)
  }
}
