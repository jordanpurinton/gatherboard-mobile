import {Component} from '@angular/core';
import {IonicPage, Loading, LoadingController, ModalController, NavParams} from 'ionic-angular';
import {LocalNotifications} from "@ionic-native/local-notifications";
import {EventModalPage} from "../event-modal/event-modal";

@IonicPage()
@Component({
    selector: 'page-reminders',
    templateUrl: 'reminders.html',
})
export class RemindersPage {

    scheduledEvents = [];
    hasScheduledEvents: boolean;
    loading: Loading;
    isFirstLoad = true;

    constructor(public navParams: NavParams,
                public localNotifications: LocalNotifications,
                public loadingController: LoadingController,
                public modalController: ModalController) {
    }

    ionViewDidLoad() {
        this.initLoad();
        this.localNotifications.getAll().then(
            data => {
                if (data.length > 0) {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        console.log(JSON.parse(data[i].data));
                        this.scheduledEvents.push(JSON.parse(data[i].data));
                    }
                    this.hasScheduledEvents = true;
                    this.dismissLoading();
                }
                else {
                    this.hasScheduledEvents = false;
                    this.dismissLoading();
                }
                this.isFirstLoad = false;
            }
        )
    }

    ionViewDidEnter() {
        if (!this.isFirstLoad) {
            this.localNotifications.getAll().then(
                data => {
                    if (data.length > 0) {
                        console.log(data);
                        this.scheduledEvents = [];
                        for (let i = 0; i < data.length; i++) {
                            console.log(JSON.parse(data[i].data));
                            this.scheduledEvents.push(JSON.parse(data[i].data));
                        }
                        this.hasScheduledEvents = true;
                    }
                    else {
                        this.hasScheduledEvents = false;
                    }
                }
            )
        }
    }

    openModal(e) {
        let modal = this.modalController.create(EventModalPage, {'e': e});
        modal.onDidDismiss(
            () => {
                this.ionViewDidEnter();
            }
        );
        modal.present();
    }

    // create loading wheel
    initLoad() {
        this.loading = this.loadingController.create({showBackdrop: false});
    }

    // dismiss loading wheel when done
    dismissLoading() {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
        }
    }

}
