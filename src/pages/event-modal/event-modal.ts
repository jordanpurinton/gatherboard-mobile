import {Component} from '@angular/core';
import * as _ from 'he';
import {IonicPage, NavParams, ViewController, ModalController, Platform} from 'ionic-angular';
import moment from "moment";
import {DataProvider} from "../../providers/data-provider";

@IonicPage()
@Component({
    selector: 'page-event-modal',
    templateUrl: 'event-modal.html',
})
export class EventModalPage {

    e = this.navParams.get('e');
    isExpandedText = false;
    category = this.e.ParentCatName.replace(' ', '');
    iconName = '';
    iconColorMap = {
        'Education': '#f1a007', 'Food': '#9F2200', 'Art': '#0C5FAF', 'Music': '#00845E',
        'Sports': '#ff8514', 'Business': '#708090', 'Government': '#70005D'
    };

    constructor(public viewController: ViewController,
                public platform: Platform,
                public navParams: NavParams) {
        console.log(this.escapeEntity(this.e.Description).length)
    }

    ionViewWillLoad() {
        if (this.category == 'Education') {
            this.iconName = 'school';
        }

        else if (this.category == 'Food') {
            this.iconName = 'restaurant';
        }

        else if (this.category == 'Art') {
            this.iconName = 'color-palette';
        }

        else if (this.category == 'Music') {
            this.iconName = 'musical-notes';
        }

        else if (this.category == 'Sports') {
            this.iconName = 'american-football';
        }

        else if (this.category == 'Business') {
            this.iconName = 'briefcase';
        }

        else if (this.category == 'Government') {
            this.iconName = 'megaphone';
        }

        else {
            this.iconColorMap[this.category] = '#cacfd4';
            this.iconName = 'star';
        }
    }

    closeModal() {
        this.viewController.dismiss();
    }

    expandDescription() {
        this.isExpandedText = true;
    }

    collapseDescription() {
        this.isExpandedText = false;
    }

    formatStartTime(startTime) {
        let firstIndex = parseInt(startTime[0]);
        let secondIndex = parseInt(startTime[1]);
        let combined = startTime[0] + startTime[1];
        let combinedInt = parseInt(combined);

        // remove trailing 0
        if (parseInt(startTime[0]) == 0) {
            startTime = startTime.substring(1, startTime.length + 1);
        }

        // 13:00 - 23:59
        if (combinedInt > 12) {
            return (combinedInt - 12).toString() + ':' + startTime[3] + startTime[4] + 'p';
        }

        // 12:00p - 12:59p
        else if (firstIndex == 1 && secondIndex == 2) {
            return startTime.substring(0, startTime.length - 3) + 'p';
        }

        // 00:00 - 11:59
        else {
            return startTime.substring(0, startTime.length - 3) + 'a';
        }
    }

    // format string to M/D format
    formatStartDate(startDate) {
        return moment(startDate).format('M/D');
    }

    escapeEntity(string) {
        return _.decode(string);
    }
}