import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {SharedModule} from './shared/sharedmodule'
import {MODULE_ROUTES} from './shared/routes/routes';
import { HttpModule} from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { AppComponent }   from './app.component';
import {AccountModule} from './account/accountmodule';
import {ArtModule} from './artwork/artmodule';
import { RouterModule, CanActivate  }   from '@angular/router';

import { JwtHelper } from 'angular2-jwt';
import {ServiceModule} from './services/servicemodule';
import {loader} from './shared/loader/loader';
import { MasonryModule } from 'angular2-masonry';
import { ModuleWithProviders } from '@angular/core';
export const routing: ModuleWithProviders = RouterModule.forRoot(MODULE_ROUTES,{ useHash: true });
@NgModule({
  imports:      [ BrowserModule,
                  HttpModule, 
                  FormsModule,
                  AccountModule,
                  SharedModule,
                  ServiceModule,
                  ArtModule,
                  routing,
              MasonryModule
                   ],
  declarations: [ AppComponent ],
  exports:[],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
