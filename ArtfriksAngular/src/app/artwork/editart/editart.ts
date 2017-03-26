import { Component, Input, NgZone, Inject, OnInit, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import { artservice } from '../../services/artwork/artservice';
import { Configuration } from '../../services/app/app.config';
import { Router, ActivatedRoute } from '@angular/router';
import { authservice } from '../../services/account/accountservice';
import * as Materialize from "angular2-materialize";
declare var $: any;
@Component({
    moduleId: module.id,
    selector: 'uploadart',
    templateUrl: '/app/artwork/editart/editart.html',
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
    styles: [`.btns{display:none; width:1px; height:1px; position:absolute;}
    .btn-orange{display:none}
    .btn-red{display:none}
    .file-droppa-container{cursor:pointer}
    .chip {
  display: inline-block;
  height: 32px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  line-height: 32px;
  padding: 0 12px;
  background-color: #FFF;
  margin-bottom: 5px;
  margin-right: 5px;
  border:1px solid #CCC;
}
    `]

})
export class editartwork {
    @Input()
    id: any = 0;
    ImagePath: any = "";
    isloading: boolean = true;
    isimage: boolean = false;
    tag: any;
    model: uploadartmodel = new uploadartmodel();
    modeltags: ArtWithTag[];
    TagList: string = this.config.Server + "/api/artowrk/Tags?name=:keyword";
    categroryList: any = [];
    subcategroryList: any = [];
    typeList: any = [];
    unitList: any = [];
    art: any;
    posterkeyword: any = [];
    MediumsList: any = [];
    posttag: tags[] = [];
    specialTagList: any = [];
    PostTags: PostTags[] = [];
    sub: any;

    postkeyword: any = [];

    custMedia: boolean = false;

    constructor(private artservice: artservice,
        private config: Configuration,
        private authervice: authservice,
        private _parentRouter: Router,
        private route: ActivatedRoute) {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            console.log(this.id);
            this.getartdetails(this.id);
        });

    }

    ngOnInit() {
        this.getCategories();
        this.getTypes();
        this.getUnits();
        this.getMediums();
        this.getTags();
    }
    addtag(data) {
        console.log(data);
        var tag: tags = new tags();
        tag.id = data.id;
        tag.tag = data.tag;
        console.log(tag);
        this.posttag.push(tag);
        this.specialTagList.splice(this.specialTagList.indexOf(tag), 1);
        console.log(this.posttag.length);
        $('#auto').val('');
    }

    server = this.config.Server + "/picture/save";
    imgserver = this.config.Server;

    uploadart(art: any) {
        art.category = art.subcategrory;
        if (this.posttag.length > 0) {
            this.isloading = true;
            art.PictureUrl = this.ImagePath;
            this.artservice.updateArt(art).subscribe(x => {
                console.log(x);

                for (let entry of this.posttag) {
                    this.PostTags.push({ artId: x.id, tagId: entry.id })
                }
                this.artservice.postArt(this.PostTags).subscribe(x => {
                    Materialize.toast(x.message);
                    this._parentRouter.navigate(['/account/profile/myart']);
                    this.isloading = false;

                    ///Post all keywords

                    this.artservice.postKeywords(this.posterkeyword).subscribe(x => {
                        Materialize.toast(x.message);
                        this._parentRouter.navigate(['/']);
                        this.isloading = false;
                    }
                        , error => {
                            this.isloading = false;
                            this.handleError(error);
                        });

                    /// end 
                }
                    , error => {
                        this.isloading = false;
                        this.handleError(error);
                    });

            }, error => {
                // this.isloading = false;
                console.log(error);
                this.handleError(error);
            });
        }
        else {
            Materialize.toast("Please add descriptive tags");
        }
    }

    getartdetails(id) {
        this.isloading = true;
        this.artservice.getArtById(id).subscribe(x => {

            this.model = x.art.artwork;
            // this.posttag=x.art.tags;
            x.art.tags.forEach(element => {
                this.posttag.push(element.tags);
            });
            this.isimage = true;
            this.ImagePath = x.art.artwork.pictureUrl;
            console.log(this.art);
            this.isloading = false;
        }, error => {
            Materialize.toast(error);
            this.isloading = false;
        });
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

    getTags() {
        this.isloading = true;
        this.artservice.getSpecialTags("Special").subscribe(x => {
            console.log(x);
            this.specialTagList = x;
            this.isloading = false;
        }, error => {
            Materialize.toast(error);
        });
    }

    getSubCategories(id) {
        this.isloading = true;

        this.artservice.getSubCategories(id).subscribe(x => {
            console.log(x);
            this.subcategroryList = x;
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
    public handleError(error: any) {
        if (error == "401") {
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
        else {
            Materialize.toast(error.error);

            this.isloading = false;

        }
    }
}

export class uploadartmodel {
    public id: any;
    public pictureUrl: any;
    public title: any;
    public description: any;
    public userId: any;
    public price: any;
    public width: any;
    public height: any;
    public dimensionUnit: any;
    public mediumString: any;
    public addedDate: any;
    public termAccepted: any;
    public status: any;// 0 for new , 1 for approved , 2 for rejected , 3 for deleted
    public category: any;// 0 for normal - 1 for deals - 2 for anything else
}

export class ArtWithTag {
    ArtId: any;
    TagId: any;
}


export class tags {
    id: any;
    tag: any;
}

export class PostTags {

    artId: any;
    tagId: any;
}