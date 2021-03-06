import { Component } from '@angular/core';
import {Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { NavController, NavParams, ModalController, AlertController} from 'ionic-angular';

import {PublishedPage} from '../published/published'
import {MapPage} from '../map/map'

import {SaloonService} from '../../../providers/saloon-service';
import {MetadataService} from '../../../providers/metadata-service';

declare var google;

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
  public loading: boolean;
  public latLng: any;

  constructor(public storage: Storage, public navCtrl: NavController, private formBuilder: FormBuilder, public saloonService: SaloonService, public metadataService: MetadataService, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController) {
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
        this.navCtrl.parent.getByIndex(1).enabled = true;
	this.navCtrl.parent.getByIndex(2).enabled = true;
        this.itemId = id;
        this.loading = true;
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
		if (data.lat != null && data.lng != null) {
                	this.latLng = new google.maps.LatLng(data.lat, data.lng); 
		}
                this.navParams.get('loader').dismiss();
	      }
            });
        });
      } else {
	this.navCtrl.parent.getByIndex(1).enabled = false;
	this.navCtrl.parent.getByIndex(2).enabled = false;      
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
    console.log('Lat Lng: ' + this.latLng);
    
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
          this.latLng ? this.latLng.lat() : null,
          this.latLng ? this.latLng.lng() : null,
          token
	      ).
        then(data => {
          if (data != null && data.id > 0) {
              this.storage.set('itemId', data.id).then(() => {
		if (!this.itemId) {
			let alert = this.alertCtrl.create({
			      title: 'Добавен салон',
			      subTitle: 'Вашият салон беше въведен успешно!',
			      buttons: ['OK']
			    });
			    alert.present();	
		}

		this.navCtrl.parent.getByIndex(1).enabled = true;
		this.navCtrl.parent.getByIndex(2).enabled = true;
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
        if (!this.loading) {
		this.navParams.get('loader').dismiss();
	}
      });
  }

  map() {
    let modal = this.modalCtrl.create(MapPage, {
       "parentPage": this
     });
    modal.present();
  }
}
