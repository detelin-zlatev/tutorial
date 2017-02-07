import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public saloonService: SaloonService, public navParams: NavParams, public loadingController: LoadingController) {
      let loader = this.loadingController.create({
      content: "Зарежда..."
    });
    loader.present();

      this.imagesPath = AppSettings.API_ENDPOINT + 'img/upload/';
      this.saloonService.searchSaloons(this.navParams.get('cityId'), this.navParams.get('categoryId'), this.navParams.get('promo')).then(data => {
          this.saloons = data.saloons;
	  loader.dismiss();
      });
  }

  goToSaloon(saloon: any) {
    this.navCtrl.push(SaloonPage, {saloon: saloon});
  }

  goToSearch() {
    this.navCtrl.push(SearchPage);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      // Load some data here....
      infiniteScroll.complete();
    }, 500);
  }

}
