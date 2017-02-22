"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var app_config_1 = require('../app/app.config');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/toPromise');
require('rxjs/add/observable/throw');
var authservice = (function () {
    function authservice(http, app) {
        this.http = http;
        this.app = app;
        this._authUrl = this.app.Server; // URL to web api
        this._tokenUrl = this.app.FileServer;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/X-www-form-urlencoded' });
        this.jheaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this.joptions = new http_1.RequestOptions({ headers: this.jheaders });
        this.tokenParams = "grant_type=password" +
            "&client_id=myClient" +
            "&scope=offline_access profile email roles"; // offline_access for refresh_token read more on docs / blog
        this.refreshParams = "grant_type=refresh_token" +
            "&refresh_token=" + localStorage.getItem("refresh_key") +
            "&scope=offline_access profile email roles"; // get refresh token stored when logged in 
    }
    authservice.prototype.getUserInfo = function () {
        if (localStorage.getItem("auth_key")) {
            this.authheaders = new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
            this.Authoptions = new http_1.RequestOptions({ headers: this.authheaders });
            return this.http.get(this._authUrl + "/api/misc/getUserInfo", this.Authoptions)
                .map(function (res) { return res.json(); })
                .catch(this.handleError);
        }
    };
    authservice.prototype.logout = function () {
        if (localStorage.getItem("auth_key")) {
            this.authheaders = new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
            this.Authoptions = new http_1.RequestOptions({ headers: this.authheaders });
            return this.http.get(this._tokenUrl + "/connect/logout", this.Authoptions)
                .map(function (res) { return res; })
                .catch(this.handleError);
        }
    };
    authservice.prototype.Login = function (inputType) {
        return this.http.post(this._tokenUrl + "/connect/verifycode", this.tokenParams + "&username=" + inputType.userName + "&password=" + inputType.password, this.options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    authservice.prototype.changepassword = function (inputType) {
        this.authheaders = new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
        this.Authoptions = new http_1.RequestOptions({ headers: this.authheaders });
        return this.http.post(this._authUrl + "/api/account/updateprofile?password=" + inputType.password + "&oldpassword=" + inputType.oldpassword + "&username=" + inputType.username, this.Authoptions)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    authservice.prototype.refreshLogin = function () {
        return this.http.post(this._authUrl + "/connect/verifycode", this.refreshParams, this.options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    authservice.prototype.sendotp = function (username) {
        return this.http.post(this._authUrl + "/api/account/sendOtp?username=" + username, this.options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    authservice.prototype.Register = function (inputType) {
        var body = JSON.stringify(inputType);
        return this.http.post(this._authUrl + "/api/account/register", body, this.joptions)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    authservice.prototype.putUser = function (inputType) {
        var body = JSON.stringify(inputType);
        return this.http.post(this._authUrl + "/api/account/updateUser", body, this.joptions)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    authservice.prototype.putUserPassword = function (inputType) {
        this.authheaders = new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem("auth_key") });
        this.Authoptions = new http_1.RequestOptions({ headers: this.authheaders });
        var body = JSON.stringify(inputType);
        return this.http.post(this._authUrl + "/api/account/ResetToOriginalPassword", body, this.joptions)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    authservice.prototype.handleError = function (error) {
        if (error.status === 401) {
            return Promise.reject("401");
        }
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error.json());
    };
    authservice = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_config_1.Configuration])
    ], authservice);
    return authservice;
}());
exports.authservice = authservice;
//# sourceMappingURL=accountservice.js.map