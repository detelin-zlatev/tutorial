import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {Plugins} from '../../../providers/plugins-service';

@Component({
  selector: 'page-portfolio-add',
  templateUrl: 'portfolio-add.html',
  providers: [Plugins]
})
export class PortfolioAddPage {

  itemId: number;

  images: Array<string> = [];

  constructor(public storage: Storage, public navCtrl: NavController, navParams: NavParams, public plugins: Plugins) {
      this.storage.get('itemId').then((id) => {
        this.itemId = id;
        console.log(this.itemId);
    });
  }


  openAlbums = () : void => {
        this.plugins.albums.open().then((imgUrls) => {            
            imgUrls.forEach((imageUrl: string) : void => {
                if(imageUrl){                  
                  this.images.push(imageUrl);
                }
            }); 
        });        
    }
      
    openCamera = () : void => { 
        this.plugins.camera.open().then((imageUrl) => { 
          if(imageUrl) {
            this.images.push(imageUrl);            
          }
      });
    }
    
    startUploading = () : void => {
      console.log('upload started');
      //this.navCtrl.setRoot(UploadingPage, {
      //    images: this.images
      //});    
    }

}
