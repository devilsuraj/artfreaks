import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {SharedModule,routing} from './shared/sharedmodule'
import { HttpModule} from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { AppComponent }   from './app.component';
import {AccountModule} from './account/accountmodule';
import { RouterModule, CanActivate  }   from '@angular/router';
import { MaterializeDirective } from "angular2-materialize";
import { JwtHelper } from 'angular2-jwt';
import {ServiceModule} from './services/servicemodule';
import {loader} from './shared/loader/loader';
import { ModuleWithProviders } from '@angular/core';
@NgModule({
  imports:      [ BrowserModule,
                  HttpModule, 
                  FormsModule,
                  AccountModule,
                  SharedModule,
                  ServiceModule,
                  routing
                   ],
  declarations: [ AppComponent,MaterializeDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
