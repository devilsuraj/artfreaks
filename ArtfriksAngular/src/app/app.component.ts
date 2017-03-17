import { JwtHelper } from 'angular2-jwt';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import {authservice} from './services/account/accountservice';
import { Router } from '@angular/router';
import { logModel, registerModel, token, Regresult, result, ChangePasswordViewModel, parmmode } from './models/account/authmodel';
import { AuthLoginService, SharedUserDetailsModel } from './services/account/shareduserdetails';
import { Subscription } from 'rxjs/Subscription';
import * as Materialize from "angular2-materialize";
@Component({
  selector: 'body',
templateUrl:'./app/app.component.html'
  
})
export class AppComponent  { 
  isloading:any;
  token:any;
            model:any ; 
  sharedUserDetailsModel:any={};
      constructor(
        public jwtHelper: JwtHelper,
        private _parentRouter: Router,
        private authentication: authservice,
        private authLoginService: AuthLoginService) {
          this.getUserFromServer();
         }
    public getUserFromServer() {
          if(localStorage.getItem("auth_key")){
        this.isloading = true;
        this.authentication.getUserInfo().subscribe(data => {
             console.log(data);
            this.token = data.message;
            console.log(this.token);
            this.model= this.token.userbio;
            this.isloading = false;
            this.sharedUserDetailsModel.username = this.token.user.fullName;
            this.sharedUserDetailsModel.isLoggedIn = true;
            this.authLoginService.broadcastTextChange(this.sharedUserDetailsModel);
               Materialize.toast("Welcome " + data.message.user.fullName,3000 );
        },
            error => {
            
                this.isloading = false;

            });
          }
          else{
             this.sharedUserDetailsModel.username = "";
            this.sharedUserDetailsModel.isLoggedIn = false;
            this.authLoginService.broadcastTextChange(this.sharedUserDetailsModel);
          }
    }
    public refreshLogin() {
        var instance = this;
        this.authentication.refreshLogin()
            .subscribe(
            Ttoken => {
                localStorage.setItem("auth_key", Ttoken.access_token);
                localStorage.setItem("refresh_key", Ttoken.refresh_token);
                instance.getUserFromServer();
            },
            Error => {
                localStorage.removeItem("auth_key");
                localStorage.removeItem("refresh_key");
                this.sharedUserDetailsModel.username = "";
                this.sharedUserDetailsModel.isLoggedIn = false;
                this.authLoginService.broadcastTextChange(this.sharedUserDetailsModel);

            })
    }
 }
