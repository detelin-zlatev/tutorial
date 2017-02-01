import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {PortfolioAddPage} from '../portfolio-add/portfolio-add'

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

  constructor(public storage: Storage, public navCtrl: NavController, navParams: NavParams, public saloonService: SaloonService) {
     this.imagesPath = AppSettings.API_ENDPOINT;
      this.storage.get('itemId').then((id) => {
        this.itemId = id;
        console.log(this.itemId);
    });
    this.loadListData();
  }

  loadListData() {
    this.saloonService.portfolios = null;
    this.storage.get('itemId').then((id) => {
      if (id && id > 0) {
        this.itemId = id;
        this.storage.get('token').then((token) => {
            this.saloonService.listPortfolios(token, this.itemId).
            then(data => {
              this.portfolios = data;
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
          this.loadListData();
        });
    });
  }
}
