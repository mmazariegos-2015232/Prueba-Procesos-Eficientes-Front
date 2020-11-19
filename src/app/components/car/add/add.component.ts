import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { User } from 'src/app/models/user.model';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [CarService, UserService]

})
export class AddComponent implements OnInit {
  public car:   Car;
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
      }
    }
  }

  registerCar: () => void = ()=>{
    this._carService.registerCar(this.car).subscribe(
      response => {
        if (!response.message) {
          this.status = 'error';
        } else {
          this.status = "ok";
          this.car =  new Car("", "", "", 0, "", "");
          alert(response.message);
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
