import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService]
})
export class AddComponent implements OnInit {
  public user:    User;
  public status:  string;
  public roles = ["admin", "operador"]
  public rolesEn = [{ name: "Admin" }, { name: "Operator" }];

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.user = new User("", "", "", "", "", "", "");
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

  register: () => void = () => {
    this._userService.register(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
        } else {
          this.status = "ok";
          alert(response.message);
        }
      },
      error => this.onError(error)
    );
  }

  onError: (error: any) => void = (error) => {
    var errorMessage = <any>error;
    
    if (errorMessage != null) {
      this.status = 'error';
    }
  }
}
