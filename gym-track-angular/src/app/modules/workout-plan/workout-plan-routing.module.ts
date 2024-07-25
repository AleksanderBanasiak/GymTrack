import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {HomeComponent} from "./pages/home/home.component";
import {TrainingPlansComponent} from "./components/training-plans/training-plans.component";
import {AddTrainingComponent} from "./components/add-training/add-training.component";
import {authGuard} from "../../services/guard/auth.guard";
import {WorkoutSessionComponent} from "./components/workout-session/workout-session.component";
import {WeightComponent} from "./components/weight/weight.component";
import {ChartsComponent} from "./components/charts/charts.component";
import {TrainingLogsComponent} from "./components/training-logs/training-logs.component";
import {RecordsComponent} from "./components/records/records.component";

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
      },
      {
        path: 'workout-session/:trainingId',
        component: WorkoutSessionComponent,
        canActivate: [authGuard]
      },
      {
        path: 'weight',
        component: WeightComponent,
        canActivate: [authGuard]
      },
      {
        path: 'charts',
        component: ChartsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'logs',
        component: TrainingLogsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'records',
        component: RecordsComponent,
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
