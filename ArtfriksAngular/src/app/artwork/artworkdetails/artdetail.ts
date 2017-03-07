import {Component}  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {artservice} from '../../services/artwork/artservice';
import * as Materialize from "angular2-materialize";
@Component({
  selector:'paintingclick',
  templateUrl:'./app/artwork/artworkdetails/artdetail.html'
})
export class artdetails{
    id: number;
    sub: any;
    art:any;
    isloading:boolean=false;
    constructor(private route: ActivatedRoute, private artservice:artservice){}
    ngOnInit(){
     this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
        console.log(this.id);});
        this.getartdetails(this.id);
     }

      getartdetails(id) {
        this.isloading = true;
        this.artservice.getArtById(id).subscribe(x => {
            console.log(x);
            this.art = x.message;
            this.isloading = false;
        }, error => {
            Materialize.toast(error);
                 this.isloading = false;
        });
    }
}