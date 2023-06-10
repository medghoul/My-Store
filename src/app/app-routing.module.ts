import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductComponent} from "./product/product.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {ProductStartComponent} from "./product/product-start/product-start.component";
import {ProductDetailsComponent} from "./product/product-details/product-details.component";
import {ProductEditComponent} from "./product/product-edit/product-edit.component";
import {AuthComponent} from "./auth/auth.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/products',pathMatch:'full'},
  {path: 'products', component: ProductComponent, children:[
      {path:'',component:ProductStartComponent},
      {path:'new',component:ProductEditComponent},
      {path:':id',component:ProductDetailsComponent},
      {path:':id/edit',component:ProductEditComponent}
    ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent},
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule {

}
