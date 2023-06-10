import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error:string=null;
  @ViewChild('form')form:NgForm
  onSwitchMode() {
    this.isLoginMode=!this.isLoginMode
  }


  constructor(private authService: AuthService,private router:Router) {
  }


  onSubmit(form: NgForm) {
    if (!this.form.valid){
        return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs:Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLoginMode) {
        authObs=this.authService.login(email,password)
    }
    else {
      this.authService.signup(email,password).subscribe(  resData => {
        console.log(resData);
        this.isLoading=false;
      },errorMessage => {
        console.log(errorMessage)
        this.error=errorMessage;
        this.isLoading=false;
      } )
    }
    authObs.subscribe(resData => {
        console.log(resData);
        this.isLoading=false;
        this.router.navigate(['/products'])
    },errorMessage => {
        console.log(errorMessage)
        this.error=errorMessage;
        this.isLoading=false;
    })
    form.reset()
  }
}
