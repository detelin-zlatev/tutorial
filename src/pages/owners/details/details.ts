import { Component } from '@angular/core';
import {Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { NavController } from 'ionic-angular';

import {PublishedPage} from '../published/published'

import {SaloonService} from '../../../providers/saloon-service';
import {MetadataService} from '../../../providers/metadata-service';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [SaloonService, MetadataService]
})
export class DetailsPage {

  item: any;
  itemId: number;
  submitAttempt: boolean;
  public categories: any;

  public cities: any;

  constructor(public storage: Storage, public navCtrl: NavController, private formBuilder: FormBuilder, public saloonService: SaloonService, public metadataService: MetadataService) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    
    this.item = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      city: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      phone1: ['', Validators.required],
      phone2: [''],
      phone3: ['']
    });

    this.storage.get('itemId').then((id) => {
      if (id && id > 0) {
        this.itemId = id;
        this.storage.get('token').then((token) => {
            this.saloonService.singleSaloon(token, this.itemId).
            then(data => {
              console.log(data);
              if (data != null && data.id > 0) {
                this.item.setValue({
                  category: data.category_id,
                  name: data.name,
                  description: data.description,
                  city: data.city_id,
                  address: data.address,
                  email: data.email,
                  phone1: data.phone_1,
                  phone2: data.phone_2,
                  phone3: data.phone_3
                });

                
              }
            });
        });
      }
      this.loadMetadata();
    });
  }

  goToPublished() {
    this.navCtrl.parent.parent.popTo(PublishedPage)
    
    //this.navCtrl.popTo();
  }

  save() {
    this.submitAttempt = true;
    
    this.storage.get('token').then((token) => {
        this.saloonService.addEditDetails(
          this.itemId,
          this.item.controls['category'].value, 
          this.item.controls['name'].value,
          this.item.controls['description'].value,
          this.item.controls['city'].value,
          this.item.controls['address'].value,
          this.item.controls['email'].value,
          this.item.controls['phone1'].value,
          this.item.controls['phone2'].value,
          this.item.controls['phone3'].value,
          token
	      ).
        then(data => {
          if (data != null && data.id > 0) {
              this.storage.set('itemId', data.id).then(() => {
                this.navCtrl.parent.select(1);
              });
          }
          this.saloonService.currentDetails = null;
        });
    });
  }

  loadMetadata() {
      this.metadataService.load()
      .then(data => {
        this.categories = data.categories;
        this.cities = data.cities;    
      });
  }
}
