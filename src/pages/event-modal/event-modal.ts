import {Component} from '@angular/core';
import * as _ from 'he';
import {
    IonicPage, NavParams, ViewController, ModalController, Platform, AlertController,
    ToastController
} from 'ionic-angular';
import moment from "moment";
import {LocalNotifications} from '@ionic-native/local-notifications';
import {Global} from "../../providers/global";

@IonicPage()
@Component({
    selector: 'page-event-modal',
    templateUrl: 'event-modal.html',
})
export class EventModalPage {

    e = this.navParams.get('e');
    isExpandedText = false;
    category = this.e.ParentCatName.replace(' ', '');
    alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    notificationId = this.getNotificationId(this.e.UID);
    hasNotification = false;
    iconName = '';
    iconColorMap = Global.iconColorMap;

    constructor(public viewController: ViewController,
                public platform: Platform,
                public toastController: ToastController,
                public localNotifications: LocalNotifications,
                public alertController: AlertController,
                public navParams: NavParams) {
        console.log(this.e);
    }

    ionViewWillLoad() {
        if (this.platform.is('cordova')) {
            this.localNotifications.isPresent(this.notificationId).then(
                data => {
                    if (data) {
                        this.hasNotification = true;
                    }
                })
        }
    }

    closeModal() {
        this.viewController.dismiss();
    }

    onBellIconClick() {
        if (!this.hasNotification) {
            let alert = this.alertController.create({
                title: 'Set Reminder',
                message: 'Would you like to set a reminder for this event?',
                buttons:
                    [{text: 'Cancel'},
                        {
                            text: 'Yes',
                            handler: () => {
                                this.localNotifications.schedule({
                                    id: this.notificationId,
                                    title: 'Reminder',
                                    text: this.escapeEntity(this.e.EventTitle) + ' begins in x time.',
                                    at: new Date(new Date().getTime() + 3600) // arbitrary time
                                });
                                let toast = this.toastController.create({
                                    message: 'Reminder added',
                                    duration: 3000,
                                    position: 'top'
                                });
                                toast.present();
                                this.viewController.dismiss();
                            }
                        }]
            });
            alert.present();
        }
        else {
            let alert = this.alertController.create({
                title: 'Cancel Reminder',
                message: 'Would you like to cancel the reminder for this event?',
                buttons:
                    [{text: 'Cancel'},
                        {
                            text: 'Yes',
                            handler: () => {
                                this.localNotifications.clear(this.notificationId).then(
                                    data => {
                                        console.log(data);
                                        let toast = this.toastController.create({
                                            message: 'Reminder deleted',
                                            duration: 3000,
                                            position: 'top'
                                        });
                                        toast.present();
                                        this.viewController.dismiss();
                                    }
                                )
                            }
                        }]
            });
            alert.present();
        }
    }

    expandDescription() {
        this.isExpandedText = true;
    }

    collapseDescription() {
        this.isExpandedText = false;
    }

    getNotificationId(string) {
        let newId = '';
        for (let i = 0; i < string.length - 1; i++) {
            let nextChar = '';
            if (isNaN(string[i])) {
                nextChar = this.alphabet.indexOf(string[i].toLowerCase()).toString();
            }
            else {
                nextChar = string[i];
            }
            newId += nextChar;
        }
        return parseInt(newId);
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