import {Component} from '@angular/core';
import {DataProvider} from "../../providers/data-provider";
import {Loading, LoadingController, ModalController} from "ionic-angular";
import moment from 'moment';
import {Diagnostic} from "@ionic-native/diagnostic";
import {EnableLocationPage} from "../enable-location/enable-location";
import {Geolocation} from "@ionic-native/geolocation";
import {Storage} from "@ionic/storage";
import {EventModalPage} from "../event-modal/event-modal";

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
        if (!this.searchTerms)
        this.dataProvider.getEvents()
            .subscribe(
                data => {
                    this.events = data;
                    this.events.length > 0 ? this.hasEvents = true : this.hasEvents = false;
                    let todayEvents = {};
                    for (let i = 0; i < this.events.length; i++) {
                        let isTodayEvent = this.isTodayEvent(this.events[i].EventStartDate);
                        if (i != 0) {
                            this.events[i].PrevStartDate = this.events[i - 1].EventStartDate;
                        }
                        if (isTodayEvent) { // store todays events in order to show on map page later
                            if (!todayEvents[this.events[i].Venue]) {
                                todayEvents[this.events[i].Venue] = [this.events[i]];
                            }
                            else {
                                todayEvents[this.events[i].Venue].push(this.events[i]);
                            }
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
    onSearchInput() {
        this.searchLoading = true;
        this.dataProvider.getEvents()
            .subscribe(
                data => {
                    this.events = this.filterEvents(data);
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

    filterEvents(data) {
        let newEvents = [];
        let st = this.searchTerms.toLowerCase();
        for (let e of data) {
            let eventTitle = e.EventTitle.toLowerCase().includes(st);
            let venue = e.Venue.toLowerCase().includes(st);
            let parentCatName = e.ParentCatName.toLowerCase().includes(st);
            let secCatName;
            if (e.SecCatName) {
                secCatName = e.SecCatName.toLowerCase().includes(st);
            }
            else {
                secCatName = false;
            }

            if (eventTitle || venue || parentCatName || secCatName) {
                newEvents.push(e);
            }
        }
        return newEvents;
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

    openModal(e) {
        let modal = this.modalController.create(EventModalPage, {'e': e});
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
