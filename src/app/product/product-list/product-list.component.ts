import {Component, OnInit } from '@angular/core';
import {Product} from "../product.model";
import {ProductService} from "../../shared/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products:Product[]
  constructor(private productService:ProductService,
              private router:Router,
              private route:ActivatedRoute) {
  }
 ngOnInit() {
      this.productService.productEventChanged.subscribe((products:Product[])=>{
        this.products=products;
      })
    this.products=this.productService.getProducts()
   console.log(this.products)
 }


  onNewProduct() {
    this.router.navigate(['new'],{relativeTo:this.route})
  }
}
