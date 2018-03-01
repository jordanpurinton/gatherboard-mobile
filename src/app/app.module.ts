import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {DataProvider} from '../providers/data-provider';
import {HttpClientModule} from "@angular/common/http";
import {GoogleMaps} from '@ionic-native/google-maps';
import {NativeGeocoder} from '@ionic-native/native-geocoder';
import {IonicStorageModule} from "@ionic/storage";
import {Geolocation} from "@ionic-native/geolocation";
import {Diagnostic} from "@ionic-native/diagnostic";
import {DiagnosticMock} from '../mocks/diagnostic-mock';
import {SplashScreenMock} from '../mocks/splashscreen-mock';
import {StatusBarMock} from '../mocks/status-bar-mock';
import {ClassSelector} from './class-selector';
import {LocalNotifications} from "@ionic-native/local-notifications";
import {SocialSharing} from '@ionic-native/social-sharing';
import {HttpModule} from '@angular/http';
import {EnableLocationPageModule} from "../pages/enable-location/enable-location.module";
import {SocialMediaPageModule} from "../pages/social-media/social-media.module";
import {EventModalPageModule} from "../pages/event-modal/event-modal.module";
import {SettingsPageModule} from "../pages/settings/settings.module";
import {MapPageModule} from "../pages/map/map.module";
import {RemindersPageModule} from "../pages/reminders/reminders.module";
import {HomePageModule} from "../pages/home/home.module";
import {TabsPageModule} from "../pages/tabs/tabs.module";
import {Calendar} from "@ionic-native/calendar";
import {CalendarPageModule} from "../pages/calendar/calendar.module";
import {NgCalendarModule} from "ionic2-calendar";

let classSelector = new ClassSelector();

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        TabsPageModule,
        HomePageModule,
        RemindersPageModule,
        MapPageModule,
        SettingsPageModule,
        NgCalendarModule,
        CalendarPageModule,
        EventModalPageModule,
        SocialMediaPageModule,
        EnableLocationPageModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(MyApp, {
            platforms: {
                ios: {
                    statusbarPadding: true
                }
            }
        }),
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DataProvider,
        Geolocation,
        GoogleMaps,
        NativeGeocoder,
        LocalNotifications,
        SocialSharing,
        Calendar,
        // enable these when trying to test out device functionality
        // StatusBar,
        // SplashScreen,
        // Diagnostic,

        // comment these out when you're trying to test out device functionality and enable the real ones above
        classSelector.getProvider(Diagnostic, DiagnosticMock),
        classSelector.getProvider(SplashScreen, SplashScreenMock),
        classSelector.getProvider(StatusBar, StatusBarMock),
    ]
})
export class AppModule {
}
