import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { User } from 'src/app/models/user.model';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  providers: [CarService, UserService]
})
export class DeleteComponent implements OnInit {
  public car:  Car;
  public status: string;
  public state    = ["perfecto", "daño menor", "reparacion urgente", "en reparacion", "descarte"]
  public statesEn  = [{ name: "perfect" }, { name: "minor damage" }, { name: "urgent repair" }, { name: "in repair" }, { name: "discard" }];


  constructor(
    private _userService: UserService,
    private _carService:  CarService,
    private _router:      Router
  ) { 
    this.car = new Car("", "", "", 0, "", "")
  }

  ngOnInit(): void {
    if (!this._userService.getIdentity() || !this._userService.getToken()) {
      this._router.navigate(['']);
    } else {
      if (this._userService.getIdentity().role != "admin") {
        this._router.navigate(['cars']);
      } else {
        this.getCarToDelete();
      }
    }
  }

  getCarToDelete: () => void = () => {
    var carId: string = this._router.url.split('/').pop();
    this._carService.getCar(carId).subscribe(
      response => {
        if (!response.car) {
          this.status = 'error';
        } else {
          this.status = 'ok';
          this.car = response.car;
        }
      },
      error => this.onError(error)
    );
  }

  deleteCar: () => void = () => {
    var deleteConfirmation = confirm("Are you sure to delete the car?");
    if (deleteConfirmation) {
      this._carService.deleteCar(this.car._id).subscribe(
        response => {
          if (!response.message) {
            this.status = 'error';
          } else {
            this.status = 'ok';
            this.getCarToDelete();
            alert(response.message);
            this._router.navigate(["cars"]);
          }
        },
        error => this.onError(error)
      );
    }
  }

  onError: (error: any) => void = (error) => {
    var errorMessage = <any>error;
    
    if (errorMessage != null) {
      this.status = 'error';
    }
  }
}
