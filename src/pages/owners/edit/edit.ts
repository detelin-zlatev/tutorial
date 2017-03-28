import { Component } from '@angular/core';
import {Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import {SaloonService} from '../../../providers/saloon-service';

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
  providers: [SaloonService]
})
export class EditPage {

  item: any;
  submitAttempt: boolean
  promotionId: number

  constructor(public storage: Storage, public navCtrl: NavController, private formBuilder: FormBuilder, public saloonService: SaloonService, public navParams: NavParams, public loadingController: LoadingController, public alertCtrl: AlertController) {
    this.promotionId = navParams.get('item');
    console.log(navParams.get('item'));

    this.item = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      oldPrice: ['', Validators.required],
      newPrice: ['', Validators.required]
    });

    if (this.promotionId && this.promotionId > 0) {
      let loader = this.loadingController.create({
	      content: "Зарежда..."
	    });
	    loader.present();

      this.storage.get('token').then((token) => {
          this.saloonService.singlePromotion(token, this.promotionId).
          then(data => {
            console.log(data);
            if (data != null && data.id > 0) {
              this.item.setValue({ 
                name: data.name,
                description: data.description,
                oldPrice: data.old_price,
                newPrice: data.new_price
              });   
	      loader.dismiss();           
            }
          });
      });
    }
  }

  save() {
    this.submitAttempt = true;
    
    this.storage.get('token').then((token) => {
        this.storage.get('itemId').then((itemId) => {
          this.saloonService.addEditPromoDetails(
            this.promotionId,
            this.item.controls['name'].value,
            this.item.controls['description'].value,
            this.item.controls['oldPrice'].value,
            this.item.controls['newPrice'].value,
            itemId,
            token
          ).
          then(data => {
	    if (!this.promotionId) {
		let alert = this.alertCtrl.create({
			      title: 'Добавена промоция',
			      subTitle: 'Вашата промоция беше въведена успешно!',
			      buttons: ['OK']
			    });
			    alert.present();			
		}
            this.navParams.get("parentPage").loadListData();
            this.navCtrl.pop();
          });
        });
    });
  }

}
