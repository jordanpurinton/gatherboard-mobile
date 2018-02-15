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
import {GoogleMaps} from '@ionic-native/google-maps';
import {NativeGeocoder} from '@ionic-native/native-geocoder';
import {IonicStorageModule} from "@ionic/storage";
import {SocialMediaPage} from "../pages/social-media/social-media";
import {Geolocation} from "@ionic-native/geolocation";
import {Diagnostic} from "@ionic-native/diagnostic";
import {EnableLocationPage} from "../pages/enable-location/enable-location";
import {DiagnosticMock} from '../mocks/diagnostic-mock';
import {SplashScreenMock} from '../mocks/splashscreen-mock';
import {StatusBarMock} from '../mocks/status-bar-mock';
import {ClassSelector} from './class-selector';
import {LocalNotifications} from "@ionic-native/local-notifications";

// let classSelector = new ClassSelector();

@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        HomePage,
        MapPage,
        SettingsPage,
        EventCardComponent,
        EventModalPage,
        SocialMediaPage,
        EnableLocationPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(MyApp, {
            platforms: {
                ios: {
                    statusbarPadding: true
                }
            }
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        HomePage,
        MapPage,
        SettingsPage,
        EventModalPage,
        SocialMediaPage,
        EnableLocationPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DataProvider,
        Geolocation,
        GoogleMaps,
        NativeGeocoder,
        LocalNotifications,
        // enable these when trying to test out device functionality
        StatusBar,
        SplashScreen,
        Diagnostic,

        // comment these out when you're trying to test out device functionality and enable the real ones above
        // classSelector.getProvider(Diagnostic, DiagnosticMock),
        // classSelector.getProvider(SplashScreen, SplashScreenMock),
        // classSelector.getProvider(StatusBar, StatusBarMock),
    ]
})
export class AppModule {
}
