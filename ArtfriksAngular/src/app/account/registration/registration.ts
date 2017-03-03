import { Component, OnInit, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import { authservice } from '../../services/account/accountservice';
import { artservice } from '../../services/artwork/artservice';
import * as Materialize from "angular2-materialize";
import { Router } from '@angular/router';
declare var google: any;
@Component({
    selector: 'registration',
    templateUrl: './app/account/registration/registration.html',
    /*styles:[`

.input-field span{font-family: MyriadPro-Condensed, sans-serif; font-style: normal; font-size:18px; font-weight:100; color: #000000; text-transform: uppercase;  }
.input-field label{font-family: MyriadPro-Condensed, sans-serif; font-style: normal; font-size:18px; font-weight:100; color: #000000; text-transform: uppercase;  }`],
    */animations: [
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
export class registration {
    constructor(private _parentRouter: Router, private _authservice: authservice, private artservice:artservice) { 
        this.getProfession();
    }
    OTP: boolean = false;
    model: any={} ;
    public input: any;
    updatemodel: any = [];
    last: boolean = false;
    onebtnText: string = "Next";
    isloading: boolean = false;
    ProfessionList:any=[];
   
    getProfession() {
        this.isloading = true;
        this.artservice.getProfession().subscribe(x => {
            console.log(x);
            this.ProfessionList = x;
            this.isloading = false;
        }, error => {
            console.log(error);
        });
    }
    public userRegister(creds: any) {
        if(this.check)
        {
               
        creds.CountryCode="+"+creds.CountryCode;
        this.onebtnText = "Loading...";
        this.isloading = true;
         /*   creds.Longitude=   this.model.Longitude;
            creds.Latitude=this.model.Latitude ;
            creds.FormattedAddress=this.model.FormattedAddress;*/
            creds.fullName=this.model.FirstName + " " + this.model.LastName;
         this._authservice.Register(creds)
            .subscribe(
            Ttoken => {
                if (Ttoken.status == 0) {
                    this.isloading = false; this.onebtnText = "Next";
                    this.updatemodel = creds;
                    this.OTP = true;
                    Materialize.toast("OTP sent to " + creds.Phone + " .", 3000);
                }
                 else if (Ttoken.status == 99) {
                     this.isloading = false; this.onebtnText = "Next";
                    this.updatemodel = creds;
                    this.OTP = true;
                    Materialize.toast("Confirm your OTP.", 3000);
                }
                else if (Ttoken.status == 5) {
                        this.isloading = false;
                this.onebtnText = "Next";
                    Materialize.toast(Ttoken.errors.description, 3000);
                }
                else if (Ttoken.status == 2)  {
                this.onebtnText = "Next";
                    Materialize.toast(Ttoken.errors[0].errors[0].errorMessage, 3000);
                    this.isloading = false;
                }
                else {
                this.onebtnText = "Next";
                    Materialize.toast(Ttoken.errors[0].description, 3000);
                    this.isloading = false;
                }
            },
            error => {
                if (error === "401") {
                         this.isloading = false;
                    this.handleError(error); this.onebtnText = "Next";
                }
                else
                    Materialize.toast(error.errors[0].description, 3000);
                this.isloading = false; this.onebtnText = "Next";
            });
        }else{
                 this.isloading = false;
             Materialize.toast("Please select Gender .", 3000);
               
        }
    }
check(){
    return true;
}
    public putUser(username: any) {
        this.isloading = true;
        this._authservice.putUser(username).subscribe(data => {
            if (data.status == 0) {
                Materialize.toast("Succesully Registerd...", 3000);
                this.last = true;
                this.isloading = false;
            }
            else {
                Materialize.toast(data.message, 3000);
                this.isloading = false;
            }
        },
            error => {
                Materialize.toast(error, 3000);
                this.isloading = false;
            });
    }

    public sendOTP(username: any) {
        if (!username.Phone ) {
            Materialize.toast("Enter your number", 300);
            return false;
        }
        this.isloading = true;
        this._authservice.sendotp( username.email,  username.CountryCode , username.Phone).subscribe(data => {
            if (data.status == 0) {
                Materialize.toast("OTP Sent Check your Inbox", 300);
                this.isloading = false;
            }
            else {
                Materialize.toast(data.message, 300);
                this.isloading = false;
            }
        },
            error => {
                Materialize.toast(error, 300);
                this.isloading = false;
            });
    }
    isOTP() {
        this.OTP = false;
    }
    public handleError(error: any) {
        if (error == "401") {
            this._authservice.refreshLogin()
                .subscribe(
                Ttoken => {
                    localStorage.setItem("auth_key", Ttoken.access_token);
                    localStorage.setItem("refresh_key", Ttoken.refresh_token);
                    this.isloading = false;
                    this._parentRouter.navigate(['/']);
                },
                error => {
                    Materialize.toast(error.error);
                    localStorage.removeItem("auth_key");
                    localStorage.removeItem("refresh_key");
                    this._parentRouter.navigate(['/']);
                    this.isloading = false;
                })
        }
        else {
            Materialize.toast(error.error);
            this.isloading = false;
        }
    }

       /* check(){
            var radios = (<HTMLInputElement>document.getElementsByName("male"));
            for (var i = 0, len = radios.length; i < len; i++) {
                if (radios[i].type == 'radio' && radios[i].checked) {
                    return true;
                }
            }
            return false;
        }*/

    initAutocomplete() {
        var instance = this, autocomplete;
        instance.input = document.getElementById('google_places_ac');
        autocomplete = new google.maps.places.Autocomplete(instance.input);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
              for (var i = 0; i < place.address_components.length; i++) {
                for (var j = 0; j < place.address_components[i].types.length; j++) {
                    if (place.address_components[i].types[j] == "postal_code") {
                    instance.model.PinCode = place.address_components[i].long_name;
                }
                  if (place.address_components[i].types[j] == "country") {
                    instance.model.Country = place.address_components[i].long_name;
                }
                  if (place.address_components[i].types[j] == "administrative_area_level_1") {
                    instance.model.State = place.address_components[i].long_name;
                }
                  if (place.address_components[i].types[j] == "administrative_area_level_2") {
                    instance.model.City = place.address_components[i].long_name;
                }else
                 instance.model.City = instance.model.State;
                }
                }

            instance.model.Longitude = place.geometry.location.lat();
            instance.model.Latitude = place.geometry.location.lng();
            instance.model.FormattedAddress=place.formatted_address;
            console.log(place);
            console.log(place.formatted_address);
            console.log(place.formatted_address.indexOf("Pune"));
            console.log( instance.model);
        });
    
        }
}

export class user{
    Longitude:any;
    Latitude:any;
    FormattedAddress:any;
    City:any;
    State:any;
    Country:any;
    PinCode:any;
    FirstName:any;
    LastName:any;
}