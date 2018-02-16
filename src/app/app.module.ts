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
import {LocalNotifications} from "@ionic-native/local-notifications";
import {TabsPageModule} from "../pages/tabs/tabs.module";
import {HomePageModule} from "../pages/home/home.module";
import {MapPageModule} from "../pages/map/map.module";
import {SettingsPageModule} from "../pages/settings/settings.module";
import {EventModalPageModule} from "../pages/event-modal/event-modal.module";
import {SocialMediaPageModule} from "../pages/social-media/social-media.module";
import {EnableLocationPageModule} from "../pages/enable-location/enable-location.module";
import {StatusBarMock} from "../mocks/status-bar-mock";
import {SplashScreenMock} from "../mocks/splashscreen-mock";
import {DiagnosticMock} from "../mocks/diagnostic-mock";
import {ClassSelector} from "./class-selector";

let classSelector = new ClassSelector();

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        TabsPageModule,
        HomePageModule,
        MapPageModule,
        SettingsPageModule,
        EventModalPageModule,
        SocialMediaPageModule,
        EnableLocationPageModule,
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
        MyApp
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DataProvider,
        Geolocation,
        GoogleMaps,
        NativeGeocoder,
        LocalNotifications,
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
