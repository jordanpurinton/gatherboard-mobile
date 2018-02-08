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

    constructor(public toastController: ToastController) {
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    // initialize map on page load to Missoula
    loadMap() {
        this.map = GoogleMaps.create('map_canvas', {
            camera: {
                target: {
                    lat: 46.878718,
                    lng: -113.996586
                },
                zoom: 18,
                tilt: 30
            }
        });

        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            this.mapReady = true;
        });
    }

    // test click for getting a location other than Missoula
    onButtonClick() {
        if (!this.mapReady) {
            this.showToast('Whoops try again, or make sure you are running on an actual device ;)');
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
            duration: 2000,
            position: 'top'
        });

        toast.present(toast);
    }
}
