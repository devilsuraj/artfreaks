import { Component, OnInit, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import { authservice } from '../../services/account/accountservice';
import * as Materialize from "angular2-materialize";
import { Router } from '@angular/router';
declare var google: any;
@Component({
    selector: 'registration',
    templateUrl: './app/account/registration/registration.html',
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
export class registration {
    constructor(private _parentRouter: Router, private _authservice: authservice) { }
    OTP: boolean = false;
    model: any = [];
    public input: any;
    updatemodel: any = [];
    last: boolean = false;
    onebtnText: string = "Next";
    isloading: boolean = false;
    ngOnInit() {

    }

    public userRegister(creds: any) {
        this.onebtnText = "Loading...";
        this.isloading = true;
      creds.Longitude=   this.model.Longitude;
            creds.Latitude=this.model.Latitude ;
            creds.FormattedAddress=this.model.FormattedAddress;
        this._authservice.Register(creds)
            .subscribe(
            Ttoken => {
                if (Ttoken.status == 0) {
                    this.isloading = false; this.onebtnText = "Next";
                    this.updatemodel = creds;
                    this.OTP = true;
                    Materialize.toast("OTP sent to " + creds.phone + " .", 3000);
                }
                else if (Ttoken.status == 0) {
                this.onebtnText = "Next";
                    Materialize.toast("Please check all fields", 3000);
                }
                else {
                this.onebtnText = "Next";
                    Materialize.toast(Ttoken.errors[0].description);
                    this.isloading = false;
                }
            },
            error => {
                if (error === "401") {
                    this.handleError(error); this.onebtnText = "Next";
                }
                else
                    Materialize.toast(error.errors[0].description);
                this.isloading = false; this.onebtnText = "Next";
            });
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
        if (!username || username.phone === undefined) {
            Materialize.toast("Enter your number", 300);
            return false;
        }
        this.isloading = true;
        this._authservice.sendotp(username).subscribe(data => {
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

    initAutocomplete() {
        var instance = this, autocomplete;;
        instance.input = document.getElementById('google_places_ac');
        autocomplete = new google.maps.places.Autocomplete(instance.input);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
               if (place.address_components[i].types[j] == "postal_code") {

          document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;



        }
            instance.model.Longitude = place.geometry.location.lat();
            instance.model.Latitude = place.geometry.location.lng();
            instance.model.FormattedAddress=place.formatted_address;
            console.log(place);
            console.log(place.formatted_address);
            console.log(place.formatted_address.indexOf("Pune"));
            console.log(place);
        }
    
        }
}