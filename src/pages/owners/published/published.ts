import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {PublishPage} from '../publish/publish'

@Component({
  selector: 'page-published',
  templateUrl: 'published.html'
})
export class PublishedPage {

  constructor(public navCtrl: NavController) {
    
  }

  goToPublish() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(PublishPage);
  }

}
