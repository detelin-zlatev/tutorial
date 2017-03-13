import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController, NavParams} from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

@ViewChild('map') mapElement: ElementRef;
  map: any;
  
  public selectedLatLng: any;
  public markers:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  closeMap() {
		if (this.selectedLatLng) {
			this.navParams.get("parentPage").latLng = this.selectedLatLng;
		}
		this.navCtrl.pop();	
  }

  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
		let currentLatLng = this.navParams.get("parentPage").latLng; 	
	
		let centerLatLng = new google.maps.LatLng(-34.9290, 138.6010);
		if (currentLatLng) {
			centerLatLng = currentLatLng;
		}
    
 
    let mapOptions = {
      center: centerLatLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let self = this;
    google.maps.event.addListener(this.map, 'click', function(e) {
			self.selectedLatLng = e.latLng;
			
			for (var i = 0; i < self.markers.length; i++) {
          self.markers[i].setMap(null);
        }
			
			let marker = new google.maps.Marker({
					map: self.map,
					animation: google.maps.Animation.DROP,
					position: e.latLng
				});

				self.markers.push(marker);

				google.maps.event.addListener(marker, "click", function() {
						marker.setMap(null);
				});
		});

		console.log(currentLatLng);

    if (currentLatLng) {
			let marker = new google.maps.Marker({
					map: self.map,
					animation: google.maps.Animation.DROP,
					position: currentLatLng
				});

				self.markers.push(marker);

				google.maps.event.addListener(marker, "click", function() {
						marker.setMap(null);
				});
    }

        
 
  }
}
