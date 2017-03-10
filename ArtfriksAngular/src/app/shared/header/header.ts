import {Component}  from '@angular/core'
import {MaterializeDirective} from "angular2-materialize";
import * as Materialize from "angular2-materialize";
import {artservice} from '../../services/artwork/artservice';
declare var $:any;
@Component({
  selector:'header',
  templateUrl:'./app/shared/header/header.html'
})
export class header{
  constructor(private artservice:artservice){}
  		categroryList:any;
      isloading:any;
       		ngOnInit(){
           	$(".button-collapse").sideNav();
            $(".dropdown-button").dropdown();
            this.getCategories();
           }
  getCategories() {
        this.isloading = true;

        this.artservice.getCategories().subscribe(x => {
            console.log(x);
            this.categroryList = x;
            this.isloading = false;
        }, error => {
            Materialize.toast(error);
        });
    }
}