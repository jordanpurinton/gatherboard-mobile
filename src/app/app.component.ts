import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {DataProvider} from "../providers/data-provider";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                public dataProvider: DataProvider)
    {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();

            if (platform.is('ios')) {
                localStorage.setItem('Platform', 'Ios');
            }
            else {
                localStorage.setItem('Platform', 'Android');
            }

            this.dataProvider.getCategories()
                .subscribe(
                    data => {

                        let categories = [];

                        for (let i = 0; i < data.length; i++) {
                            categories.push(data[i].CatName);
                        }

                        localStorage.setItem('Categories', JSON.stringify(categories));
                        this.rootPage = TabsPage;
                    },
                    err => console.log(err)
                );
        });
    }
}

