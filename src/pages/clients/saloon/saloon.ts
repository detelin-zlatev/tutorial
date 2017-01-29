import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {AppSettings} from '../../../appSettings';

@Component({
  selector: 'page-saloon',
  templateUrl: 'saloon.html'
})
export class SaloonPage {

  public saloon: any;
  public imagesPath: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.imagesPath = AppSettings.API_ENDPOINT;
      this.saloon = this.navParams.get('saloon');
  }

}
