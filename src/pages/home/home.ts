import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data-provider";
import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{

  events;

  constructor(public navCtrl: NavController,
              public dataProvider: DataProvider)
  {

  }

  ionViewDidEnter()
  {
    this.dataProvider.getEvents()
      .subscribe(
        data =>
        {
          this.events = data;
        }
      )
  }

  formatStartTime(startTime)
  {
    let firstIndex = parseInt(startTime[0]);
    let secondIndex = parseInt(startTime[1]);
    let combined = startTime[0] + startTime[1];
    let combinedInt = parseInt(combined);

    // 13:00 - 23:59
    if(combinedInt > 12) {
      return (combinedInt - 12).toString() + ':' + startTime[3] + startTime[4] + 'p';
    }

    // 12:00p - 12:59p
    else if(firstIndex == 1 && secondIndex == 2) {
      return startTime.substring(0, startTime.length - 3) + 'p';
    }

    // 00:00 - 11:59
    else {
      return startTime.substring(0, startTime.length - 3) + 'a';
    }
  }

}
