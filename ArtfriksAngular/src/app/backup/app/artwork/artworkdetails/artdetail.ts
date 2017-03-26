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
    type:any;
    sub: any;
    art:any={};
    isloading:boolean=false;
    loading: boolean = true;
    urlstring="http://base.kmtrt.in/wallimages/imagepath/";
    constructor(private route: ActivatedRoute, private artservice:artservice){
         this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
        this.type = +params['type'];
        console.log(this.id);
 this.getartdetails(this.id);    
});
       
    }
    ngOnInit(){
    
     }

      getartdetails(id) {
        this.isloading = true;
        this.artservice.getArtById(id).subscribe(x => {
            
            this.art = x;
            console.log(this.art);
            this.isloading = false;
        }, error => {
            Materialize.toast(error);
                 this.isloading = false;
        });
    }
}