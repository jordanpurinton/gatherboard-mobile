import {Component} from '@angular/core';
import {DataProvider} from "../../providers/data-provider";
import {Loading, LoadingController} from "ionic-angular";
import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{

  events;
  loading: Loading;
  platform = localStorage.getItem('Platform');

  constructor(public dataProvider: DataProvider,
              public loadingController: LoadingController)
  {
  }

  ionViewDidLoad()
  {
    this.createLoader();
    this.loading.present();
  }

  ionViewDidEnter()
  {
    this.dataProvider.getEvents()
      .subscribe(
        data => {
          console.log(data);
          this.events = data;
          for (let i = 0; i < this.events.length; i++) {
            if (i != 0) {
              this.events[i].PrevStartDate = this.events[i - 1].EventStartDate;
            }
          }
          this.dismissLoading();
        },
        err => {
          console.log(err);
          this.dismissLoading();
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

  formatStartDate(startDate)
  {
    return moment(startDate).format('M/D');
  }

  isTodayEvent(startDate)
  {
    return moment(startDate).format('M/D') == moment().format('M/D');
  }

  createLoader()
  {
    this.loading = this.loadingController.create({showBackdrop: false});
  }

  dismissLoading()
  {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

}
