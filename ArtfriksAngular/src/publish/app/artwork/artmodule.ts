import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { uploadartwork } from './uploadart/uploadart';
import { FormsModule }   from '@angular/forms';
import { RouterModule,Route } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {SharedModule} from '../shared/sharedmodule';
import {artwork} from './artwork/artwork';
import { ModuleWithProviders } from '@angular/core';
import { JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
import FileDroppa from 'file-droppa'
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { ImageUploadModule } from 'ng2-imageupload';
import {AuthGuard} from '../services/account/authguard';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule,
        RouterModule,
        CommonModule ,
        FileDroppa,
        ImageUploadModule,
        Ng2AutoCompleteModule
        ],
        declarations: [ artwork,uploadartwork ],
        exports:[],
        providers:[JwtHelper]
})

export class ArtModule {}
export const ArtworkRoutes =[
    { path: 'uploadart', pathMatch: 'full' , component: uploadartwork, canActivate:[AuthGuard]  },


]
