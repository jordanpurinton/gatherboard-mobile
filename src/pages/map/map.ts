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
    markers = [];
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
                this.loadMap();
            })
    }

    // initialize map on page load to your location
    loadMap() {
        this.geolocation.getCurrentPosition().then(
            data => {
                this.map = GoogleMaps.create('map_canvas', {
                    camera: {
                        target: {
                            lat: data.coords.latitude,
                            lng: data.coords.longitude
                        },
                        zoom: 12,
                        tilt: 30
                    }
                });
                this.getNearbyEvents();
            })
    }

    getNearbyEvents(isRefresh?) {
        if (isRefresh) {
            this.map.clear().then(
                () => {
                    for (const [key, value] of Object.entries(this.todayEvents)) {
                        console.log(key, value);
                        let address = value[0].Venue + ', ';
                        let cityState = value[0].VenueCity + ', ' + value[0].VenueState;
                        this.geocoder.forwardGeocode(address + cityState)
                            .then((data: NativeGeocoderForwardResult) => {
                                let latLng = new LatLng(data[0].latitude, data[0].longitude);
                                let marker = {position: latLng, animation: GoogleMapsAnimation.BOUNCE};

                                this.map.addMarker(marker).then(
                                    (marker: Marker) => {
                                        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                                            this.showToast('View Details', value);
                                        });
                                    }
                                )
                            })
                    }
                })
        }
        else {
            for (const [key, value] of Object.entries(this.todayEvents)) {
                console.log(key, value);
                let address = value[0].Venue + ', ';
                let cityState = value[0].VenueCity + ', ' + value[0].VenueState;
                this.geocoder.forwardGeocode(address + cityState)
                    .then((data: NativeGeocoderForwardResult) => {
                        let latLng = new LatLng(data[0].latitude, data[0].longitude);
                        let marker = {position: latLng, animation: GoogleMapsAnimation.BOUNCE};

                        this.map.addMarker(marker).then(
                            (marker: Marker) => {
                                marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                                    this.showToast('View Details', value);
                                });
                            }
                        )
                    })
            }
        }
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

// show err message if map not ready
    showToast(message, events ?) {
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
                message: events.length + ' events at ' + events[0].Venue + ' today',
                duration: 10000,
                position: 'top',
                showCloseButton: true,
                closeButtonText: message,
            });
            toast.onDidDismiss((data, role) => {
                if (role == 'close') {
                    this.showEventModal(events[0].UID);
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
