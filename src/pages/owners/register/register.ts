import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import {LoginService} from '../../../providers/login-service';

import {PublishedPage} from '../published/published'

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [LoginService]
})
export class RegisterPage {

  userData: FormGroup;
  submitAttempt: boolean;
  token: string;
  existingEmail: boolean;

  constructor(public storage: Storage, public navCtrl: NavController, private formBuilder: FormBuilder, public loginService: LoginService) {
      let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

      this.userData = this.formBuilder.group({
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(emailRegex)]]},
        {validator: this.matchingPasswords('password', 'passwordConfirm')});
  }

  add() {
    this.submitAttempt = true;
    this.existingEmail = false;

    this.loginService.register(this.userData.controls['password'].value, this.userData.controls['email'].value).
      then(data => {
        console.log(data);
        if (data.user != null) {
          console.log(data.user.token);
          this.storage.set('token', data.user.token).then(() => this.goToPublished());
        } else {
          this.existingEmail = true;
          this.loginService.userData = null;
        }
      });
  }

  goToPublished() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(PublishedPage);
  }


  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
    }
  }

}
