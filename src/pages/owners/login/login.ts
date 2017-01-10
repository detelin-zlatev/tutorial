import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {PublishedPage} from '../published/published'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
    
  }

  goToPublished() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(PublishedPage);
  }

}
