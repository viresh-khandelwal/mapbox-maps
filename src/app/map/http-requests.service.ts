import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(private http: HttpClient) { }

  getUserAddress(longitude,latitude): Observable<any>{
    mapboxgl.accessToken = 'pk.eyJ1IjoidmlyZXNoLWtoYW5kZWx3YWwiLCJhIjoiY2pxNmVnN2hqMjdiaTQ4ankwZGg5aDJ4ZyJ9.dynn0Wrg3r56fntaYOd_bA';
    return this.http.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+longitude+','+latitude+'.json?access_token='+mapboxgl.accessToken);
  }
}
