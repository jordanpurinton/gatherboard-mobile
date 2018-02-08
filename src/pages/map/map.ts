import {Component} from '@angular/core';
import {ToastController} from 'ionic-angular';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    Marker,
    GoogleMapsAnimation,
    MyLocation
} from '@ionic-native/google-maps';

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {

    mapReady: boolean = false;
    map: GoogleMap;

    constructor(public toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
        this.map = GoogleMaps.create('map_canvas', {
            camera: {
                target: {
                    lat: 43.0741704,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        });

        // Wait the maps plugin is ready until the MAP_READY event
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            this.mapReady = true;
        });
    }

    onButtonClick() {
        if (!this.mapReady) {
            this.showToast('map is not ready yet. Please try again.');
            return;
        }
        this.map.clear();

        this.map.getMyLocation()
            .then((location: MyLocation) => {
                console.log(JSON.stringify(location, null, 2));

                return this.map.animateCamera({
                    target: location.latLng,
                    zoom: 17,
                    tilt: 30
                }).then(() => {
                    // add a marker
                    return this.map.addMarker({
                        title: '@ionic-native/google-maps plugin!',
                        snippet: 'This plugin is awesome!',
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

    showToast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'middle'
        });

        toast.present(toast);
    }
}
