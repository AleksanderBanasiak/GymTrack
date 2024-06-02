import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {HomeComponent} from "./pages/home/home.component";
import {TrainingPlansComponent} from "./components/training-plans/training-plans.component";
import {AddTrainingComponent} from "./components/add-training/add-training.component";
import {authGuard} from "../../services/guard/auth.guard";

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [authGuard]
      },
      {
        path: 'training-plans',
        component: TrainingPlansComponent,
        canActivate: [authGuard]
      },
      {
        path: 'training',
        component: AddTrainingComponent,
        canActivate: [authGuard]
      },
      {
        path: 'training/:trainingId',
        component: AddTrainingComponent,
        canActivate: [authGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutPlanRoutingModule { }
