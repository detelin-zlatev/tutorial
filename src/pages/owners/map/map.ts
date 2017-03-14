import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController, NavParams, LoadingController} from 'ionic-angular';

import { Geolocation } from 'ionic-native';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController) {
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
	
    let centerLatLng = null;
		let self = this;
		if (currentLatLng) {
			centerLatLng = currentLatLng;
			self.setupAndDisplayMap(currentLatLng, currentLatLng);
		} else {
			let loader = this.loadingController.create({
				content: "Определяне на местоположение..."
			});
			loader.present();

			Geolocation.getCurrentPosition().then((resp) => {
				centerLatLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
				loader.dismiss();
				self.setupAndDisplayMap(centerLatLng, null);
			}).catch((error) => {
				console.log('Error getting location', error);
			});
		}
    
 
    

        
 
  }


	setupAndDisplayMap(center:any, current: any) {
		let mapOptions = {
      center: center,
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

		if (current) {
			let marker = new google.maps.Marker({
					map: self.map,
					animation: google.maps.Animation.DROP,
					position: current
				});

				self.markers.push(marker);

				google.maps.event.addListener(marker, "click", function() {
						marker.setMap(null);
				});
    }
	}
}
