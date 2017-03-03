import { registration } from './registration/registration';
import { RouterModule,Route } from '@angular/router';
import {loginComponent} from './login/login';

import { ModuleWithProviders } from '@angular/core';
export const AccountRoutes =[
    { path: 'account/registration',pathMatch:'prefix',  component: registration },
       { path: 'account/register',pathMatch:'prefix',  component: registration },
    { path: 'account/login',pathMatch:'prefix', component: loginComponent }
]
