import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.page.html',
  styleUrls: ['./cameras.page.scss'],
})
export class CamerasPage implements OnInit {

  
  imgURL:SafeResourceUrl;

  constructor(private camera:Camera,private sanitizer:DomSanitizer) {}
  ngOnInit() {
    
  }

  getCamera(){

    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType:this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:true
    }).then((res)=>{
      this.imgURL = 'data:image/jpeg;base64,' + res;
    }).catch(e=>{
      console.log(e);
    })
  }

  getGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((res)=>{
      this.imgURL = 'data:image/jpeg;base64,' + res;
    }).catch(e=>{
      console.log(e);
    })
  }
}
