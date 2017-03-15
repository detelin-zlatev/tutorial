import { Component } from '@angular/core';

import {CallNumber} from 'ionic-native';

import { NavController, NavParams, ModalController } from 'ionic-angular';

import {AppSettings} from '../../../appSettings';

import {MapPosPage} from '../mappos/mappos'

@Component({
  selector: 'page-saloon',
  templateUrl: 'saloon.html'
})
export class SaloonPage {

  public saloon: any;
  public imagesPath: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
      this.imagesPath = AppSettings.API_ENDPOINT + 'img/upload/';
      this.saloon = this.navParams.get('saloon');
  }

  call() {
    CallNumber.callNumber(this.saloon.phone_1, true);
  }

  map() {
	let modal = this.modalCtrl.create(MapPosPage, {lat: this.saloon.lat, lng: this.saloon.lng});
    	modal.present();
  }

}
