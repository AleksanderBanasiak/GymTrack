import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {authGuard} from "./services/guard/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: '',
    loadChildren: () => import('./modules/workout-plan/workout-plan.module').then(m => m.WorkoutPlanModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
