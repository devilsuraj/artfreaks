import { RouterModule,Route } from '@angular/router';
import {registration} from '../../account/registration/registration';
import {AccountRoutes} from '../../account/accountroutes';
import {ArtworkRoutes} from '../../artwork/artmodule';
import {aboutus} from '../about/about';
export const first=[  ]
export const MODULE_ROUTES:Route[] =[
   
].concat(AccountRoutes).concat({ path: 'aboutus', pathMatch: 'full' , component: aboutus  }).concat(ArtworkRoutes)

