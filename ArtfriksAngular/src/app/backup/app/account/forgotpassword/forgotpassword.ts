import {Component}  from '@angular/core'
import {authservice} from '../../services/account/accountservice';
import * as Materialize from "angular2-materialize";
import { Router } from '@angular/router';
@Component({
  selector:'forgotpassword',
  templateUrl:'./app/account/forgotpassword/forgotpassword.html'
})
export class forgotpassword{
    constructor(private _authservice:authservice, private _parentRouter:Router){}
    isloading:boolean=false;
    isOtp:boolean=false;
    model:any={};
    onebtnText="";
        public sendOTP(username: any) {
        if (!username ) {
            Materialize.toast("Enter your number", 3000);
            return false;
        }
        this.isloading = true;
        this._authservice.sendotpbyUser( username).subscribe(data => {
            if (data.status == 0) {
                Materialize.toast("OTP Sent Check your Inbox", 3000);
                this.isloading = false;
                this.isOtp=true;
                this.onebtnText="Submit";
            }
            else {
                Materialize.toast(data.message, 3000);
                this.isloading = false;
            }
        },
            error => {
                Materialize.toast(error, 3000);
                this.isloading = false;
            });
    }

    public resetPassword(model:any) {
             this.isloading=true;
        this._authservice.resetpassword(model).subscribe(data => {
           if(data.status==1){
                  this.isloading=false;
                    this._parentRouter.navigate(['/']);
           }
           else
           Materialize.toast(data.message,100);
              this.isloading=false;
        },
            error => {
                Materialize.toast( error,100);
                   this.isloading=false;
            });
    }

}