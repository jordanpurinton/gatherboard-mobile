import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {DataProvider} from "../providers/data-provider";
import {TabsPage} from "../pages/tabs/tabs";
import {Diagnostic} from "@ionic-native/diagnostic";
import {Storage} from "@ionic/storage";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                public storage: Storage,
                public dataProvider: DataProvider) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();

            if (platform.is('ios')) {
                this.storage.set('Platform', 'Ios');
            }
            else {
                this.storage.set('Platform', 'Android');
            }

            this.dataProvider.getCategories()
                .subscribe(
                    data => {

                        let categories = [];

                        for (let i = 0; i < data.length; i++) {
                            categories.push(data[i].CatName);
                        }

                        this.storage.set('Categories', JSON.stringify(categories));
                        this.rootPage = TabsPage;
                    },
                    err => console.log(err)
                );
        });
    }
}

