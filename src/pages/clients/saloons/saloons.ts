import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {SaloonService} from '../../../providers/saloon-service';

import {SaloonPage} from '../saloon/saloon'
import {SearchPage} from '../search/search'

import {AppSettings} from '../../../appSettings';

@Component({
  selector: 'page-saloons',
  templateUrl: 'saloons.html',
  providers: [SaloonService]
})
export class SaloonsPage {

  public saloons: any;
  public imagesPath: string;

  constructor(public navCtrl: NavController, public saloonService: SaloonService, public navParams: NavParams) {
      this.imagesPath = AppSettings.API_ENDPOINT;
      this.saloonService.searchSaloons(this.navParams.get('cityId'), this.navParams.get('categoryId'), this.navParams.get('promo')).then(data => {
          this.saloons = data.saloons;
      });
  }

  goToSaloon(saloon: any) {
    this.navCtrl.push(SaloonPage, {saloon: saloon});
  }

  goToSearch() {
    this.navCtrl.push(SearchPage);
  }

}
