import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddComponent as AddUserComponent} from './components/user/add/add.component';
import { AddComponent as AddCarComponent} from './components/car/add/add.component';
import { UpdateComponent as UpdateUserComponent } from './components/user/update/update.component';
import { UpdateComponent as UpdateCarComponent } from './components/car/update/update.component';
import { DeleteComponent as DeleteUserComponent } from './components/user/delete/delete.component';
import { DeleteComponent as DeleteCarComponent } from './components/car/delete/delete.component';
import { ViewComponent as ViewUserComponent } from './components/user/view/view.component';
import { ViewComponent as ViewCarComponent } from './components/car/view/view.component';
import { ListComponent as ListUserComponent } from './components/user/list/list.component';
import { ListComponent as ListCarComponent } from './components/car/list/list.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AddUserComponent,
    AddCarComponent,
    UpdateUserComponent,
    UpdateCarComponent,
    DeleteUserComponent,
    DeleteCarComponent,
    ViewUserComponent,
    ViewCarComponent,
    ListUserComponent,
    ListCarComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }