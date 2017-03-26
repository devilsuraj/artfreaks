import { Component,Input, OnInit, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import {artservice} from '../../services/artwork/artservice';
import { ActivatedRoute } from '@angular/router';
import * as Materialize from "angular2-materialize";
import { Router } from '@angular/router';
import { MasonryOptions } from 'angular2-masonry';
import { JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
@Component({
      moduleId: module.id,
    selector: 'artwork',
  templateUrl:'/app/artwork/categoryart/artwork.html',
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
       .brick { width: 300px; padding:10px; }
       .selected{font-size:20px; border-top:1px solid #ccc; border-bottom:1px solid #ccc; margin-left: -20px}
     `]


})
export class categoryart {
      @Input()
      id:any=0;
      sub:any;
      type:any;
      isloading:any;
      cattitle:string="";
      subcats:any;
      artList:any;
      firstvalue:any;
      selectedvalue:any;
      public myOptions: MasonryOptions = { 
  transitionDuration: '0.8s' 
};
loading: boolean = true;
urlstring="http://base.kmtrt.in/wallimages/imagepath/";
    constructor(private artservice:artservice, private jwtHelper:JwtHelper, private route:ActivatedRoute, private Router:Router) {
       this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
       this.selectedvalue=this.id;
       this.firstvalue=this.id;
        console.log(this.id);
     
});
       this.getAllArt(this.id);    
    }

getnewvalue(id){
    this.selectedvalue=id;
     this.getAllArt2(id);
}

    getAllArt(id) {
        this.isloading = true;
        this.artservice.getAllArtByCat(id).subscribe(x => {
            console.log(x);
            this.artList = x.message;
            this.cattitle=x.categorytitle;
            this.subcats=x.subcategories;
            this.isloading = false;
        }, error => {
            Materialize.toast(error);
                 this.isloading = false;
        });
    }

        getAllArt2(id) {
        this.isloading = true;
        this.artservice.getAllArtByCat(id).subscribe(x => {
            console.log(x);
            this.artList = x.message;
           // this.cattitle=x.categorytitle;
           // this.subcats=x.subcategories;
            this.isloading = false;
        }, error => {
            Materialize.toast(error);
                 this.isloading = false;
        });
    }

  

addtofav(item:any,id:any){
     if (!localStorage.getItem('auth_key') || this.jwtHelper.isTokenExpired(localStorage.getItem('auth_key'))){
            this.Router.navigate(['/account/login']);
     }else{
          this.isloading = true;
        this.artservice.addtofav(id).subscribe(x => {
            console.log(x);
            item.isfav=true;
            this.isloading = false;
        }, error => {
            Materialize.toast(error);
                 this.isloading = false;
        });
     }
}

removefav(item:any,id:any){
     if (!localStorage.getItem('auth_key') || this.jwtHelper.isTokenExpired(localStorage.getItem('auth_key'))){
            this.Router.navigate(['/account/login']);
     }else{
          this.isloading = true;
        this.artservice.removefav(id).subscribe(x => {
            console.log(x);
            item.isfav=false;
            this.isloading = false;
        }, error => {
            Materialize.toast(error);
                 this.isloading = false;
        });
     }
}

}