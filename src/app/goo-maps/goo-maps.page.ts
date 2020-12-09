import { Component, OnInit } from '@angular/core';
import { GoogleMaps, GoogleMapsEvent, GoogleMapControlOptions,LatLng, MarkerOptions, Marker, GoogleMapOptions, GoogleMap, Environment, GoogleMapsMapTypeId, GoogleMapsAnimation } from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActionSheetController, AlertController, Platform } from "@ionic/angular";

@Component({
  selector: 'app-goo-maps',
  templateUrl: './goo-maps.page.html',
  styleUrls: ['./goo-maps.page.scss'],
})
export class GooMapsPage implements OnInit {

  
  map: GoogleMap;
  position:any ={lat: 3.8895616000000004, lng: 11.5113985};

  constructor(
    private platform: Platform,
    public alertController: AlertController,
    public actionCtrl: ActionSheetController,
    private geolocation: Geolocation,
    ) {}

  ngOnInit() {
    //this.platform.ready().then(() => this.loadMap());
    this.geolocation.getCurrentPosition().then((resp) => {
      var latitude,longitude
      latitude = resp.coords.latitude;
      longitude = resp.coords.longitude;
      const coordinates: LatLng = new LatLng(latitude,longitude);
      this.position = coordinates})
    this.loadMap();
  }

  async mapOptions(){
    const actionSheet = await this.actionCtrl.create({
      buttons: [{
        text: 'Satellite',
        handler: () => {
          console.log('Satellite clicked');
          this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
        }
      }, {
        text: 'Plan',
        handler: () => {
          console.log('Plan clicked');
          this.map.setMapTypeId(GoogleMapsMapTypeId.NORMAL);
        }
      }, {
        text: 'Terrain',
        handler: () => {
          console.log('Terrain clicked');
          this.map.setMapTypeId(GoogleMapsMapTypeId.TERRAIN);
        }
      }, {
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

  placeMarker(markerTitle: string) {
    const marker: Marker = this.map.addMarkerSync({
       title: markerTitle,
       icon: 'red',
       animation: 'DROP',
       position: this.map.getCameraPosition().target
    });
 }

  async addMarker() {
    const alert = await this.alertController.create({
      header: 'Ajouter un emplacement',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Le titre'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ajouter',
          handler: data => {
            console.log('Titre: ' + data.title);
            this.placeMarker(data.title);
          }
        }
      ]
    });
    await alert.present();
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyALJYjIJ2bsHUhMe9NxUtr_PdZ9iixz5DI',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyALJYjIJ2bsHUhMe9NxUtr_PdZ9iixz5DI'
      });
  
    let mapOptions: GoogleMapOptions = {
      controls:{
        myLocation:true,
      myLocationButton:true
      },
      camera: {
        target: this.position,
        zoom: 18,
        tilt: 30
      },
      
      };
  
    this.map = GoogleMaps.create('map');
  
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {

          console.info(this.position)
          this.geolocation.getCurrentPosition().then((resp) => {
            var latitude,longitude
            latitude = resp.coords.latitude;
            longitude = resp.coords.longitude;
            const coordinates: LatLng = new LatLng(longitude,longitude);
            this.position = coordinates;
            this.map.setCameraTarget(this.position);
            this.map.setCameraZoom(16);
          })
         

            this.map.addMarker({
              title: 'Ma localisation',
              icon: 'green',
              animation: 'DROP',
              position: this.position
            })
            .then(marker => {
              marker.showInfoWindow()
              
        });
          })
 
        
    }

}
