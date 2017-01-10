import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {PublishedPage} from '../published/published'

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  constructor(public navCtrl: NavController) {
    
  }

  goToPublished() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(PublishedPage);
  }
}
