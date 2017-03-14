import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import {AppSettings} from '../appSettings';

@Injectable()
export class SaloonService {

  public currentDetails: any;
  public currentPromoDetails: any;
  public saloons: any;
  public saloon: any;
  public promotions: any;
  public promotion: any;
  public deleteOk: boolean;
  public deletePortfolioOk: boolean;
  public searches: any;
  public portfolios: any;
  public portfolio: any;
  public portfolioEditOk: boolean;

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
	lat: number,
	lng: number,
	      token: string) {
    
    if (this.currentDetails) {
        return Promise.resolve(this.currentDetails);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
            id: id ? id : 0,
            category_id: categoryId,
            name: name,
            description: description,
            city_id: cityId,
            address: address,
            email: email,
            phone_1: phone1,
            phone_2: phone2,
            phone_3: phone3,
	    lat: lat,
	    lng: lng,
            token: token
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'saloons/' + (id ? 'edit' : 'add') + 'Remote' , body, options)
            .map(res => res.json())
            .subscribe(data => {
              this.currentDetails = data.saloon;
              resolve(this.currentDetails);
            });
    });
  }

  listSaloons(token: string) {
    
    if (this.saloons) {
        return Promise.resolve(this.saloons);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
            token: token
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'saloons/list' , body, options)
            .map(res => res.json())
            .subscribe(data => {
              this.saloons = data;
              resolve(this.saloons);
            });
    });
  }


  singleSaloon(token: string, itemId: number) {
    
    if (this.saloon) {
        return Promise.resolve(this.saloon);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
            token: token,
            id: itemId
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'saloons/single' , body, options)
            .map(res => res.json())
            .subscribe(data => {
              this.saloon = data.saloon;
              resolve(this.saloon);
            });
    });
  }


  listPromotions(token: string, itemId: number) {
    
    if (this.promotions) {
        return Promise.resolve(this.promotions);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
            token: token,
            id: itemId
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'promos/list' , body, options)
            .map(res => res.json())
            .subscribe(data => {
              this.promotions = data.promos;
              resolve(this.promotions);
            });
    });
  }


  listPortfolios(token: string, itemId: number) {
    
    if (this.portfolios) {
        return Promise.resolve(this.portfolios);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
            token: token,
            id: itemId
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'portfolios/list' , body, options)
            .map(res => res.json())
            .subscribe(data => {
              console.log(data);  
              this.portfolios = data.portfolios;
              resolve(this.portfolios);
            });
    });
  }


  addEditPromoDetails(
	    id: number,
	    name: string,
      	description: string,
      	oldPrice: string,
      	newPrice: string,
        saloonId: number,
	    token: string) {
    
    if (this.currentPromoDetails) {
        return Promise.resolve(this.currentPromoDetails);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
            id: id ? id : 0,
            name: name,
            description: description,
            old_price: oldPrice,
            new_price: newPrice,
            saloon_id: saloonId,
            token: token
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'promos/' + (id ? 'edit' : 'add') + 'Remote' , body, options)
            .map(res => res.json())
            .subscribe(data => {
              this.currentPromoDetails = data.promo;
              resolve(this.currentPromoDetails);
            });
    });
  }

  singlePromotion(token: string, itemId: number) {
    
    if (this.promotion) {
        return Promise.resolve(this.promotion);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
            token: token,
            id: itemId
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'promos/single' , body, options)
            .map(res => res.json())
            .subscribe(data => {
              this.promotion = data.promo;
              resolve(this.promotion);
            });
    });
  }


  deletePromotion(token: string, promotionId: number) {
    
    if (this.deleteOk) {
        return Promise.resolve(this.deleteOk);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
            token: token,
            id: promotionId
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'promos/deleteRemote' , body, options)
            .map(res => res.json())
            .subscribe(data => {
              this.deleteOk = true;
              resolve(this.deleteOk);
            });
    });
  }


  deletePortfolio(token: string, portfolioId: number) {
    
    if (this.deletePortfolioOk) {
        return Promise.resolve(this.deletePortfolioOk);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
            token: token,
            id: portfolioId
        }); 

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'portfolios/deleteRemote' , body, options)
            .map(res => res.json())
            .subscribe(data => {
              this.deletePortfolioOk = true;
              resolve(this.deletePortfolioOk);
            });
    });
  }


  singlePortfolio(token: string, itemId: number) {
    
    if (this.portfolio) {
        return Promise.resolve(this.portfolio);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
            token: token,
            id: itemId
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'portfolios/single' , body, options)
            .map(res => res.json())
            .subscribe(data => {
              this.portfolio = data.portfolio;
              resolve(this.portfolio);
            });
    });
  }


  editPortfolioDetails(
	    id: number,
	    description: string,
      	token: string) {
    
    if (this.portfolioEditOk) {
        return Promise.resolve(this.portfolioEditOk);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
            id: id ? id : 0,
            description: description,
            token: token
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'portfolios/editRemote' , body, options)
            .map(res => res.json())
            .subscribe(data => {
              this.portfolioEditOk = true;
              resolve(this.portfolioEditOk);
            });
    });
  }


  searchSaloons(city_id: number, category_id: number, promo: boolean, closest: boolean, lat: number, lng: number, page: number, size: number) {
    
    if (this.searches) {
        return Promise.resolve(this.searches);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({
            city_id: city_id,
            category_id: category_id,
            promo: promo,
            closest: closest,
            lat: lat,
            lng: lng,
            page: page,
            size: size
        });

        console.log(body);

        this.http.post(AppSettings.API_ENDPOINT + 'rest/search' , body, options)
            .map(res => res.json())
            .subscribe(data => {
              this.searches = data;
              resolve(this.searches);
            });
    });
  }

}
