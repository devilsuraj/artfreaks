"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var header_1 = require('./header/header');
var footer_1 = require('./footer/footer');
var loader_1 = require('./loader/loader');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var platform_browser_1 = require('@angular/platform-browser');
var image_1 = require('./image/image');
var registration_1 = require('../account/registration/registration');
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule,
                common_1.CommonModule],
            declarations: [header_1.header, footer_1.footer, loader_1.loader, image_1.ImageModule],
            exports: [header_1.header, footer_1.footer, loader_1.loader]
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
exports.MODULE_ROUTES = [
    { path: '', pathMatch: 'full', component: registration_1.registration },
];
exports.routing = router_1.RouterModule.forRoot(exports.MODULE_ROUTES);
//# sourceMappingURL=sharedmodule.js.map