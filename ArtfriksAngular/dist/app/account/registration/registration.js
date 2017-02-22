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
var accountservice_1 = require('../../services/account/accountservice');
var Materialize = require("angular2-materialize");
var router_1 = require('@angular/router');
var registration = (function () {
    function registration(_parentRouter, _authservice) {
        this._parentRouter = _parentRouter;
        this._authservice = _authservice;
        this.OTP = false;
        this.model = [];
        this.updatemodel = [];
        this.last = false;
        this.onebtnText = "Next";
        this.isloading = false;
    }
    registration.prototype.ngOnInit = function () {
    };
    registration.prototype.userRegister = function (creds) {
        var _this = this;
        this.onebtnText = "Loading...";
        this.isloading = true;
        this._authservice.Register(creds)
            .subscribe(function (Ttoken) {
            if (Ttoken.status == 0) {
                _this.isloading = false;
                _this.onebtnText = "Next";
                _this.updatemodel = creds;
                _this.OTP = true;
                Materialize.toast("OTP sent to " + creds.phone + " .", 3000);
            }
            else if (Ttoken.status == 0) {
                _this.onebtnText = "Next";
                Materialize.toast("Please check all fields", 3000);
            }
            else {
                _this.onebtnText = "Next";
                Materialize.toast(Ttoken.errors[0].description);
                _this.isloading = false;
            }
        }, function (error) {
            if (error === "401") {
                _this.handleError(error);
                _this.onebtnText = "Next";
            }
            else
                Materialize.toast(error.errors[0].description);
            _this.isloading = false;
            _this.onebtnText = "Next";
        });
    };
    registration.prototype.putUser = function (username) {
        var _this = this;
        this.isloading = true;
        this._authservice.putUser(username).subscribe(function (data) {
            if (data.status == 0) {
                Materialize.toast("Succesully Registerd...", 3000);
                _this.last = true;
                _this.isloading = false;
            }
            else {
                Materialize.toast(data.message, 3000);
                _this.isloading = false;
            }
        }, function (error) {
            Materialize.toast(error, 3000);
            _this.isloading = false;
        });
    };
    registration.prototype.sendOTP = function (username) {
        var _this = this;
        if (!username || username.phone === undefined) {
            Materialize.toast("Enter your number", 300);
            return false;
        }
        this.isloading = true;
        this._authservice.sendotp(username).subscribe(function (data) {
            if (data.status == 0) {
                Materialize.toast("OTP Sent Check your Inbox", 300);
                _this.isloading = false;
            }
            else {
                Materialize.toast(data.message, 300);
                _this.isloading = false;
            }
        }, function (error) {
            Materialize.toast(error, 300);
            _this.isloading = false;
        });
    };
    registration.prototype.isOTP = function () {
        this.OTP = false;
    };
    registration.prototype.handleError = function (error) {
        var _this = this;
        if (error == "401") {
            this._authservice.refreshLogin()
                .subscribe(function (Ttoken) {
                localStorage.setItem("auth_key", Ttoken.access_token);
                localStorage.setItem("refresh_key", Ttoken.refresh_token);
                _this.isloading = false;
                _this._parentRouter.navigate(['/']);
            }, function (error) {
                Materialize.toast(error.error);
                localStorage.removeItem("auth_key");
                localStorage.removeItem("refresh_key");
                _this._parentRouter.navigate(['/']);
                _this.isloading = false;
            });
        }
        else {
            Materialize.toast(error.error);
            this.isloading = false;
        }
    };
    registration = __decorate([
        core_1.Component({
            selector: 'registration',
            templateUrl: './app/account/registration/registration.html',
            animations: [
                core_1.trigger('cardauth', [
                    core_1.state('*', core_1.style({
                        '-ms-transform': 'translate3D(0px, 0px, 0px)',
                        '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                        '-moz-transform': 'translate3D(0px, 0px, 0px)',
                        '-o-transform': 'translate3D(0px, 0px, 0px)',
                        transform: 'translate3D(0px, 0px, 0px)',
                        opacity: 1
                    })),
                    core_1.transition('void => *', [
                        core_1.style({
                            opacity: 0,
                            '-ms-transform': 'translate3D(0px, 150px, 0px)',
                            '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                            '-moz-transform': 'translate3D(0px, 150px, 0px)',
                            '-o-transform': 'translate3D(0px, 150px, 0px)',
                            transform: 'translate3D(0px, 150px, 0px)',
                        }),
                        core_1.animate('0.3s 0s ease-out')
                    ])
                ]),
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, accountservice_1.authservice])
    ], registration);
    return registration;
}());
exports.registration = registration;
//# sourceMappingURL=registration.js.map