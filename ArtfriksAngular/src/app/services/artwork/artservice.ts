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
export class artservice {
    constructor(private http: Http, private app: Configuration) { }
    private _authUrl = this.app.Server;  // URL to web api
    private _tokenUrl = this.app.FileServer;
    private jheaders = new Headers({ 'Content-Type': 'application/json' });
    private joptions = new RequestOptions({ headers: this.jheaders });
    getUserInfo(): Observable<any> {
        if (localStorage.getItem("auth_key")) {
            let authheaders = new Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
            let Authoptions = new RequestOptions({ headers: authheaders });
            return this.http.get(this._authUrl + "/api/misc/getUserInfo", Authoptions)
                .map(res => <any>res.json())
                .catch(this.handleError);
        }
    }

    getAllArt(): Observable<any> {
        if (localStorage.getItem("auth_key")) {
            let authheaders = new Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
            let Authoptions = new RequestOptions({ headers: authheaders });
            return this.http.get(this._authUrl + "/artowrk/getAll", this.joptions)
                .map(res => <any>res.json())
                .catch(this.handleError);
        }
    }
    getCategories(): Observable<any> {
        if (localStorage.getItem("auth_key")) {
            let authheaders = new Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
            let Authoptions = new RequestOptions({ headers: authheaders });
            return this.http.get(this._authUrl + "/api/artowrk/Categories", this.joptions)
                .map(res => <any>res.json())
                .catch(this.handleError);
        }
    }

    getTypes(): Observable<any> {
        if (localStorage.getItem("auth_key")) {
            let authheaders = new Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
            let Authoptions = new RequestOptions({ headers: authheaders });
            return this.http.get(this._authUrl + "/api/artowrk/Types", this.joptions)
                .map(res => <any>res.json())
                .catch(this.handleError);
        }
    }

       getMediums(): Observable<any> {
        if (localStorage.getItem("auth_key")) {
            let authheaders = new Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
            let Authoptions = new RequestOptions({ headers: authheaders });
            return this.http.get(this._authUrl + "/api/artowrk/mediums", this.joptions)
                .map(res => <any>res.json())
                .catch(this.handleError);
        }
    }

  

    getUnits(): Observable<any> {
        if (localStorage.getItem("auth_key")) {
            let authheaders = new Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
            let Authoptions = new RequestOptions({ headers: authheaders });
            return this.http.get(this._authUrl + "/api/artowrk/units", this.joptions)
                .map(res => <any>res.json())
                .catch(this.handleError);
        }
    }

    getProfession(): Observable<any> {
            return this.http.get(this._authUrl + "/api/artowrk/Profession", this.joptions)
                .map(res => <any>res.json())
                .catch(this.handleError);
    }



    getArtById(Id: any): Observable<any> {
        if (localStorage.getItem("auth_key")) {
            let authheaders = new Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
            let Authoptions = new RequestOptions({ headers: authheaders });
            return this.http.get(this._authUrl + "/artowrk/GetById?id=" + Id, this.joptions)
                .map(res => <any>res.json())
                .catch(this.handleError);
        }
    }

    uploadArt(Param: any): Observable<any> {
        let body = JSON.stringify(Param);
        if (localStorage.getItem("auth_key")) {
            let authheaders = new Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") ,'Content-Type': 'application/json'});
            let Authoptions = new RequestOptions({ headers: authheaders });
            return this.http.post(this._authUrl + "/api/artowrk/postArt", body, Authoptions)
                .map(res => <any>res.json())
                .catch(this.handleError);
        }
    }
    private handleError(error: any): Promise<any> {
        if (error.status === 401) {
            return Promise.reject("401");
        }
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error.json());
    }

    

}
