import {Component}  from '@angular/core'
import {MaterializeDirective} from "angular2-materialize";
import * as Materialize from "angular2-materialize";
declare var $:any;
@Component({
  selector:'header',
  templateUrl:'./app/shared/header/header.html'
})
export class header{
  		categoryList:any;
       		ngOnInit(){
           	$(".button-collapse").sideNav();
            $(".dropdown-button").dropdown();
           }

}