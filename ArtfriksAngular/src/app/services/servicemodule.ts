import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { RouterModule, CanActivate  }   from '@angular/router';
import { MaterializeDirective } from "angular2-materialize";
import { JwtHelper } from 'angular2-jwt';
import {authservice} from './account/accountservice';
import {AuthLoginService} from './account/shareduserdetails';
import {Configuration} from './app/app.config';
import {artservice} from './artwork/artservice';
@NgModule({
  providers:[authservice ,artservice ,Configuration,AuthLoginService]
})
export class ServiceModule { }
