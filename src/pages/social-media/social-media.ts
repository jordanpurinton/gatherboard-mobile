import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-soical-media',
  templateUrl: 'social-medial.html',
})
export class SocialMediaPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.e)
  }

  closePage()
  {
    this.viewController.dismiss();
  }
}
