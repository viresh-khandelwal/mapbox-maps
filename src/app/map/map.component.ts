import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GeolocationService } from './../geolocation.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
//var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { HttpRequestsService } from 'src/app/map/http-requests.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  coordinates: number[] = [0, 0];
  userLocationMarker: any;
  geocoder: any;
  userAddress: string;

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('geocoder') geocoderInputBox: ElementRef;

  constructor(
    private geolocationService: GeolocationService,
    private httpRequestsService: HttpRequestsService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.defineUserLocationMarker();
    this.getUserLocationOnMap();
  }

  getUserLocationOnMap(): void {
    this.geolocationService.getLocation({
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }).subscribe(
      (position) => {
        let longitude: number, latitude:number;
        [ longitude , latitude ]  = [ position.coords.longitude , position.coords.latitude ];
        this.coordinates = [longitude, latitude];
        this.setUserAddress(longitude,latitude);
        this.initializeMap();
      },
      (error) => { console.log(error) }
      )
  }

  initializeMap(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoidmlyZXNoLWtoYW5kZWx3YWwiLCJhIjoiY2pxNmVnN2hqMjdiaTQ4ankwZGg5aDJ4ZyJ9.dynn0Wrg3r56fntaYOd_bA';
    const map = new mapboxgl.Map({
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [this.coordinates[0], this.coordinates[1]],
      minZoom: 8,
      zoom: 12
    });
    this.userLocationMarker.setLngLat([this.coordinates[0], this.coordinates[1]]).addTo(map);
    //initialize geocoder input box for forward geocoding
    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    });

    this.geocoderInputBox.nativeElement.appendChild(geocoder.onAdd(map));

    // Listen for the `result` event from the MapboxGeocoder that is triggered when a user
    // makes a selection and add a symbol that matches the result.
    geocoder.on('result', (event) => {
      console.log(event);
      this.userAddress = event.result.place_name;
      this.coordinates = event.result.center;
      this.userLocationMarker.setLngLat([this.coordinates[0], this.coordinates[1]]);
    });

    map.on('load', function () {
      map.addSource('single-point', {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": []
        }
      });
      map.addLayer({
        "id": "point",
        "source": "single-point",
        "type": "circle",
        "paint": {
          "circle-radius": 10,
          "circle-color": "#007cbf"
        }
      });
    })
  }

  defineUserLocationMarker(): void {
    this.userLocationMarker = new mapboxgl.Marker({
      draggable: true
    });

    this.userLocationMarker.on('dragend', (event) => {
      let lngLat = this.userLocationMarker.getLngLat();
      let longitude: number, latitude:number;
      [ longitude , latitude ]  = [ lngLat.lng , lngLat.lat ];
      this.coordinates = [longitude, latitude];
      this.setUserAddress(longitude, latitude);
    }); 
  }

  setUserAddress(longitude,latitude): void{
    this.httpRequestsService.getUserAddress(longitude, latitude).subscribe((data) => {
      this.userAddress = 'near ' + data.features[0].place_name;
    });
  }

}
