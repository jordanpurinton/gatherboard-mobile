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
      console.log(this.dataProvider.getEvents());
      console.log(this.dataProvider.getEventDetail('cdec51e2')); // arbitrary event for example purposes
    });
  }
}

