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
  
  formatStartTime(startTime) {
    let firstIndex = parseInt(startTime[0]);
    let secondIndex = parseInt(startTime[1]);
    let combined = startTime[0] + startTime[1];
    let combinedInt = parseInt(combined);

    // remove trailing 0
    if (parseInt(startTime[0]) == 0) {
        startTime = startTime.substring(1, startTime.length + 1);
    }

    // 13:00 - 23:59
    if (combinedInt > 12) {
        return (combinedInt - 12).toString() + ':' + startTime[3] + startTime[4] + 'p';
    }

    // 12:00p - 12:59p
    else if (firstIndex == 1 && secondIndex == 2) {
        return startTime.substring(0, startTime.length - 3) + 'p';
    }

    // 00:00 - 11:59
    else {
        return startTime.substring(0, startTime.length - 3) + 'a';
    }
  }
  
  formatDate(eventDate){
    
  }
  
}