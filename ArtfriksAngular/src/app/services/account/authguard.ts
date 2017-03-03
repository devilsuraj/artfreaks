import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private JwtHelper:JwtHelper) { }

    canActivate() {
        if (localStorage.getItem('auth_key') && !this.JwtHelper.isTokenExpired(localStorage.getItem('auth_key'))) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/account/login']);
        return false;
    }
}