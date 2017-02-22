import {Input, Component } from '@angular/core'
@Component({
  selector:'image',
  templateUrl:'./app/shared/image/image.html'
})
export class ImageModule{
    @Input()
    src:string="/images/preloader.gif";

   @Input()
    width:string="16";

   @Input()
    alt:string="...";

loading: boolean = true
onLoad() {
    this.loading = false;
}
}