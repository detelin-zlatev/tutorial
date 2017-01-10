import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import {EditPage} from '../edit/edit'

@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html'
})
export class PromotionsPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    
  }


  add() {
    let modal = this.modalCtrl.create(EditPage);
    modal.present();
  }

}
