import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registration } from './registration/registration';
import { FormsModule }   from '@angular/forms';
import { RouterModule,Route } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {SharedModule} from '../shared/sharedmodule';
import {loginComponent} from './login/login';
import { ModuleWithProviders } from '@angular/core';
import { JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
import {profile} from './profile/profile';
import { MaterializeDirective } from "angular2-materialize";
import {message} from './message/message';
import {contactartist} from './contactartist/contactartist';
import {bio} from './bio/bio';
import {forgotpassword} from './forgotpassword/forgotpassword'
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule,
        RouterModule,
        CommonModule 
        ],
        declarations: [ registration,loginComponent,bio,message,MaterializeDirective ,forgotpassword,profile,contactartist],
        exports:[registration,contactartist,MaterializeDirective],
        providers:[JwtHelper]
})

export class AccountModule {}
export const MODULE_ROUTES: Route[] =[
    { path: 'registration', pathMatch: 'full' , component: registration },
    { path: 'login', pathMatch: 'full' , component: registration },

]
