import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import {SaloonService} from '../../../providers/saloon-service';

import {SaloonPage} from '../saloon/saloon'
import {SearchPage} from '../search/search'

import {AppSettings} from '../../../appSettings';

import { Geolocation } from 'ionic-native';

@Component({
  selector: 'page-saloons',
  templateUrl: 'saloons.html',
  providers: [SaloonService]
})
export class SaloonsPage {

  public saloons: any;
  public imagesPath: string;
  public page: number;
  public size: number;
  public lat: number;
  public lng: number;

  constructor(public navCtrl: NavController, public saloonService: SaloonService, public navParams: NavParams, public loadingController: LoadingController) {
    this.page = 1;
    this.size = 10;
    let loader = this.loadingController.create({
      content: "Зарежда..."
    });
    loader.present();

    this.imagesPath = AppSettings.API_ENDPOINT + 'img/upload/';

    Geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    
      this.saloonService.searchSaloons(this.navParams.get('cityId'), this.navParams.get('categoryId'), this.navParams.get('promo'), this.navParams.get('closest'), this.lat, this.lng, this.page, this.size).then(data => {
          this.saloons = data.saloons;
	        loader.dismiss();
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  goToSaloon(saloon: any) {
    this.navCtrl.push(SaloonPage, {saloon: saloon});
  }

  goToSearch() {
    this.navCtrl.push(SearchPage);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.saloonService.searches = null;
    this.saloonService.searchSaloons(this.navParams.get('cityId'), this.navParams.get('categoryId'), this.navParams.get('promo'), this.navParams.get('closest'), this.lat, this.lng, this.page, this.size).then(data => {
	  if (data.saloons && data.saloons.length > 0) {
	  	this.saloons = this.saloons.concat(data.saloons);
	  	infiniteScroll.complete();
          } else {
		infiniteScroll.complete();
		infiniteScroll.enable(false);
	  }
	});
  }

}
