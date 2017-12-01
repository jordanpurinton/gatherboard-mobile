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
    return startTime.substring(0, startTime.length - 3);
  }

}
