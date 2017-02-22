import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Route } from '@angular/router';
import {header} from './header/header';
import {footer} from './footer/footer';
import {loader} from './loader/loader';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {ImageModule} from './image/image';
import{AppComponent} from '../app.component';
import { ModuleWithProviders } from '@angular/core';
import {registration} from '../account/registration/registration';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        CommonModule ],
        declarations: [ header,footer,loader,ImageModule ],
        exports:[header,footer,loader]
})

export class SharedModule {}

export const MODULE_ROUTES: Route[] =[
    { path: '', pathMatch: 'full' , component: registration },

]
export const routing: ModuleWithProviders = RouterModule.forRoot(MODULE_ROUTES);