import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import {AppSettings} from '../appSettings';

@Injectable()
export class SaloonService {

  public currentDetails: any;

  constructor(public http: Http) {
    console.log('Hello LoginService Provider');
  }


  addEditDetails(
	id: number,
	categoryId: number,
      	name: string,
      	description: string,
      	cityId: number,
      	address: string,
      	email: string,
      	phone1: string,
      	phone2: string,
      	phone3: string,
	token: string) {
    
    if (this.currentDetails) {
        return Promise.resolve(this.currentDetails);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
	    category_id: categoryId,
	    name: name,
	    description: description,
	    city_id: cityId,
	    address: address,
	    email: email,
	    phone_1: phone1,
	    phone_2: phone2,
	    phone_3: phone3,
            token: token
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'saloons/add', body, options)
            .map(res => res.json())
            .subscribe(data => {
              this.currentDetails = data;
              resolve(this.currentDetails);
            });
    });
  }

}