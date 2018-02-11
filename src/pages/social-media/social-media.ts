import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-soical-media',
    templateUrl: 'social-media.html',
})

export class SocialMediaPage {
    e = this.navParams.get('e');

    constructor(public viewController: ViewController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log(this.e)
    }

    closePage() {
        this.viewController.dismiss();
    }
}
