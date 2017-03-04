import { Component, Input, NgZone, Inject, OnInit, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import { artservice } from '../../services/artwork/artservice';
import { Configuration } from '../../services/app/app.config';
import { Router } from '@angular/router';
import {authservice} from '../../services/account/accountservice';
import * as Materialize from "angular2-materialize";
declare var $:any;
@Component({
    moduleId: module.id,
    selector: 'uploadart',
    templateUrl: '/app/artwork/uploadart/uploadart.html',
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
export class uploadartwork {
    @Input()
    id: any = 0;
    ImagePath: any = "";
    isloading: boolean = true;
    isimage: boolean = false;
    tag:any;
    model: uploadartmodel = new uploadartmodel();
    modeltags: ArtWithTag[];
    TagList: string = this.config.Server + "/api/artowrk/Tags?name=:keyword";
    categroryList: any = [];
    typeList:any=[];
    unitList:any=[];
    MediumsList:any=[];
    posttag:tags[]=[];
    PostTags:PostTags[]=[];
    constructor(private artservice: artservice, 
    private config: Configuration, 
    private authervice:authservice,
     private _parentRouter: Router) { }

    ngOnInit(){
        this.getCategories();
        this.getTypes();
        this.getUnits();
        this.getMediums();
    }
    addtag(data)
    {
        console.log(data);
        var tag:tags=new tags();
        tag.id=data.id;
        tag.tag=data.tag;
        console.log(tag);
        this.posttag.push(tag);
        console.log(this.posttag.length);
        $('#auto').val('');
    }

    server = this.config.Server + "/picture/save";
    imgserver = this.config.Server;
    fileUploaded(data, response) {
        console.log(data);
        console.log(response);
        if (data) {
            let body = JSON.parse(data[1]);
            console.log(body);
            console.log(body.message);
            this.ImagePath = body.message;
            this.isimage = true;
        }
    }
    uploadart(art:any){
        if(this.posttag.length>0){
          this.isloading = true;
          art.PictureUrl= this.ImagePath;
        this.artservice.uploadArt(art).subscribe(x => {
            console.log(x);
        
            for (let entry of this.posttag) 
            {
                    this.PostTags.push({artId:x.id,tagId:entry.id})
            }
               this.artservice.postArt(this.PostTags).subscribe(x => {
                    Materialize.toast(x.message);
                        this.isloading = false;
               }
               ,error=>{
    this.isloading = false;
        this.handleError(error);
               });

        }, error => {
               // this.isloading = false;
            console.log(error);
            this.handleError(error);
        }); }
        else{
                Materialize.toast("Please add descriptive tags");
        }
    }

    filesUpdated(files: any) {
      
        console.log("Store state updated! Current state: ", files)
    }

    beforeRequest(xhr: any) {
        //xhr.setRequestHeader("Hello","World");
    }


    beforeFileUpload(formData: any) {
          this.isimage = false;
        return formData;
    }


    beforeAddFile(file: any) {
        return true;
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

     getTypes() {
        this.isloading = true;

        this.artservice.getTypes().subscribe(x => {
            console.log(x);
            this.typeList = x;
            this.isloading = false;
        }, error => {
            console.log(error);
        });
    }

    getUnits() {
        this.isloading = true;

        this.artservice.getUnits().subscribe(x => {
            console.log(x);
            this.unitList = x;
            this.isloading = false;
        }, error => {
            console.log(error);
        });
    }

      getMediums() {
        this.isloading = true;

        this.artservice.getMediums().subscribe(x => {
            console.log(x);
            this.MediumsList = x;
            this.isloading = false;
        }, error => {
            console.log(error);
        });
    }
    public handleError(error:any){
      if(error=="401")
      {
         this.authervice.refreshLogin()
            .subscribe(
            Ttoken => {
                localStorage.setItem("auth_key", Ttoken.access_token);
                localStorage.setItem("refresh_key", Ttoken.refresh_token);
                this.isloading = false;
            
                this._parentRouter.navigate(['account/login']);
            },
            error => {
           // demo.showNotification('bottom', 'center',  error.error  );
           localStorage.removeItem("auth_key");
               localStorage.removeItem("refresh_key");
               this._parentRouter.navigate(['account/login']);
                  this.isloading = false;
                
            })
      }
      else{
       Materialize.toast(  error.error  );
     
             this.isloading = false;
             
      }
    }
}

export class uploadartmodel {
    public Id: any;
    public PictureUrl: any;
    public Title: any;
    public Description: any;
    public UserId: any;
    public Price: any;
    public Width: any;
    public Height: any;
    public DimensionUnit: any;
    public MediumString: any;
    public AddedDate: any;
    public TermAccepted: any;
    public Status: any;// 0 for new , 1 for approved , 2 for rejected , 3 for deleted
    public Category: any;// 0 for normal - 1 for deals - 2 for anything else
}

export class ArtWithTag {
    ArtId: any;
    TagId: any;
}


export class tags {
   id: any;
  tag: any;
}

export class PostTags{

    artId:any;
    tagId:any;
}