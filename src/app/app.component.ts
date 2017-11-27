import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {DataProvider} from "../providers/data-provider";
@Component({
  templateUrl: 'app.html'
})
export class MyApp
{
  rootPage: any = HomePage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public dataProvider: DataProvider)
  {
    platform.ready().then(() =>
    {
      statusBar.styleDefault();
      splashScreen.hide();

      this.dataProvider.getEvents()
        .subscribe(
        data => console.log(data),
          err => console.log(err)
      );
      this.dataProvider.getEventDetail('af9c566e')
        .subscribe(
          data => console.log(data),
          err => console.log(err)
        ); // arbitrary event for example purposes
    });

    this.dataProvider.getVenues()
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      )
  }
}

