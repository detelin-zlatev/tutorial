import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController, NavParams} from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-mappos',
  templateUrl: 'mappos.html'
})
export class MapPosPage {

@ViewChild('map') mapElement: ElementRef;
  map: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  closeMap() {
	this.navCtrl.pop();	
  }

  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
	let currentLatLng = new google.maps.LatLng(this.navParams.get("lat"), this.navParams.get("lng")); 
	console.log(this.navParams.get("lat"));	
	console.log(this.navParams.get("lng"));		

    	let mapOptions = {
	      center: currentLatLng,
	      zoom: 15,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    }
	 
	    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
	let marker = new google.maps.Marker({
					map: this.map,
					animation: google.maps.Animation.DROP,
					position: currentLatLng
				});
        
 
  }
}
