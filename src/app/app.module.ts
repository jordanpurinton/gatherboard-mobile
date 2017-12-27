import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {DataProvider} from '../providers/data-provider';
import {HttpClientModule} from "@angular/common/http";
import {EventCardComponent} from "../components/event-card/event-card";
import {TabsPage} from "../pages/tabs/tabs";
import {MapPage} from "../pages/map/map";
import {SettingsPage} from "../pages/settings/settings";
import {EventModalPage} from "../pages/event-modal/event-modal";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    MapPage,
    SettingsPage,
    EventCardComponent,
    EventModalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    MapPage,
    SettingsPage,
    EventModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule
{
}
