import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
    private userSub:Subscription;
    isAuthenticated=false;

    constructor(private dataStorageService:DataStorageService,private authService:AuthService) {
    }

    onSaveData() {
        this.dataStorageService.storeProducts()
    }
    onFetchData(){
        this.dataStorageService.fetchProducts().subscribe();
    }

    ngOnInit(): void {
      this.userSub=  this.authService.user.subscribe(user => {
            console.log(user)
            this.isAuthenticated=!!user;
            console.log(!user)
            console.log(!!user)
        })
        }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onLogout() {
    }
}
