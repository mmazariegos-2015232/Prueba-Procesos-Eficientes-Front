import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [CarService, UserService],
})
export class ListComponent implements OnInit {
  public cars:  Car[];
  public status: string;

  constructor(
    private _carService: CarService,
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    if (!this._userService.getIdentity() || !this._userService.getToken()) {
      this._router.navigate(['']);
    } else {
      if (this._userService.getIdentity().role != "admin") {
        this._router.navigate(['cars']);
      } else {
        this.listCars();
      }
    }
  }

  listCars: () => void = () => {
    this._carService.listCars().subscribe(
      response => {
        if (response.cars.length == 0) {
          this.status = "error";
        } else {
          this.cars = response.cars;
          this.status = "ok";
        }
      },
      error => this.onError(error)
    )
  }

  onError: (error: any) => void = (error) => {
    var errorMessage = <any>error;
    if (errorMessage != null) {
      this.status = 'error';
    }
  }

}
