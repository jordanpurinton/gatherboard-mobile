import {Component} from '@angular/core';
import {DataProvider} from "../../providers/data-provider";
import {Loading, LoadingController} from "ionic-angular";
import moment from 'moment';

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
    platform = localStorage.getItem('Platform');

    constructor(public dataProvider: DataProvider,
                public loadingController: LoadingController) {
    }

    // first page load
    ionViewDidLoad() {
        this.createLoader();
        this.loading.present();
    }

    // when page becomes in focus
    ionViewDidEnter() {
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
                    this.dismissLoading();
                },
                err => {
                    console.log(err);
                    this.dismissLoading();
                }
            )
    }

    // change event view type
    onMyClick() {
        this.selectedView = 'All'
    }

    onAllClick() {
        this.selectedView = 'My Feed';
    }

    // when search term character is added or deleted
    onSearchInput(event) {
        this.searchLoading = true;

        if (event.inputType == 'insertText') {
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
        }
        else {
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

    formatStartDate(startDate) {
        return moment(startDate).format('M/D');
    }

    isTodayEvent(startDate) {
        return moment(startDate).format('M/D') == moment().format('M/D');
    }

    createLoader() {
        this.loading = this.loadingController.create({showBackdrop: false});
    }

    dismissLoading() {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
        }
    }

}
