import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private url: string;
  private identity: any;
  private token: string;

  constructor(
    private _http: HttpClient,
    private _userService: UserService,  
    ) {
    this.url = GLOBAL.apiUrl;
  }

  registerCar: (car: Car) => Observable<any> = (car) => {
    let params = JSON.stringify(car);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());

    return this._http.post(`${this.url}/cars`, params, { headers: headers });
  }
  updateCar: (car: Car) => Observable<any> = (car) => {
    let params = JSON.stringify(car);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());

    return this._http.put(`${this.url}/cars/${car._id}`, params, { headers: headers });
  }

  deleteCar: (carId: string) => Observable<any> = (carId) => {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());

    return this._http.delete(`${this.url}/cars/${carId}`, { headers: headers });
  }

  getCar: (carId: string) => Observable<any> = (carId) => {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());

    return this._http.get(`${this.url}/cars/${carId}`, { headers: headers });
  }

  listCars: () => Observable<any> = () => {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());

    return this._http.get(`${this.url}/cars`, { headers: headers });
  }

  getIdentity: () => any = () => {
    let identity2 = JSON.parse(localStorage.getItem('identity'));
    this.identity = identity2 != "undefined" ? identity2 : null;
    return this.identity;
  }

  getToken: () => string = () => {
    let token2 = localStorage.getItem('token');
    this.token = token2 != "undefined" ? token2 : null;
    return this.token;
  }
}
