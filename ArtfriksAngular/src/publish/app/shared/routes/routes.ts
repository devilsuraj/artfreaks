import { RouterModule,Route } from '@angular/router';
import {registration} from '../../account/registration/registration';
import {AccountRoutes} from '../../account/accountroutes';
import {ArtworkRoutes} from '../../artwork/artmodule';
export const first=[
    { path: '', pathMatch: 'full' , component: registration }
]
export const MODULE_ROUTES:Route[] =[
].concat(AccountRoutes).concat(first).concat(ArtworkRoutes)

