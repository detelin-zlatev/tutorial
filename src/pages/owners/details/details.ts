import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { NavController } from 'ionic-angular';

import {PublishedPage} from '../published/published'

import {SaloonService} from '../../../providers/saloon-service';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [SaloonService]
})
export class DetailsPage {

  item: any;
  itemId: number;
  submitAttempt: boolean;

  constructor(public storage: Storage, public navCtrl: NavController, private formBuilder: FormBuilder, public saloonService: SaloonService) {
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
  }

  goToPublished() {
    this.navCtrl.push(PublishedPage);
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
        });
    });
  }

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
    }
  }
}
