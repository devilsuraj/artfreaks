import { registration } from './registration/registration';
import { RouterModule,Route } from '@angular/router';
import {loginComponent} from './login/login';
import {forgotpassword} from './forgotpassword/forgotpassword'
import { ModuleWithProviders } from '@angular/core';
import {profile} from './profile/profile';
import {AuthGuard} from '../services/account/authguard';
import {myartwork} from '../artwork/myartwork/artwork';
import {favartwork} from '../artwork/favartwork/artwork';
import {contactartist} from './contactartist/contactartist';
export const AccountRoutes =[
    { path: 'account/registration',pathMatch:'prefix',  component: registration },
       { path: 'account/register',pathMatch:'prefix',  component: registration },
           { path: 'account/contact/:id',pathMatch:'prefix',  component: contactartist ,canActivate:[AuthGuard] },
    { path: 'account/login',pathMatch:'prefix', component: loginComponent },
       { path: 'account/password',pathMatch:'prefix', component: forgotpassword },
            { path: 'account/profile',pathMatch:'prefix', component: profile , canActivate:[AuthGuard] ,
     children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'myart', component: myartwork },
         { path: 'favourites', component: favartwork },
    ]    
    }
]
