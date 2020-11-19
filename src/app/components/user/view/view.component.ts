import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [UserService]
})
export class ViewComponent implements OnInit {
  public user: User;
  public status: string;
  public roles = ["admin", "operador"]
  public rolesEn = [{ name: "Admin" }, { name: "Operator" }];

  constructor(
    private _router: Router,
    private _userService: UserService,
  ) {
    this.user = new User("", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    if (!this._userService.getIdentity() || !this._userService.getToken()) {
      this._router.navigate(['']);
    } else {
      if (this._userService.getIdentity().role != "admin") {
        this._router.navigate(['cars']);
      } else {
        this.getUserToView();
      }
    }
  }

  getUserToView: () => void = () => {
    var userId: string = this._router.url.split('/').pop();
    this._userService.getUser(userId).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
        } else {
          this.status = 'ok';
          this.user = response.user;
        }
      },
      error => this.onError(error)
    );
  }

  getUser: (userId) => void = (userId) => {
    this._userService.getUser(userId).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
        } else {
          this.status = 'ok';
          this.getUserToView();
          alert(response.message);
          this._router.navigate(["users"]);
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
