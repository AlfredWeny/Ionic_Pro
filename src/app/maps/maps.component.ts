import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker, GoogleMapOptions, GoogleMap, Environment } from "@ionic-native/google-maps";

import { Platform } from "@ionic/angular";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, AfterViewInit{

	map: GoogleMap;

  constructor(public platform: Platform) { }

  ngOnInit() {}


  ngAfterViewInit() {
	this.loadMap();
	}

  loadMap() {
	Environment.setEnv({
		'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyALJYjIJ2bsHUhMe9NxUtr_PdZ9iixz5DI',
		'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyALJYjIJ2bsHUhMe9NxUtr_PdZ9iixz5DI'
	  });

	let mapOptions: GoogleMapOptions = {
		camera: {
		  target: {
			lat: 43.0741904,
			lng: -89.3809802
		  },
		  zoom: 18,
		  tilt: 30
		}
	  };

	this.map = GoogleMaps.create('map',mapOptions);

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
