import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController } from 'ionic-angular';

import {PublishPage} from '../publish/publish'
import {SaloonService} from '../../../providers/saloon-service';

@Component({
  selector: 'page-published',
  templateUrl: 'published.html',
  providers: [SaloonService]
})
export class PublishedPage {

  saloons: any;
  submitAttempt: boolean;

  constructor(public storage: Storage, public navCtrl: NavController, public saloonService: SaloonService) {
    this.submitAttempt = true;
    
    this.storage.get('token').then((token) => {
        this.saloonService.listSaloons(token).
        then(data => {
          this.saloons = data;
        });
    });
  }

  goToPublish() {
    this.navCtrl.push(PublishPage);
  }

  goToItem(itemId: number) {
    this.storage.set('itemId', itemId).then(() => {
      this.navCtrl.push(PublishPage);
    });
  }

}
