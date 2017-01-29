import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import {AppSettings} from '../appSettings';

@Injectable()
export class MetadataService {

  public data: any;

  constructor(public http: Http) {
    console.log('Hello MetadataService Provider');
  }


  load() {
    if (this.data) {
        return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.get(AppSettings.API_ENDPOINT + 'rest/metadata', options)
            .map(res => res.json())
            .subscribe(data => {
              this.data = data;
              resolve(this.data);
            });
    });
  }

}
