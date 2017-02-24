import { Http, Headers } from '@angular/http';
import { JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import {authservice} from '../../services/account/accountservice';
import { Router } from '@angular/router';
import { logModel, registerModel, token, Regresult, result, ChangePasswordViewModel, parmmode } from '../../models/account/authmodel';
import { AuthLoginService, SharedUserDetailsModel } from '../../services/account/shareduserdetails';
import { Subscription } from 'rxjs/Subscription';
declare var $:any, System:any, demo:any;
@Component({
    moduleId: module.id,
    selector: 'login',
  templateUrl:'/app/account/login/login.html',
    animations: [
        trigger('cardauth', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform': 'translate3D(0px, 0px, 0px)',
                transform: 'translate3D(0px, 0px, 0px)',
                opacity: 1
            })),
            transition('void => *', [
                style({
                    opacity: 0,
                    '-ms-transform': 'translate3D(0px, 150px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                    '-moz-transform': 'translate3D(0px, 150px, 0px)',
                    '-o-transform': 'translate3D(0px, 150px, 0px)',
                    transform: 'translate3D(0px, 150px, 0px)',
                }),
                animate('0.3s 0s ease-out')
            ])
        ]),

    ]


})

export class loginComponent {
    private subscription: Subscription;
    constructor(public jwtHelper: JwtHelper,
        private _parentRouter: Router,
        private authentication: authservice,
        private authLoginService: AuthLoginService) { }
        isLoggedin:boolean;
        model:logModel=new logModel();
     token: any = "";
     user: string;
     isloading: boolean = false;
     submitted: boolean = false;
     sharedUserDetailsModel: SharedUserDetailsModel = new SharedUserDetailsModel();
    ngOnInit() {
        var instance = this;
        // check if auth key is present
        if (localStorage.getItem('auth_key')) {
            this.token = this.jwtHelper.decodeToken(localStorage.getItem("auth_key"));
            console.log(this.token);
            if (!this.jwtHelper.isTokenExpired(localStorage.getItem('auth_key'))) // check if its not expired
            {
                instance.getUserFromServer();
                this._parentRouter.navigate(['/']);
                this.isLoggedin = true; 
            }
            else {
                if (localStorage.getItem('refresh_key')) { // check if refresh key is present it wont be present for external logged in users
                    this.refreshLogin(); 
                }
            }
        } 
    }
    public Login(creds: logModel) {
        this.isloading = true;
        console.log(creds);
        var instance = this;
        this.authentication.Login(creds)
            .subscribe(
            Ttoken => {
                
                localStorage.setItem("auth_key", Ttoken.access_token);
                localStorage.setItem("refresh_key", Ttoken.refresh_token);
                this.isLoggedin = true;
                this.isloading = false;
                instance.getUserFromServer();
                this._parentRouter.navigate(['/']);
               
            },
            error => {
                console.log(error);
                this.isloading = false;
             demo.showNotification('bottom', 'center',  error.error_description  );
            })
    }

    public refreshLogin() {
        var instance = this;
        this.authentication.refreshLogin()
            .subscribe(
            Ttoken => {
                localStorage.setItem("auth_key", Ttoken.access_token);
                localStorage.setItem("refresh_key", Ttoken.refresh_token);
                this.isLoggedin = true;
                instance.getUserFromServer();
                this._parentRouter.navigate(['/']);
            },
            Error => {
            demo.showNotification('bottom', 'center',  Error.error  );
            })
    }

    public getUserFromServer() {
        this.isloading = true;
        this.authentication.getUserInfo().subscribe(data => {
            this.token = data;
            this.isloading = false;
            this.sharedUserDetailsModel.username = data.user[0].fullName;
            this.sharedUserDetailsModel.isLoggedIn = true;
            this.authLoginService.broadcastTextChange(this.sharedUserDetailsModel);
              demo.showNotification('bottom', 'center', "Welcome " + data.user[0].fullName );
        },
            error => {
                if (localStorage.getItem('refresh_key')) { // check if refresh key is present it wont be present for external logged in users
                    this.refreshLogin(); // renew auth key and redirect
                }
                this.isloading = false;

            });
    }

   

    public Logout() {
        this.authentication.logout().subscribe(data => {
            localStorage.removeItem("auth_key");
            localStorage.removeItem("refresh_key");
            this._parentRouter.navigate(['/']);
            this.isLoggedin = false;
                  demo.showNotification('bottom', 'center', "User Logged out Added Successfully");
        }, error => {

         });
    }

  }