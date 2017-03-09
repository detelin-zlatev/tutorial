import { Component } from '@angular/core';

import {CallNumber} from 'ionic-native';

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
      this.imagesPath = AppSettings.API_ENDPOINT + 'img/upload/';
      this.saloon = this.navParams.get('saloon');
  }

  call() {
    CallNumber.callNumber(this.saloon.phone_1, true);
  }

}
