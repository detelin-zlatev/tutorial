import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {LoginPage} from '../owners/login/login'
import {SearchPage} from '../clients/search/search'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

  goToLogin() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(LoginPage);
  }

  goToSearch() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(SearchPage);
  }

}
