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
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var AuthLoginService = (function () {
    function AuthLoginService() {
        // Share login logout functions throughout application
        this.cehckStatus = new core_1.EventEmitter();
        this.logout = new core_1.EventEmitter();
        // Share login logout functions throughout application
        this.modalstatus = new core_1.EventEmitter();
        this.closemodal = new core_1.EventEmitter();
        //share userdetails and logged in status throughout applicatoion
        this.defaultshare = new SharedUserDetailsModel();
        this.UserStatus = new BehaviorSubject_1.BehaviorSubject(this.defaultshare);
    }
    AuthLoginService.prototype.emitNotLoggedIn = function () {
        this.cehckStatus.emit(null);
    };
    AuthLoginService.prototype.emitLogOut = function () {
        this.logout.emit(null);
    };
    AuthLoginService.prototype.getLoggedInEmitter = function () {
        return this.cehckStatus;
    };
    AuthLoginService.prototype.getLoggedOutEmitter = function () {
        return this.logout;
    };
    AuthLoginService.prototype.emitopenmodal = function () {
        this.modalstatus.emit(null);
    };
    AuthLoginService.prototype.emitclosemodal = function () {
        this.closemodal.emit(null);
    };
    AuthLoginService.prototype.emitopenmodalEmitter = function () {
        return this.modalstatus;
    };
    AuthLoginService.prototype.emitclosemodalEmitter = function () {
        return this.closemodal;
    };
    AuthLoginService.prototype.broadcastTextChange = function (text) {
        this.UserStatus.next(text);
    };
    AuthLoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AuthLoginService);
    return AuthLoginService;
}());
exports.AuthLoginService = AuthLoginService;
var SharedUserDetailsModel = (function () {
    function SharedUserDetailsModel() {
    }
    return SharedUserDetailsModel;
}());
exports.SharedUserDetailsModel = SharedUserDetailsModel;
//# sourceMappingURL=shareduserdetails.js.map