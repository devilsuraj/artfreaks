import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { uploadartwork } from './uploadart/uploadart';
import { FormsModule }   from '@angular/forms';
import { RouterModule,Route } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {SharedModule} from '../shared/sharedmodule';
import {artwork} from './artwork/artwork';
import {myartwork} from './myartwork/artwork';
import {favartwork} from './favartwork/artwork';
import { ModuleWithProviders } from '@angular/core';
import { JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
import FileDroppa from 'file-droppa'
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { ImageUploadModule } from 'ng2-imageupload';
import {AuthGuard} from '../services/account/authguard';
import {artdetails} from './artworkdetails/artdetail'
import {carousel} from './carousel/carousel';
import { OwlModule } from 'ng2-owl-carousel';
import {searchart} from "./searchartwork/artwork";
import {categoryart} from './categoryart/artwork'
import {dealsart} from './dealsart/artwork'
import {collectionart} from './collectionart/artwork';
import {artarticle} from './artarticles/artarticle';
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
        Ng2AutoCompleteModule,
        OwlModule
        ],
        declarations: [carousel,searchart,artarticle,categoryart,collectionart,dealsart, artwork,uploadartwork,artdetails,favartwork ,myartwork],
        exports:[],
        providers:[JwtHelper]
})

export class ArtModule {}
export const ArtworkRoutes =[
       { path: '', pathMatch: 'full' , component: carousel },
    { path: 'uploadart', pathMatch: 'full' , component: uploadartwork, canActivate:[AuthGuard]  },
    { path: 'artwork', pathMatch: 'full' , component: artwork  },
        { path: 'art/:id', pathMatch: 'full' , component: artdetails  },
         { path: 'artbystyle/:id', pathMatch: 'full' , component: searchart  },
            { path: 'artbycategory/:id', pathMatch: 'full' , component: categoryart  },
          { path: 'art/:id', pathMatch: 'full' , component: artdetails  },
               { path: 'artcollection', pathMatch: 'full' , component: collectionart  },
                    { path: 'artdeals', pathMatch: 'full' , component: dealsart  },
                               { path: 'artarticle', pathMatch: 'full' , component: artarticle  },

]
