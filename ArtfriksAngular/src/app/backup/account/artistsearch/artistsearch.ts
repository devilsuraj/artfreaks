import { Component,Input, OnInit, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import {artservice} from '../../services/artwork/artservice';
import { ActivatedRoute } from '@angular/router';
import * as Materialize from "angular2-materialize";
import { Router } from '@angular/router';
import { JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
import { MasonryOptions } from 'angular2-masonry';
@Component({
      moduleId: module.id,
    selector: 'artwork',
  templateUrl:'/app/account/artistsearch/index.html',
    animations: [
        trigger('cardauth', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform': 'translate3D(0px, 0px, 0px)',
                transform: 'translate3D(0px, 0px, 0px)',
                opacity: 1
            })),
            transition('void => *', [
                style({
                    opacity: 0,
                    '-ms-transform': 'translate3D(0px, 150px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                    '-moz-transform': 'translate3D(0px, 150px, 0px)',
                    '-o-transform': 'translate3D(0px, 150px, 0px)',
                    transform: 'translate3D(0px, 150px, 0px)',
                }),
                animate('0.3s 0s ease-out')
            ])
        ]),

    ],
       styles: [`
       .brick { width: 310px; padding:10px; }
       .red-text{font-weight:bold}
     `]

})
export class artistsearch {
      @Input()
      id:any="";
      sub:any;
      type:any;
      isloading:any;
      artList:any;
      public myOptions: MasonryOptions = { 
  transitionDuration: '0.8s' 
};
linkvar:any=[{val:"A"},{val:"b"},{val:"C"},{val:"D"},{val:"E"},{val:"F"},{val:"G"},
            {val:"H"},{val:"I"},{val:"J"},{val:"K"},{val:"L"},{val:"M"},{val:"N"},
            {val:"O"},{val:"P"},{val:"Q"},{val:"R"},{val:"S"},{val:"T"},{val:"U"},
            {val:"V"},{val:"W"},{val:"X"},{val:"Y"},{val:"Z"}];
loading: boolean = true;
public selectedvalue:string="";
urlstring="http://base.kmtrt.in/wallimages/imagepath/";
    constructor(private artservice:artservice, private jwtHelper:JwtHelper, private route:ActivatedRoute, private Router:Router) {
       this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
        console.log(this.id);
       this.selectedvalue=this.id;
        this.getAllArt(this.id);
});
     
    }

    getAllArt(id) {
        this.isloading = true;
        this.artservice.getalluser(id).subscribe(x => {
            console.log(x);
            this.artList = x.message;
            this.isloading = false;
        }, error => {
            Materialize.toast(error);
                 this.isloading = false;
        });
    }

   

}