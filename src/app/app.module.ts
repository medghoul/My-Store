import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ProductComponent} from './product/product.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductDetailsComponent} from './product/product-details/product-details.component';
import {ProductItemComponent} from './product/product-item/product-item.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {ProductService} from "./shared/product.service";
import {ShoppingListService} from "./shared/shopping-list.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {ProductStartComponent} from './product/product-start/product-start.component';
import {ProductEditComponent} from './product/product-edit/product-edit.component';
import { AuthComponent } from './auth/auth.component';
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ShoppingListComponent,
        ProductComponent,
        ProductListComponent,
        ProductDetailsComponent,
        ProductItemComponent,
        ShoppingEditComponent,
        DropdownDirective,
        ProductStartComponent,
        ProductEditComponent,
        AuthComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [ProductService, ShoppingListService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
