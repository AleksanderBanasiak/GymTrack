import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {HomeComponent} from "./pages/home/home.component";
import {TrainingPlansComponent} from "./components/training-plans/training-plans.component";
import {AddTrainingComponent} from "./components/add-training/add-training.component";

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'training-plans',
        component: TrainingPlansComponent
      },
      {
        path: 'add-training',
        component: AddTrainingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutPlanRoutingModule { }
