import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import {AppSettings} from '../appSettings';

/*
  Generated class for the MetadataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {

  public userData: any;
  public newToken: string;
  public tokenValid: boolean;

  constructor(public http: Http) {
    console.log('Hello LoginService Provider');
  }


  register(password: string, email: string) {
    if (this.userData) {
        return Promise.resolve(this.userData);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
          password: password,
          email: email
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'users/add', body, options)
            .map(res => res.json())
            .subscribe(data => {
              this.userData = data;
              resolve(this.userData);
            });
    });
  }


  validate(token: string) {
    if (this.tokenValid) {
        return Promise.resolve(this.tokenValid);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
          token: token
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'users/validate', body, options)
            .map(res => res.json())
            .subscribe(data => {
              console.log(data);
              this.tokenValid = (data.user != null);
              resolve(this.tokenValid);
            });
    });
  }


  forgotten(email: String) {
      let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      let body = JSON.stringify({
        email: email
      });

      console.log(body);

      this.http.post(AppSettings.API_ENDPOINT + 'users/forgotten', body, options)
          .map(res => res.json())
          .subscribe(data => {
            console.log(data);
            
      });
  }


  login(email: string, password: string) {
    if (this.newToken) {
        return Promise.resolve(this.newToken);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
          email: email,
          password: password
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'users/loginremote', body, options)
            .map(res => res.json())
            .subscribe(data => {
              if (data.user != null) {
                this.newToken = data.user.token;
              } else {
                this.newToken = null;
              }
              resolve(this.newToken);
            });
    });
  }

}
