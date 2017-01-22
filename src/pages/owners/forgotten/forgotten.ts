import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import {LoginService} from '../../../providers/login-service';

@Component({
  selector: 'page-forgotten',
  templateUrl: 'forgotten.html',
  providers: [LoginService]
})
export class ForgottenPage {

  userData: FormGroup;
  submitAttempt: boolean;
  token: string;

  constructor(private formBuilder: FormBuilder, public loginService: LoginService) {
      let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

      this.userData = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(emailRegex)]]});
  }

  add() {
    this.submitAttempt = true;

    this.loginService.forgotten(this.userData.controls['email'].value);
  }
}
