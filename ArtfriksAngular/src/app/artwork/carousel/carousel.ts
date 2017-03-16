import {Component}  from '@angular/core';
import * as Materialize from "angular2-materialize";
import {artservice} from '../../services/artwork/artservice';
declare var $:any;
@Component({
  selector:'home',
  templateUrl:'./app/artwork/carousel/carousel.html',
  styles:[`
  

.item-image {
     background-color: white;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: left top;
}



`]
})
export class carousel{
  isloading:boolean;
  artList:any={};
  urlstring="http://base.kmtrt.in/wallimages/imagepath/";
  constructor(private artservice:artservice){}
  ngOnInit(){
    this.gethomedata();
    
}


    gethomedata() {
        this.isloading = true;
        this.artservice.gethomedata().subscribe(x => {
            console.log(x);
            this.artList = x;
            this.isloading = false;
               var str="";
                this.artList.slider.forEach(element => {
                str  = str+`
                <div class="item" >
                <a href="/#/art/${element.art.id}">
                <img src="${this.urlstring}thumb-${element.art.pictureUrl}" alt="" class="responsive-img"/>
                </a>
                </div>
               `;
                  
                });
                 
                 var slider =   $("#owl-demo");
                 slider.append(str);
                 console.log(str);
              $("#owl-demo").owlCarousel({
                  autoPlay: 3000, //Set AutoPlay to 3 seconds
                  items : 4,
                     itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]

              });
        }, error => {
            Materialize.toast(error);
                 this.isloading = false;
        });
    }

}