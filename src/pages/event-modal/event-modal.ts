import { Component } from '@angular/core';
import * as _ from 'underscore';
import {IonicPage, NavParams, ViewController, ModalController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  e = this.navParams.get('e');

  constructor(public viewController: ViewController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.e)
  }

  closeModal()
  {
    this.viewController.dismiss();
  }

  escapeEntity(string)
  {
    return _.unescape(string);
  }
}
