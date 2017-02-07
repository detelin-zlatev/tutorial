import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { NavController, NavParams } from 'ionic-angular';

import {PublishedPage} from '../published/published'
import {RegisterPage} from '../register/register'
import {ForgottenPage} from '../forgotten/forgotten'

import {LoginService} from '../../../providers/login-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {

  userData: FormGroup;
  submitAttempt: boolean;
  loginValid: boolean;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public loginService: LoginService, public storage: Storage, public navParams: NavParams) {
      this.navParams.get('loader').dismiss();
      this.userData = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  goToPublished() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(PublishedPage);
  }

  goToRegister() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(RegisterPage);
  }

  goToForgotten() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(ForgottenPage);
  }

  login() {
    this.submitAttempt = true;
    this.loginValid = true;

    this.loginService.login(this.userData.controls['email'].value, this.userData.controls['password'].value).
      then(data => {
        console.log(data);
        if (data == null) {
          this.loginValid = false;
        } else {
          this.storage.set('token', data);
          this.goToPublished();
        }
      });
  }

}
