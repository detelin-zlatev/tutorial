import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController, NavParams, LoadingController} from 'ionic-angular';

import {PublishPage} from '../publish/publish'
import {SaloonService} from '../../../providers/saloon-service';

import {AppSettings} from '../../../appSettings';

@Component({
  selector: 'page-published',
  templateUrl: 'published.html',
  providers: [SaloonService]
})
export class PublishedPage {

  saloons: any;
  saloonImages: any;
  imagesPath: string;

  constructor(public storage: Storage, public navCtrl: NavController, public saloonService: SaloonService, public navParams: NavParams, public loadingController: LoadingController) {
    this.imagesPath = AppSettings.API_ENDPOINT + 'img/upload/';
    
    this.storage.get('token').then((token) => {
        this.saloonService.listSaloons(token).
        then(data => {
          this.saloons = data.saloons;
          this.saloonImages = data.saloonImages;
		
	  this.navParams.get('loader').dismiss();
        });
    });
  }

  goToPublish() {
    let loader = this.loadingController.create({
      content: "Зарежда..."
    });
    loader.present();

    this.storage.remove('itemId').then(() => {
      this.navCtrl.push(PublishPage, {
		       loader: loader
		     });
    });
  }

  goToItem(itemId: number) {
    let loader = this.loadingController.create({
      content: "Зарежда..."
    });
    loader.present();   
 
    this.storage.set('itemId', itemId).then(() => {
      this.navCtrl.push(PublishPage, {
		       loader: loader
		     });
    });
  }

}
