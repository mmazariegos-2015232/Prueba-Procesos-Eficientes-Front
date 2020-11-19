import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListComponent as ListUserComponent } from './components/user/list/list.component';
import { AddComponent as AddUserComponent } from './components/user/add/add.component';
import { UpdateComponent as UpdateUserComponent } from './components/user/update/update.component';
import { DeleteComponent as DeleteUserComponent } from './components/user/delete/delete.component';
import { ViewComponent as ViewUserComponent } from './components/user/view/view.component';
import { ListComponent as ListCarComponent } from './components/car/list/list.component';
import { AddComponent as AddCarComponent } from './components/car/add/add.component';
import { UpdateComponent as UpdateCarComponent } from './components/car/update/update.component';
import { DeleteComponent as DeleteCarComponent } from './components/car/delete/delete.component';
import { ViewComponent as ViewCarComponent } from './components/car/view/view.component';





const routes: Routes = [
  { path: '',                       redirectTo: '**', pathMatch: 'full' },
  { path: '',                       component: HomeComponent },
  { path: 'signin',                 component: LoginComponent },
  { path: 'users',                  component: ListUserComponent },
  { path: 'users/add',              component: AddUserComponent },
  { path: 'users/update/:id',       component: UpdateUserComponent },
  { path: 'users/delete/:id',       component: DeleteUserComponent },
  { path: 'users/view/:id',         component: ViewUserComponent },
  { path: 'cars',                   component: ListCarComponent },
  { path: 'cars/add',               component: AddCarComponent },
  { path: 'cars/update/:id',        component: UpdateCarComponent },
  { path: 'cars/delete/:id',        component: DeleteCarComponent },
  { path: 'cars/view/:id',          component: ViewCarComponent },
  { path: '**',                     component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
