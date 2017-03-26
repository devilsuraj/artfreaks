import {Component}  from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {artservice} from '../../services/artwork/artservice';
import * as Materialize from "angular2-materialize";
import { JwtHelper } from 'angular2-jwt';
@Component({
  selector:'contactartist',
  templateUrl:'./app/account/contactartist/contactartist.html'
})
export class contactartist{
    id: number;
    type:any;
    sub: any;
    art:any={};
    messagemodel:any={};
    isloading:boolean=false;
    loading: boolean = true;
    urlstring="http://base.kmtrt.in/wallimages/imagepath/";
    constructor(private route: ActivatedRoute, private artservice:artservice
    , private Router:Router
    , private jwtHelper:JwtHelper){
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

    sendmessage(id:any){
     if (!localStorage.getItem('auth_key') || this.jwtHelper.isTokenExpired(localStorage.getItem('auth_key'))){
            this.Router.navigate(['/account/login']);
     }else{
          this.isloading = true;
          this.messagemodel.ToUserId=this.art.user.id;
          this.messagemodel.artId=this.id;
          this.messagemodel.subject=this.art.art.artwork.title;
           this.messagemodel.message=id;
        this.artservice.postMessage(this.messagemodel).subscribe(x => {
            console.log(x);
            this.isloading = false;
               Materialize.toast("Your Message has been send , check your Inbox for replies");
        }, error => {
            Materialize.toast(error);
                 this.isloading = false;
        });
     }
}
}