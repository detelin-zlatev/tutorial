import { Component } from '@angular/core';

import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {PortfolioAddPage} from '../portfolio-add/portfolio-add'
import {PortfolioEditPage} from '../portfolio-edit/portfolio-edit'

import {SaloonService} from '../../../providers/saloon-service';
import {AppSettings} from '../../../appSettings';

@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
  providers: [SaloonService]
})
export class PortfolioPage {

  portfolios: any;
  itemId: number;
  imagesPath: string;

  constructor(public storage: Storage, public navCtrl: NavController, navParams: NavParams, public modalCtrl: ModalController, public saloonService: SaloonService, public loadingController: LoadingController) {
     this.imagesPath = AppSettings.API_ENDPOINT + 'img/upload/';
      this.storage.get('itemId').then((id) => {
        this.itemId = id;
        console.log(this.itemId);
    });
    this.loadListData();
  }

  loadListData() {
    let loader = this.loadingController.create({
      content: "Зарежда..."
    });
    loader.present();

    this.saloonService.portfolios = null;
    this.storage.get('itemId').then((id) => {
      if (id && id > 0) {
        this.itemId = id;
        this.storage.get('token').then((token) => {
            this.saloonService.listPortfolios(token, this.itemId).
            then(data => {
              this.portfolios = data;
	      loader.dismiss();
            });
        });
      }
    });
  }

  add() {
    this.navCtrl.push(PortfolioAddPage)
  }

  delete(portfolioId: number) {
    this.storage.get('token').then((token) => {
        this.saloonService.deletePortfolio(
          token,
          portfolioId
        ).
        then(data => {
          this.saloonService.deletePortfolioOk = false;
          this.loadListData();
        });
    });
  }

  goToItem(itemId: number) {
    let modal = this.modalCtrl.create(PortfolioEditPage, {
       item: itemId, "parentPage": this
     });
    modal.present();
  }
}
