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
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(PublishPage);
  }

}
