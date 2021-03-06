import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Route } from '@angular/router';
import {header} from './header/header';
import {footer} from './footer/footer';
import {loader} from './loader/loader';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {aboutus} from './about/about'
import{AppComponent} from '../app.component';
import { ModuleWithProviders } from '@angular/core';
import {ImageModule} from './image/image';
import { MasonryModule } from 'angular2-masonry';
import {tag} from './tag/tag';
import {auth_nav} from '../account/auth-nav/authnav';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        CommonModule ,
        MasonryModule
        ],
        declarations: [ header,footer,loader,tag,aboutus,ImageModule ,auth_nav],
        exports:[header,footer,loader,tag,ImageModule,MasonryModule,auth_nav]
})

export class SharedModule {}


