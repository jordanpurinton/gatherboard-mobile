import {Component} from '@angular/core';
import {ModalController, ToastController} from 'ionic-angular';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    Marker,
    GoogleMapsAnimation, LatLng
} from '@ionic-native/google-maps';
import {Geolocation} from "@ionic-native/geolocation";
import {NativeGeocoder, NativeGeocoderForwardResult} from "@ionic-native/native-geocoder";
import {Storage} from "@ionic/storage";
import {EventModalPage} from "../event-modal/event-modal";
import moment from 'moment';

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {

    mapReady = false;
    map: GoogleMap;
    todayEvents;

    constructor(public toastController: ToastController,
                public storage: Storage,
                public modalController: ModalController,
                public geocoder: NativeGeocoder,
                public geolocation: Geolocation) {
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    ionViewDidEnter() {
        this.storage.get('TodayEvents').then(
            data => {
                this.todayEvents = data;
                if (moment(this.todayEvents[0].EventStartDate).format('M/D') !=
                    moment().format('M/D')) {
                    this.map = null;
                    this.loadMap();
                }
            });
    }

    // initialize map on page load to boise
    loadMap() {
        this.geolocation.getCurrentPosition().then(
            data => {
                this.map = GoogleMaps.create('map_canvas', {
                    camera: {
                        target: {
                            lat: 43.603600, // boise for now
                            lng: -116.208710
                        },
                        zoom: 14,
                        tilt: 30
                    }
                });
                this.getNearbyEvents();
            })
    }

    getNearbyEvents() {
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            this.mapReady = true;
            for (let i = 0; i < this.todayEvents.length; i++) {
                let address = this.todayEvents[i].VenueAddress + ', ';
                let cityState = this.todayEvents[i].VenueCity + ', ' + this.todayEvents.VenueState;
                this.geocoder.forwardGeocode(address + cityState)
                    .then((data: NativeGeocoderForwardResult) => {
                        let event = this.todayEvents[i];
                        let latLng = new LatLng(data[0].latitude, data[0].longitude);

                        //TODO: Handle multiple events at same location by adding only one map marker with seperators/event descriptions
                        let marker = {
                            position: latLng,
                            animation: GoogleMapsAnimation.DROP
                        };
                        this.map.addMarker(marker).then(
                            (marker: Marker) => {
                                marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                                    this.showToast('View Details', event);
                                });
                            }
                        )
                    })
            }
        })
    }

    // pin your location
    pinMyLocation() {
        if (!this.mapReady) {
            this.showToast('Whoops try again, or make sure you are running on an actual device ;)');
            return;
        }
        this.map.clear();

        this.map.getMyLocation()
            .then((location) => {
                return this.map.animateCamera({
                    target: location.latLng,
                    zoom: 17,
                    tilt: 30
                }).then(() => {
                    // add a marker
                    return this.map.addMarker({
                        title: 'My location',
                        snippet: 'Got your location based on the coordinates you sent me',
                        position: location.latLng,
                        animation: GoogleMapsAnimation.DROP
                    });
                })
            }).then((marker: Marker) => {
            // show the infoWindow
            marker.showInfoWindow();
        });
    }

    // pin location at Boise
    pinUM() {
        if (!this.mapReady) {
            this.showToast('Whoops try again, or make sure you are running on an actual device ;)');
            return;
        }
        this.map.clear();

        let latLng = new LatLng(43.603600, -116.208710);
        return this.map.animateCamera({
            target: latLng,
            zoom: 17,
            tilt: 30
        }).then(
            () => {
                this.map.addMarker({
                    title: 'Boise',
                    snippet: 'I found Boise based on the coordinates you sent me',
                    position: latLng,
                    animation: GoogleMapsAnimation.DROP
                });
                this.map.setCameraTarget(latLng);
            })
    }

    // show err message if map not ready
    showToast(message, event?) {
        if (!event) {
            let toast = this.toastController.create({
                message: message,
                duration: 4000,
                position: 'top'
            });
            toast.present(toast);
        }
        else {
            let toast = this.toastController.create({
                message: event.EventTitle,
                duration: 10000,
                position: 'top',
                showCloseButton: true,
                closeButtonText: message,
            });
            toast.onDidDismiss((data, role) => {
                if (role == 'close') {
                    this.showEventModal(event);
                }
            });
            toast.present();
        }

    }

    showEventModal(event) {
        let modal = this.modalController.create(EventModalPage, {e: event});
        modal.present();
    }
}
