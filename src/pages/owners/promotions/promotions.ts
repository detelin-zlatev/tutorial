import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController, LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import {EditPage} from '../edit/edit'

import {SaloonService} from '../../../providers/saloon-service';

@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
  providers: [SaloonService]
})
export class PromotionsPage {

  promotions: any;
  itemId: number;

  constructor(public storage: Storage, public navCtrl: NavController, public modalCtrl: ModalController, public saloonService: SaloonService, public loadingController: LoadingController) {
    this.loadListData();
  }

  add() {
    let modal = this.modalCtrl.create(EditPage, {
       "parentPage": this
     });
    modal.present();
  }

  goToItem(itemId: number) {
    let modal = this.modalCtrl.create(EditPage, {
       item: itemId, "parentPage": this
     });
    modal.present();
  }

  loadListData() {
    let loader = this.loadingController.create({
      content: "Зарежда..."
    });
    loader.present();

    this.saloonService.promotions = null;
    this.storage.get('itemId').then((id) => {
      if (id && id > 0) {
        this.itemId = id;
        this.storage.get('token').then((token) => {
            this.saloonService.listPromotions(token, this.itemId).
            then(data => {
              this.promotions = data;
              loader.dismiss();
            });
        });
      }
    });
  }


  delete(promotionId: number) {
    this.storage.get('token').then((token) => {
        this.saloonService.deletePromotion(
          token,
          promotionId
        ).
        then(data => {
          this.loadListData();
        });
    });
  }

}
