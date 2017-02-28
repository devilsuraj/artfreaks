import { Component, Input, NgZone,Inject, OnInit, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import { artservice } from '../../services/artwork/artservice';
import { Configuration } from '../../services/app/app.config';
@Component({
    moduleId: module.id,
    selector: 'artwork',
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
    //options: NgUploaderOptions;
      /**
     * You can override default dropZone area template with [dropZoneTemplate] parameter passed to fileDroppa component
     */
    //public dropZoneTemplate = `
    //    <div class="awesome_override_xxx">Here I'm overriding library template</div>
    //`;
    /**
     * EVENTS
     */
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
        //console.log(response.headers);
       /* console.log(success.message);
        console.log(success);
        success && console.log("uploaded - awesome", response);
        success || console.log("not uploaded - very bad", response);*/
    }

    filesUpdated(files:any) {
         this.isimage=false;
        console.log("Store state updated! Current state: ", files)
    }

    /**
     * CALLBACKS
     */

    /**
     * This method is called before Request happened
     * You can modify xhr confoguration in it
     * requestHeaders for example
     *
     * @param xhr
     */
    beforeRequest(xhr:any){
        //xhr.setRequestHeader("Hello","World");
    }

    /**
     * This method allows you to make validation before file is sent
     * You can update fileName for example
     * Or you can return null and file won't be send
     *
     * @param formData
     * @returns formData or null
     */
    beforeFileUpload(formData:any){
        return formData;
    }

    /**
     * This method is called once your drop or select files
     * You can validate and decline or accept file
     *
     * @param file
     * @returns Boolean
     */
    beforeAddFile(file:any){
        return true;
    }
}