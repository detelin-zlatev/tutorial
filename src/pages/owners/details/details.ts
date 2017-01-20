import { Component } from '@angular/core';
import {Validators, FormBuilder } from '@angular/forms';

import { NavController } from 'ionic-angular';

import {PublishedPage} from '../published/published'

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  item: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.item = this.formBuilder.group({
      category: ['', Validators.required],
	name: ['', Validators.required],
	description: [''],
	city: ['', Validators.required],
	address: ['', Validators.required],
	email: ['', Validators.required],
	phone1: ['', Validators.required],
	phone2: [''],
	phone3: ['']
    });
  }

  goToPublished() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(PublishedPage);
  }

  add() {
    console.log(this.item);
  }
}
