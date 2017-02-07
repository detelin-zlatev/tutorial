import { Component } from '@angular/core';
import {FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import {SaloonService} from '../../../providers/saloon-service';

@Component({
  selector: 'page-portfolio-edit',
  templateUrl: 'portfolio-edit.html',
  providers: [SaloonService]
})
export class PortfolioEditPage {

  item: any;
  submitAttempt: boolean
  portfolioId: number

  constructor(public storage: Storage, public navCtrl: NavController, private formBuilder: FormBuilder, public saloonService: SaloonService, public navParams: NavParams, public loadingController: LoadingController) {
    let loader = this.loadingController.create({
      content: "Зарежда..."
    });
    loader.present();

    this.portfolioId = navParams.get('item');
    console.log(navParams.get('item'));

    this.item = this.formBuilder.group({
      description: ['']
    });

    if (this.portfolioId && this.portfolioId > 0) {
      this.storage.get('token').then((token) => {
          this.saloonService.singlePortfolio(token, this.portfolioId).
          then(data => {
            console.log(data);
            if (data != null && data.id > 0) {
              this.item.setValue({
                description: data.description
              });         
	      loader.dismiss();     
            }
          });
      });
    }
  }

  save() {
    let loader = this.loadingController.create({
      content: "Зарежда..."
    });
    loader.present();
    this.submitAttempt = true;
    
    this.storage.get('token').then((token) => {
        this.storage.get('itemId').then((itemId) => {
          this.saloonService.editPortfolioDetails(
            this.portfolioId,
            this.item.controls['description'].value,
            token
          ).
          then(data => {
            loader.dismiss();
	    this.navParams.get("parentPage").loadListData();
            this.navCtrl.pop();
          });
        });
    });
  }

}
