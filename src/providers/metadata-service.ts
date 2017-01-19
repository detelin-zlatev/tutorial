import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MetadataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MetadataService {

  public data: any;

  constructor(public http: Http) {
    console.log('Hello MetadataService Provider');
  }


  load() {
    if (this.data) {
        // already loaded data
        return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
        // We're using Angular HTTP provider to request the data,
        // then on the response, it'll map the JSON data to a parsed JS object.
        // Next, we process the data and resolve the promise with the new data.
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.get('http://localhost:8765/rest/metadata', options)
            .map(res => res.json())
            .subscribe(data => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              this.data = data;
              resolve(this.data);
            });
    });
  }

}
