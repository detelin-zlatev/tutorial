import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController } from 'ionic-angular';

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

  constructor(public storage: Storage, public navCtrl: NavController, public saloonService: SaloonService) {
    this.imagesPath = AppSettings.API_ENDPOINT;
    
    console.log('Reached 0');
    this.storage.get('token').then((token) => {
        console.log('Reached 1');
        this.saloonService.listSaloons(token).
        then(data => {
          console.log('Reached 2');
          this.saloons = data.saloons;
          this.saloonImages = data.saloonImages;
        });
    });
  }

  goToPublish() {
    this.storage.remove('itemId').then(() => {
      this.navCtrl.push(PublishPage);
    });
  }

  goToItem(itemId: number) {
    this.storage.set('itemId', itemId).then(() => {
      this.navCtrl.push(PublishPage);
    });
  }

}
