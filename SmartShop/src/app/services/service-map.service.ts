import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ignoreElements } from 'rxjs/operators';
import { promise } from 'protractor';



@Injectable({
  providedIn: 'root'
})
export class ServiceMapService {

  constructor(private http: HttpClient) {
  }

  getServicesMap(lat, lng){
    let arr=[];
    let city;
    this.http.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+ lat + '&lon='+ lng).subscribe(data => {
      
      arr.push({
        city: data["address"].city,
        country: data["address"].country,
        road: data["address"].road
      });
    });
    return arr;
  }
}
