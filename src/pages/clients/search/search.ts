import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';

import {SaloonsPage} from '../saloons/saloons';

import {MetadataService} from '../../../providers/metadata-service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [MetadataService]
})
export class SearchPage {

  public categories: any;

  public cities: any;

  public cityId: number;
  public categoryId: number;
  public promo: boolean;
  public closest: boolean = true;

  constructor(public navCtrl: NavController, public metadataService: MetadataService, public loadingController: LoadingController) {
      this.loadMetadata();
  }

  goToSaloons() {
    this.navCtrl.push(SaloonsPage, {
       cityId: this.cityId,
       categoryId: this.categoryId,
       promo: this.promo,
       closest: this.closest
     });
  }

  loadMetadata() {
    let loader = this.loadingController.create({
      content: "Зарежда..."
    });
    loader.present();	
      this.metadataService.load()
      .then(data => {
        this.categories = data.categories;
        this.cities = data.cities;    
	loader.dismiss();
      });
  }

}
