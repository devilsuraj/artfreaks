import { Component, Injectable,  Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class AuthLoginService {
    // Share login logout functions throughout application
    cehckStatus = new EventEmitter();
    logout = new EventEmitter();
    constructor() { }
    emitNotLoggedIn() {
        this.cehckStatus.emit(null);
    }
    emitLogOut() {
        this.logout.emit(null);
    }
    getLoggedInEmitter() {
        return this.cehckStatus;
    }
    getLoggedOutEmitter() {
        return this.logout;
    }


    // Share login logout functions throughout application
    modalstatus = new EventEmitter();
    closemodal = new EventEmitter();
    emitopenmodal() {
        this.modalstatus.emit(null);
    }
    emitclosemodal() {
        this.closemodal.emit(null);
    }
    emitopenmodalEmitter() {
        return this.modalstatus;
    }
    emitclosemodalEmitter() {
        return this.closemodal;
    }

    //share userdetails and logged in status throughout applicatoion
    public defaultshare = new SharedUserDetailsModel();
    public UserStatus: Subject<SharedUserDetailsModel> = new BehaviorSubject<SharedUserDetailsModel>(this.defaultshare);
    broadcastTextChange(text: SharedUserDetailsModel) {
        this.UserStatus.next(text);
    }
}

export class SharedUserDetailsModel {
    //can add everything else needed to share
    username: string;
    isLoggedIn: boolean;
}