//modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
//primeng modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
//services
import { GeolocationService } from './geolocation.service';
import { GooglePlacesDirective } from './google-places.directive';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapComponent } from './map/map.component';

declare var require: any;


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    GooglePlacesDirective,
    MapComponent
  ],
  imports: [
    BrowserModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC3hmqBO3n_I7A6gFATgiMRvGFB4AQxkUY'
    }),
    GooglePlaceModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoidmlyZXNoLWtoYW5kZWx3YWwiLCJhIjoiY2pxNmVnN2hqMjdiaTQ4ankwZGg5aDJ4ZyJ9.dynn0Wrg3r56fntaYOd_bA' // Optionnal, can also be set per map (accessToken input of mgl-map)
    })
  ],
  providers: [GeolocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
