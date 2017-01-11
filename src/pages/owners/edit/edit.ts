import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})
export class EditPage {

  constructor(public navCtrl: NavController) {
    
  }

  close() {
      this.navCtrl.pop();
  }

}
