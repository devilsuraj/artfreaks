import { Component, Input, NgZone,Inject, OnInit, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import { artservice } from '../../services/artwork/artservice';
import { Configuration } from '../../services/app/app.config';
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
    loading: boolean = true;
    isimage:boolean=false;
    constructor(private artservice:artservice, private config:Configuration){}
    server = this.config.Server+"/picture/save";
    fileUploaded(data, response){
        console.log(data);
        console.log(response);
        if(data)
        {
            let body =JSON.parse( data[1]);
            console.log(body);
            console.log(body.message);
            this.ImagePath=body.message;
            this.isimage=false;
        }
    }

    filesUpdated(files:any) {
         this.isimage=false;
        console.log("Store state updated! Current state: ", files)
    }

    beforeRequest(xhr:any){
        //xhr.setRequestHeader("Hello","World");
    }

   
    beforeFileUpload(formData:any){
        return formData;
    }

  
    beforeAddFile(file:any){
        return true;
    }
}