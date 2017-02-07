import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {DetailsPage} from '../details/details'
import {PortfolioPage} from '../portfolio/portfolio'
import {PromotionsPage} from '../promotions/promotions'


@Component({
  selector: 'page-publish',
  templateUrl: 'publish.html'
})
export class PublishPage {

  tab1Root: any = DetailsPage;
  tab2Root: any = PortfolioPage;
  tab3Root: any = PromotionsPage;
  paramsData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    	this.paramsData = this.navParams.data;
  }
}
