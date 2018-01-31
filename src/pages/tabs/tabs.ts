import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {HomePage} from "../home/home";
import {MapPage} from "../map/map";
import {SettingsPage} from "../settings/settings";

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    @ViewChild('gatherboardTabs') tabs: Tabs;
    home = HomePage;
    map = MapPage;
    settings = SettingsPage;

    constructor(public navCtrl: NavController, public navParams: NavParams)
    {
    }

    ionViewDidEnter()
    {
        this.tabs.select(0);
    }

    ionViewDidLoad()
    {
    }

}
