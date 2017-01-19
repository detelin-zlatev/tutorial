import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public metadataService: MetadataService) {
      this.loadMetadata();
  }

  goToSaloons() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(SaloonsPage);
  }

  loadMetadata() {
      this.metadataService.load()
      .then(data => {
        this.categories = data.categories;
        this.cities = data.cities;    
      });
  }

}
