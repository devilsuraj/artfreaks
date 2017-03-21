import {Component} from '@angular/core';
@Component({
    selector:"test",
    templateUrl:"./app/artwork/testcomponent/index.html",
    styles:[``]
})
export class testcomponent{
    public isVisible:boolean=false;
    stringValue:string="";
    model:month=new month();
    newval:any[]=[
        {val:'January', Int:'1'},
        {val:'February', Int:'2'},
        {val:'March', Int:'3'},
        {val:'April', Int:'4'},
        {val:'May', Int:'5'},
    ]
    constructor(){}

    hello(){
        this.isVisible=true;
        this.stringValue="Hello";
    }

    bye(){
        this.isVisible=false;
        this.stringValue="Bye";
    }

    submit(sfd:month){
      this.newval.push(sfd);
        this.model=new month();
      
    }
}
export class month{
    val:any;
    Int:any;
}