import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor( private http: HttpClient ) { }

  getLocation() : any{
    return this.http.get('');
  }
}
