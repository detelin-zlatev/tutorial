import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {SaloonPage} from '../saloon/saloon'
import {SearchPage} from '../search/search'

@Component({
  selector: 'page-saloons',
  templateUrl: 'saloons.html'
})
export class SaloonsPage {

  constructor(public navCtrl: NavController) {
    
  }

  goToSaloon() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(SaloonPage);
  }

  goToSearch() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(SearchPage);
  }

}
