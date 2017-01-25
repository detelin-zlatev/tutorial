import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html'
})
export class PortfolioPage {

  itemId: number;

  constructor(public storage: Storage, public navCtrl: NavController, navParams: NavParams) {
      this.storage.get('itemId').then((id) => {
        this.itemId = id;
        console.log(this.itemId);
    });
  }

}
