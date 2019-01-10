import { Component, OnInit } from '@angular/core';
import { GeolocationService } from './geolocation.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
//var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'project-x-ui';
  constructor() { }

  ngOnInit() { }

}
