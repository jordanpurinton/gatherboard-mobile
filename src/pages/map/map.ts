import {Component} from '@angular/core';
import {ToastController} from 'ionic-angular';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    Marker,
    GoogleMapsAnimation
} from '@ionic-native/google-maps';
import {Geolocation} from "@ionic-native/geolocation";

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {

    mapReady: boolean = false;
    map: GoogleMap;

    constructor(public toastController: ToastController,
                public geolocation: Geolocation) {
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    // initialize map on page load to your current location
    loadMap() {

        this.geolocation.getCurrentPosition().then(
            data => {
                this.map = GoogleMaps.create('map_canvas', {
                    camera: {
                        target: {
                            lat: data.coords.latitude,
                            lng: data.coords.longitude
                        },
                        zoom: 18,
                        tilt: 30
                    }
                });

                this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
                    this.mapReady = true;
                });
            }
        )
    }

    // gets current location again and shows pop up
    onButtonClick() {
        if (!this.mapReady) {
            this.showToast('Whoops try again, or make sure you are running on an actual device ;)');
            return;
        }
        this.map.clear();

        this.map.getMyLocation()
            .then((location) => {
                console.log(JSON.stringify(location, null, 2));

                return this.map.animateCamera({
                    target: location.latLng,
                    zoom: 17,
                    tilt: 30
                }).then(() => {
                    // add a marker
                    return this.map.addMarker({
                        title: '@ionic-native/google-maps plugin!',
                        snippet: 'Here is a message!',
                        position: location.latLng,
                        animation: GoogleMapsAnimation.BOUNCE
                    });
                })
            }).then((marker: Marker) => {
            // show the infoWindow
            marker.showInfoWindow();

            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                this.showToast('clicked!');
            });
        });
    }

    // show err message if map not ready
    showToast(message) {
        let toast = this.toastController.create({
            message: message,
            duration: 4000,
            position: 'top'
        });

        toast.present(toast);
    }
}
