import {Component,}  from '@angular/core'
import {RequestOptions,Headers,Http} from '@angular/http'
import {} from '@angular/common'
import { JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthLoginService, SharedUserDetailsModel } from '../../services/account/shareduserdetails';
import * as Materialize from "angular2-materialize";
import { Subscription } from 'rxjs/Subscription';
import {authservice} from '../../services/account/accountservice';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import {Configuration} from '../../services/app/app.config';
@Component({
  selector:'profile',
  templateUrl:'./app/account/bio/bio.html',
  styles:[`textarea {
    overflow-y: scroll;
    height: 100px;
    resize: none; /* Remove this if you want the user to resize the textarea */
}`]
})
export class bio{
    isloading:boolean=false;
    sharedUserDetailsModel:any={};
    token:any;
    edit:boolean=false;
    editer(){
        this.edit=true;
    }
    urlstring="http://base.kmtrt.in/wallimages/imagepath/";
    public model:biodata=new biodata();
        private subscription: Subscription;
    constructor(public jwtHelper: JwtHelper,
        private _parentRouter: Router,
        private http:Http,
        private authentication: authservice,
        private authLoginService: AuthLoginService,
        private Configuration:Configuration) { this.getUserFromServer();}

      public getUserFromServer() {
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

fileChange(event) {

    this.isloading=true;
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
    //    headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post(`${this.Configuration.Server}/picture/save`, formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
                data =>{
                    if(data.status==0)
                    {
                        this.model.pictureUrl=data.message;
                        this.putUser(this.model);
                        this.isloading=false;
                    }
                },
                error => {console.log(error);    this.isloading=false;}
            )
    }
}

  public putUser(username: any) {
        this.isloading = true;
        this.authentication.updateprofile(username).subscribe(data => {
            if (data.status == 0) {
                Materialize.toast("Updated Registerd...", 3000);
                this.isloading = false;
                  this.edit=false;
            }
            else {
                Materialize.toast(data.message, 3000);
                this.isloading = false;
                    this.edit=false;
            }
        },
            error => {
                Materialize.toast(error, 3000);
                this.isloading = false;
                    this.edit=false;
            });
    }

        public Logout() {
            localStorage.removeItem("auth_key");
            localStorage.removeItem("refresh_key");
            this._parentRouter.navigate(['../']);
            Materialize.toast("User Logged out Added Successfully",1000);
    }

}

export class biodata{
    pictureUrl:any;
    bioData:any;
    userBrief:any;
}