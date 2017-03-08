import {Component,}  from '@angular/core'
import {RequestOptions,Headers,Http} from '@angular/http'
import {} from '@angular/common'
import { JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthLoginService, SharedUserDetailsModel } from '../../services/account/shareduserdetails';
import * as Materialize from "angular2-materialize";
import { Subscription } from 'rxjs/Subscription';
import {authservice} from '../../services/account/accountservice';
import { Router } from '@angular/router';
import {Observable} from 'rxjs'
@Component({
  selector:'profile',
  templateUrl:'./app/account/profile/profile.html'
})
export class profile{
    isloading:boolean=false;
    sharedUserDetailsModel:any;
    token:any;
    urlstring="http://base.kmtrt.in/wallimages/imagepath/";
    public model:biodata=new biodata();
        private subscription: Subscription;
    constructor(public jwtHelper: JwtHelper,
        private _parentRouter: Router,
        private http:Http,
        private authentication: authservice,
        private authLoginService: AuthLoginService) { this.getUserFromServer();}

      public getUserFromServer() {
        this.isloading = true;
        this.authentication.getUserInfo().subscribe(data => {
            this.token = data.message[0];
            if(this.token .userbio && this.token .userbio.length>0){
            this.model= this.token .userbio;
            }
            this.isloading = false;
            this.sharedUserDetailsModel.username = data.user[0].fullName;
            this.sharedUserDetailsModel.isLoggedIn = true;
            this.authLoginService.broadcastTextChange(this.sharedUserDetailsModel);
               Materialize.toast("Welcome " + data.user[0].fullName,3000 );
        },
            error => {
            
                this.isloading = false;

            });
    }

fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post(`${this.apiEndPoint}`, formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
            )
    }
}

}

export class biodata{
    pictureUrl:any;
    bioData:any;
    userBrief:any;
}