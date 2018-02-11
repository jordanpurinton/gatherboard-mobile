import {Component} from '@angular/core';
import {ToastController} from 'ionic-angular';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    Marker,
    GoogleMapsAnimation, ILatLng, LatLng
} from '@ionic-native/google-maps';
import {Geolocation} from "@ionic-native/geolocation";
import {NativeGeocoder, NativeGeocoderForwardResult} from "@ionic-native/native-geocoder";

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {

    mapReady: boolean = false;
    map: GoogleMap;

    constructor(public toastController: ToastController,
                public geocoder: NativeGeocoder,
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
                        zoom: 14,
                        tilt: 30
                    }
                });

                this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
                    this.mapReady = true;
                })
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

    // pin location at UM
    pinUM() {
        if (!this.mapReady) {
            this.showToast('Whoops try again, or make sure you are running on an actual device ;)');
            return;
        }
        this.map.clear();

        this.geocoder.forwardGeocode('32 Campus Dr, Missoula, MT')
            .then((data: NativeGeocoderForwardResult) => {
                let latLng = new LatLng(data[0].latitude, data[0].longitude);
                console.log(latLng)

                return this.map.animateCamera({
                    target: latLng,
                    zoom: 17,
                    tilt: 30
                }).then(
                    () => {
                        this.map.addMarker({
                            title: 'UM',
                            snippet: 'I found UM based on the coordinates you sent me',
                            position: latLng,
                            animation: GoogleMapsAnimation.BOUNCE
                        });
                        this.map.setCameraTarget(latLng);
                    })
            })
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
