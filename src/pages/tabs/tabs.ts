import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {HomePage} from "../home/home";
import {SettingsPage} from "../settings/settings";
import {PlannerPage} from "../planner/planner";

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    @ViewChild('gatherboardTabs') tabs: Tabs;
    home = HomePage;
    planner = PlannerPage;
    settings = SettingsPage;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidEnter() {
        this.tabs.select(0);
    }

    ionViewDidLoad() {
    }

}
