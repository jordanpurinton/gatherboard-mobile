import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage
{

    map: GoogleMap;

    constructor() {
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
        let mapOptions = {
            camera: {
                target: {
                    lat: 46.8787,
                    lng: 113.9966
                }
            },
            zoom: 18,
            tilt: 30
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);

        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                console.log('Map is ready!');
                this.map.addMarker({
                    title: 'Ionic',
                    icon: 'blue',
                    animation: 'DROP',
                    position: {
                        lat: 43.0741904,
                        lng: -89.3809802
                    }
                })
                    .then(marker => {
                        marker.on(GoogleMapsEvent.MARKER_CLICK)
                            .subscribe(() => {
                                alert('clicked');
                            });
                    });

            });
    }

}
