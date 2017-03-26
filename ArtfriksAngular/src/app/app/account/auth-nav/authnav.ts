//this file is not needed actually its a bug with materialize -csss https://github.com/Dogfalo/materialize/issues/1593 and 
//thats why i am forced to created this file so everything can work smoother
import { Component, ViewChild, Input, ChangeDetectorRef } from '@angular/core'
import { AuthLoginService, SharedUserDetailsModel } from '../../services/account/shareduserdetails';
import { MaterializeDirective } from "angular2-materialize";
import * as Materialize from "angular2-materialize";
import {JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt'
import {authservice  } from '../../services/account/accountservice';
declare var $:any;
@Component({
    selector: 'authorize-nav',
    templateUrl:'./app/account/auth-nav/index.html',
})
export class auth_nav {
    public token: SharedUserDetailsModel= new SharedUserDetailsModel();
public isLoggedin:boolean=false;
    constructor(private _AuthLoginService: AuthLoginService,public jwtHelper: JwtHelper,
      private authervice:authservice, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
    
        this._AuthLoginService.UserStatus.subscribe(val => {
            if(val){
            this.token.username = val.username;
            this.token.isLoggedIn=val.isLoggedIn;
            this.isLoggedin=true;
             $(".dropdown-button").dropdown();
            console.log(this.token);}
        });
       
    }

  
     public Logout() {
          localStorage.removeItem("auth_key");
            localStorage.removeItem("refresh_key");
               this.token.username=null;
               this.token.isLoggedIn=false;
               this._AuthLoginService.broadcastTextChange(this.token);
     
    }

}