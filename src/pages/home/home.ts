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
  hasEvents;
  searchInput;
  selectedView = 'My Feed';
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
          this.events = data;
          this.events.length > 0 ? this.hasEvents = true : this.hasEvents = false;

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

  onViewClick()
  {
    this.selectedView == 'My Feed' ? this.selectedView = 'All' : this.selectedView = 'My Feed';
  }

  onSearchInput()
  {

  }

  onSearchCancel()
  {

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
