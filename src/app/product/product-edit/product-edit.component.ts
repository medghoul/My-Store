import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../product.model";
import {ProductService} from "../../shared/product.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
    id: number;
    editMode = false;
    editedItemIndex: number;
    subscription: Subscription;
    private editedItem: Product;
    productForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private productService: ProductService) {
    }
    initForm(){
        let name='';
        let description='';
        let imageUrl='';
        let price;
        if(this.editMode){
            const product=this.productService.getProduct(this.id);
            this.editedItemIndex=this.id;
            name=product.name;
            description=product.description;
            imageUrl=product.imageUrl;
            price=product.price;
        }
        this.productForm=new FormGroup({
            'name':new FormControl(name,Validators.required),
            'description':new FormControl(description,Validators.required),
            'imageUrl':new FormControl(imageUrl,Validators.required),
            'price':new FormControl(price,Validators.required)
        })
        }


    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.editMode = params['id'] != null;
                this.initForm();
            }
        )
    }


    onAddNewProduct() {
        const newProduct = new Product(this.productForm.value['name'], this.productForm.value['description'], this.productForm.value['imageUrl'], this.productForm.value['price']);
        if (this.editMode) {
            this.productService.updateProduct(this.editedItemIndex, newProduct);
            this.productForm.reset();
            this.editMode = false;
        } else {
            console.log(newProduct);
            this.productService.addProduct(newProduct);
            this.productForm.reset();
            this.editMode = false;
        }
    }

    protected readonly onsubmit = onsubmit;

    onSubmit() {
     console.log(this.productForm)
        this.onAddNewProduct();
    }
}
