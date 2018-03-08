import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, ModalController, ToastController} from 'ionic-angular';
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

    constructor(public localNotifications: LocalNotifications,
                public loadingController: LoadingController,
                public alertController: AlertController,
                public toastController: ToastController,
                public modalController: ModalController) {
    }

    ionViewDidLoad() {
        this.initLoad();
        this.localNotifications.getAll().then(
            data => {
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        console.log(JSON.parse(data[i].data));
                        this.scheduledEvents.push(JSON.parse(data[i].data));
                    }
                    this.scheduledEvents.sort(
                        (a, b) => {
                            let dateA = new Date(a.EventStartDate + 'T' + a.EventTime);
                            let dateB = new Date(b.EventStartDate + 'T' + b.EventTime);
                            return +dateA - +dateB;
                        }
                    );
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
                        this.scheduledEvents = [];
                        for (let i = 0; i < data.length; i++) {
                            this.scheduledEvents.push(JSON.parse(data[i].data));
                        }
                        this.scheduledEvents.sort(
                            (a, b) => {
                                let dateA = new Date(a.EventStartDate + 'T' + a.EventTime);
                                let dateB = new Date(b.EventStartDate + 'T' + b.EventTime);
                                return +dateA - +dateB;
                            }
                        );
                        this.hasScheduledEvents = true;
                    }
                    else {
                        this.hasScheduledEvents = false;
                    }
                }
            )
        }
    }

    clearAllNotifications() {
        let alert = this.alertController.create({
            title: 'Clear All',
            message: 'Would you like to clear all planned events?\n(Note: This action is irreversible)',
            buttons:
                [
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    },
                    {
                        text: 'Confirm',
                        handler: () => {
                            this.localNotifications.cancelAll().then(
                                data => {
                                    console.log(data);
                                    let toast = this.toastController.create({
                                        message: 'All reminders cleared',
                                        duration: 3000,
                                        position: 'top'
                                    });
                                    toast.present();
                                    this.ionViewDidEnter();
                                },
                                err => {
                                    console.log(err);
                                    let alert = this.alertController.create({
                                        title: 'Oops!',
                                        message: 'Something went wrong and your reminders couldn\t be removed.',
                                        buttons: [{text: 'Dismiss', role: 'cancel'}]
                                    });
                                    alert.present();
                                    this.ionViewDidEnter();
                                }
                            )
                        }
                    }
                ]
        });
        alert.present();
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
