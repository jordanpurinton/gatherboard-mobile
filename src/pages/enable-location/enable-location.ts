import { Component } from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {Diagnostic} from "@ionic-native/diagnostic";
import {Geolocation} from "@ionic-native/geolocation";

@IonicPage()
@Component({
  selector: 'page-enable-location',
  templateUrl: 'enable-location.html',
})
export class EnableLocationPage {

  constructor(public diagnostic: Diagnostic,
              public geolocation: Geolocation,
              public viewControl: ViewController) {
  }

  onToggleClick() {
    this.diagnostic.switchToSettings();
  }

  closeModal() {
      this.viewControl.dismiss();
  }

}
