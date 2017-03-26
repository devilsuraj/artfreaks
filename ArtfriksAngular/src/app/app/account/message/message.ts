import {Component}  from '@angular/core'
import {authservice} from '../../services/account/accountservice';
import * as Materialize from "angular2-materialize";
import { ActivatedRoute,Router } from '@angular/router';
import {artservice} from '../../services/artwork/artservice';
import { JwtHelper } from 'angular2-jwt';
declare var $:any;
@Component({
  selector:'inbox',
  templateUrl:'./app/account/message/message.html'
})
export class message{
    constructor(private _authservice:authservice, private _parentRouter:Router,private route: ActivatedRoute, private artservice:artservice
    , private Router:Router
    , private jwtHelper:JwtHelper){
      //  $('.collapsible').collapsible();
      this.getmessage();
    }
    isloading:boolean=false;
    art:any;
    messagemodel:any={};
    isOtp:boolean=false;
    model:any={};
    onebtnText="";
    messages:any=[];
    getmessage(){
        this.isloading=true;
        this.artservice.getMessages().subscribe(x=>{
            this.messages=x.message;
            this.isloading=false;
        })
    }
     getmessagereply(id){
        this.isloading=true;
        this.artservice.getMessagesReply(id.message.id).subscribe(x=>{
            console.log(x);
            id.replies=x.message;
            this.isloading=false;
        })
    }

     sendmessage(id:any, message:any){
     if (!localStorage.getItem('auth_key') || this.jwtHelper.isTokenExpired(localStorage.getItem('auth_key'))){
            this.Router.navigate(['/account/login']);
     }else{
          this.isloading = true;
          this.messagemodel.MessageId=id.message.id;
           this.messagemodel.message=message;
        this.artservice.postReplyMessage(this.messagemodel).subscribe(x => {
            console.log(x);
            this. getmessagereply(id);
            this.isloading = false;
               Materialize.toast("Your Message has been send , check your Inbox for replies");
        }, error => {
            Materialize.toast(error);
                 this.isloading = false;
        });
     }
     }
}