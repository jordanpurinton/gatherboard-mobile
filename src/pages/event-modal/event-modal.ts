import {Component} from '@angular/core';
import * as _ from 'underscore';
import {IonicPage, NavParams, ViewController, ModalController} from 'ionic-angular';
import {SocialMediaPage} from "../../pages/social-media/social-media";

@IonicPage()
@Component({
    selector: 'page-event-modal',
    templateUrl: 'event-modal.html',
})
export class EventModalPage {

    e = this.navParams.get('e');

    constructor(public viewController: ViewController,
                public modalController: ModalController,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log(this.e)
    }

    openModal() {
        let modal = this.modalController.create(SocialMediaPage, {'e': this.e});
        modal.present();
    }

    closeModal() {
        this.viewController.dismiss();
    }

    escapeEntity(string) {
        return _.unescape(string);
    }
}
