import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {SaloonsPage} from '../saloons/saloons'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public navCtrl: NavController) {
    
  }

  goToSaloons() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(SaloonsPage);
  }

}
