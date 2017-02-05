import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {Plugins} from '../../../providers/plugins-service';

import {NgZone} from '@angular/core';

import {Transfer} from 'ionic-native';
import {AppSettings} from '../../../appSettings';

@Component({
  selector: 'page-portfolio-add',
  templateUrl: 'portfolio-add.html',
  providers: [Plugins]
})
export class PortfolioAddPage {

  itemId: number;
  token: string;

  images: Array<string> = [];

  constructor(public storage: Storage, public navCtrl: NavController,  navParams: NavParams, public plugins: Plugins, public alertController: AlertController, public ngZone: NgZone) {
      this.storage.get('itemId').then((id) => {
        this.itemId = id;
        console.log(this.itemId);
        this.storage.get('token').then((token) => {
            this.token = token;
        });
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
      if(!this.images || this.images.length == 0) {
          let alert = this.alertController.create({
              title: "Грешка",
              subTitle: "Няма избрани снимки за качване",
              buttons: ['Ok']
          });
          alert.present(alert);
          return;
      }     

      this.uploading = true;
      this.total = this.images.length;   
      this.upload(this.images[0]);         
    }




    // ACTUAL UPLOAD SECTION




    uploading: boolean = false;
    current: number = 1;
    total: number;
    progress: number;
    
    
    done = () : void => {
        // DO NOTHING ON DONE
    }
    
    success = (result: any) : void => { 
        if(this.current < this.total) {             
            this.current++;
            this.progress = 0;                    
            this.upload(this.images[this.current - 1]);
        } else {   
            this.uploading = false;
        }
    }
            
    failed = (err: any) : void => {
        let code = err.code;
        alert("Failed to upload image. Code: " + code);
    }
    
    onProgress =  (progressEvent: ProgressEvent) : void => {
        this.ngZone.run(() => {
            if (progressEvent.lengthComputable) {
                let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                console.log(progress);
                this.progress = progress      
            }
        });
    }
    
    upload = (image: string) : void => { 
        let ft = new Transfer();
        let filename = image + ".jpg";
        let options = {
            fileKey: 'filepath',
            fileName: filename,
            mimeType: 'image/jpeg',
            chunkedMode: false,
            headers: {
                'Content-Type' : undefined
            },
            params: {
                fileName: filename,
                saloon_id: this.itemId,
                token: this.token
            }
        }; 
        ft.onProgress(this.onProgress);
        ft.upload(image, AppSettings.API_ENDPOINT + 'portfolios/addRemote', options, false)
        .then((result: any) => {
            this.success(result);
        }).catch((error: any) => {
            this.failed(error);
        }); 
    }

}
