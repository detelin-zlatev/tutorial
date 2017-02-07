import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {LoginPage} from '../owners/login/login'
import {PublishedPage} from '../owners/published/published'
import {SearchPage} from '../clients/search/search'

import {LoginService} from '../../providers/login-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LoginService]
})
export class HomePage {

  constructor(public storage: Storage, public navCtrl: NavController, public loginService: LoginService, public loadingController: LoadingController) {
    
  }

  goToLogin() {
    let loader = this.loadingController.create({
      content: "Зарежда..."
    });
    loader.present();

    this.storage.get('token').then((val) => {
       console.log('Token present: ', val);
       if (val) {
         this.loginService.validate(val).
          then(data => {
            console.log(data);
            if (data == true) {
              this.navCtrl.push(PublishedPage, {
		       loader: loader
		     });
            } else {
              this.navCtrl.push(LoginPage, {
		       loader: loader
		     });
            }
            this.loginService.tokenValid = null;
          });
       } else {
         this.navCtrl.push(LoginPage, {
		       loader: loader
		     });
       }
     });
  }

  goToSearch() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(SearchPage);
  }

}
