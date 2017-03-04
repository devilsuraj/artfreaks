import { Component,Input, OnInit, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import {artservice} from '../../services/artwork/artservice';
import * as Materialize from "angular2-materialize";
@Component({
      moduleId: module.id,
    selector: 'artwork',
  templateUrl:'/app/artwork/artwork/artwork.html',
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

    ]

})
export class artwork {
      @Input()
      id:any=0;

      isloading:any;
      artList:any;
loading: boolean = true
    constructor(private artservice:artservice) {
        this.getAllArt()
    }

 getAllArt() {
        this.isloading = true;
        this.artservice.getAllArt().subscribe(x => {
            console.log(x);
            this.artList = x.message;
            this.isloading = false;
        }, error => {
            Materialize.toast(error);
        });
    }

}