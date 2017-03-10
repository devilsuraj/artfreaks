import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { logModel, registerModel, token, Regresult, result, ChangePasswordViewModel, parmmode } from '../../models/account/authmodel'
import { Configuration } from '../app/app.config'
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
@Injectable()
export class authservice {
    constructor(private http: Http, private app: Configuration) { }

    private _authUrl = this.app.Server;  // URL to web api
    private _tokenUrl =this.app.FileServer;
    private headers = new Headers({ 'Content-Type': 'application/X-www-form-urlencoded' });
    private jheaders = new Headers({ 'Content-Type': 'application/json' });
    authheaders:any;
    private options = new RequestOptions({ headers: this.headers });
    private joptions = new RequestOptions({ headers: this.jheaders });
    Authoptions:any;
    private tokenParams = "grant_type=password" + // password type reuqets with credentials read more on grant_types
    "&client_id=myClient" + 
    "&scope=offline_access profile email roles"; // offline_access for refresh_token read more on docs / blog

    private refreshParams = "grant_type=refresh_token" + // refresh tokens when access_tokens are expired simply renew em!
    "&refresh_token=" + localStorage.getItem("refresh_key") +
    "&client_id=myClient"+
    "&scope=offline_access profile email roles"; // get refresh token stored when logged in 


    getUserInfo(): Observable<any> {
        if (localStorage.getItem("auth_key")) {
            this.authheaders = new Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
            this.Authoptions = new RequestOptions({ headers: this.authheaders });
            return this.http.get(this._authUrl + "/user/userinfo", this.Authoptions)
                .map(res => <any>res.json())
                .catch(this.handleError);
        }
    }

    logout(): Observable<any> {
        if (localStorage.getItem("auth_key")) {
            this.authheaders = new Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
            this.Authoptions = new RequestOptions({ headers: this.authheaders });
            return this.http.get(this._tokenUrl+"/connect/logout", this.Authoptions)
                .map(res => res)
                .catch(this.handleError);
        }
    }

      updateprofile(param:any): Observable<any> {
        if (localStorage.getItem("auth_key")) {
            let body = JSON.stringify(param);
            this.authheaders = new Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key"),'Content-Type': 'application/json' });
            this.Authoptions = new RequestOptions({ headers: this.authheaders });
            return this.http.post(this._tokenUrl+"/user/updateuserinfo",body, this.Authoptions)
                .map(res => res)
                .catch(this.handleError);
        }
    }

    Login(inputType: logModel): Observable<token> {
        return this.http.post(this._tokenUrl+"/connect/verifycode", this.tokenParams + "&username=" + inputType.userName + "&password=" + inputType.password, this.options)
            .map(res => <token>res.json())
            .catch(this.handleError)
    }

    changepassword(inputType: any): Observable<result> {
        this.authheaders = new Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
        this.Authoptions = new RequestOptions({ headers: this.authheaders });
        return this.http.post(this._authUrl + "/api/account/updateprofile?password=" + inputType.password + "&oldpassword=" + inputType.oldpassword + "&username=" + inputType.username, this.Authoptions)
            .map(res => <result>res.json())
            .catch(this.handleError)
    }

    refreshLogin(): Observable<token> {
      let refreshParams = "grant_type=refresh_token" + // refresh tokens when access_tokens are expired simply renew em!
    "&refresh_token=" + localStorage.getItem("refresh_key") +
    "&client_id=myClient"+
    "&scope=offline_access profile email roles";
        return this.http.post(this._authUrl + "/connect/verifycode", refreshParams, this.options)
            .map(res => <token>res.json())
            .catch(this.handleError)
    }

    sendotp(email:any,CountryCode,username:any): Observable<result> {
       return this.http.post(this._authUrl + "/api/account/sendOtp?email="+email+"&countrycode="+CountryCode+"&username="+username ,this.options)
            .map(res => <result>res.json())
            .catch(this.handleError)
    }
     sendotpbyUser(username:any): Observable<result> {
       return this.http.post(this._authUrl + "/api/account/sendOtpbyuser?username="+username ,this.joptions)
            .map(res => <result>res.json())
            .catch(this.handleError)
    }

    Register(inputType: any): Observable<any> {

        let body = JSON.stringify(inputType);
        return this.http.post(this._authUrl + "/api/account/register", body, this.joptions)
            .map(res => <any>res.json())
            .catch(this.handleError)
    }

    putUser(inputType: registerModel): Observable<any> {
        let body = JSON.stringify(inputType);
        return this.http.post(this._authUrl + "/api/account/updateUser", body, this.joptions)
            .map(res => <any>res.json())
            .catch(this.handleError)
    }

    putUserPassword(inputType: ChangePasswordViewModel): Observable<any> {
        this.authheaders = new Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
        this.Authoptions = new RequestOptions({ headers: this.authheaders });
        let body = JSON.stringify(inputType);
        return this.http.post(this._authUrl + "/api/account/ResetToOriginalPassword", body, this.joptions)
            .map(res => <any>res.json())
            .catch(this.handleError)
    }
      resetpassword(username: any): Observable<result> {
        console.log(username);
        return this.http.post(this._authUrl + `/api/account/resetPassword?username=${username.username}&Password=${username.password}&Code=${username.code}`, this.options)
            .map(res => <result>res.json())
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        if (error.status === 401) {
            return Promise.reject("401");
        }
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error.json());
    }

}
