import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { registration } from './registration/registration';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {SharedModule} from '../shared/sharedmodule';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule,
        RouterModule,
        CommonModule ],
        declarations: [ registration ],
        exports:[registration]
})

export class AccountModule {}