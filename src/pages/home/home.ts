import {Component} from '@angular/core';
import {DataProvider} from "../../providers/data-provider";
import {Loading, LoadingController, ModalController} from "ionic-angular";
import moment from 'moment';
import {Diagnostic} from "@ionic-native/diagnostic";
import {EnableLocationPage} from "../enable-location/enable-location";
import {Geolocation} from "@ionic-native/geolocation";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    events;
    hasEvents;
    searchLoading = false;
    searchTerms = '';
    selectedView = 'My Feed';
    loading: Loading;
    platform = this.storage.get('Platform');

    constructor(public dataProvider: DataProvider,
                public diagnostic: Diagnostic,
                public modalController: ModalController,
                public geolocation: Geolocation,
                public storage: Storage,
                public loadingController: LoadingController) {
    }

    // first page load
    ionViewDidLoad() {
        this.initLoad();
        this.diagnostic.isLocationAvailable().then(
            data => {
                if (!data) {
                    this.geolocation.getCurrentPosition();
                    this.showLocationModal();
                }
            });
        this.loading.present();
    }

    // when page becomes in focus, get events
    ionViewDidEnter() {
        this.dataProvider.getEvents()
            .subscribe(
                data => {
                    this.events = data;
                    this.events.length > 0 ? this.hasEvents = true : this.hasEvents = false;
                    let todayEvents = [];
                    for (let i = 0; i < this.events.length; i++) {
                        let isTodayEvent = this.isTodayEvent(this.events[i].EventStartDate);
                        if (i != 0) {
                            this.events[i].PrevStartDate = this.events[i - 1].EventStartDate;
                        }
                        if(isTodayEvent) { // store todays events in order to show on map page later
                            todayEvents.push(this.events[i]);
                        }
                    }
                    this.storage.set('TodayEvents', todayEvents);
                    this.dismissLoading();
                },
                err => {
                    console.log(err);
                    this.dismissLoading();
                }
            )
    }

    // get events under my feed filter
    getMyFeed() {
        this.selectedView = 'My Feed';
    }

    // get all scheduled events on the board
    getAllFeed() {
        this.selectedView = 'All';
    }

    // when search term character is added or deleted
    onSearchInput(event) {
        this.searchLoading = true;
        this.dataProvider.getEvents()
            .subscribe(
                data => {
                    this.events = data;
                    this.events.length > 0 ? this.hasEvents = true : this.hasEvents = false;
                    this.events = this.events.filter(
                        e => {
                            let secCatName = '';
                            if (e.SecCatName) { // make this check because there may not always be a sec cat name
                                secCatName = e.SecCatName.toLowerCase();
                            }
                            return e.EventTitle.toLowerCase().includes(this.searchTerms) ||
                                e.Venue.toLowerCase().includes(this.searchTerms) ||
                                e.ParentCatName.toLowerCase().includes(this.searchTerms) ||
                                secCatName.includes(this.searchTerms);
                        });

                    for (let i = 0; i < this.events.length; i++) {
                        if (i != 0) {
                            this.events[i].PrevStartDate = this.events[i - 1].EventStartDate;
                        }
                    }
                    this.events.length > 0 ? this.hasEvents = true : this.hasEvents = false;
                    this.searchLoading = false;
                },
                err => {
                    console.log(err);
                    this.dismissLoading();
                }
            )
    }

    // when full search term string is cleared
    onSearchClear() {
        this.searchLoading = true;
        this.searchTerms = '';
        this.dataProvider.getEvents()
            .subscribe(
                data => {
                    this.events = data;
                    this.events.length > 0 ? this.hasEvents = true : this.hasEvents = false;

                    this.events = this.events.filter(
                        e => {
                            let secCatName = '';
                            if (e.SecCatName) { // make this check because there may not always be a sec cat name
                                secCatName = e.SecCatName.toLowerCase();
                            }
                            return e.EventTitle.toLowerCase().includes(this.searchTerms) ||
                                e.Venue.toLowerCase().includes(this.searchTerms) ||
                                e.ParentCatName.toLowerCase().includes(this.searchTerms) ||
                                secCatName.includes(this.searchTerms);
                        });

                    for (let i = 0; i < this.events.length; i++) {
                        if (i != 0) {
                            this.events[i].PrevStartDate = this.events[i - 1].EventStartDate;
                        }
                    }
                    this.events.length > 0 ? this.hasEvents = true : this.hasEvents = false;
                    this.searchLoading = false;
                },
                err => {
                    console.log(err);
                    this.searchLoading = false;
                }
            )
    }

    // format string to M/D format
    formatStartDate(startDate) {
        return moment(startDate).format('M/D');
    }

    // check if event is occuring today
    isTodayEvent(startDate) {
        return moment(startDate).format('M/D') == moment().format('M/D');
    }

    showLocationModal() {
        let modal = this.modalController.create(EnableLocationPage, {enableBackdropDismiss: false});
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
