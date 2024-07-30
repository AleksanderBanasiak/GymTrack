import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {WorkoutPlanRoutingModule} from './workout-plan-routing.module';
import {MainComponent} from './pages/main/main.component';
import {MenuComponent} from './components/menu/menu.component';
import {HomeComponent} from './pages/home/home.component';
import {TrainingPlansComponent} from './components/training-plans/training-plans.component';
import {AddTrainingComponent} from './components/add-training/add-training.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WorkoutSessionComponent} from './components/workout-session/workout-session.component';
import {LinechartComponent} from './components/linechart/linechart.component';
import {HighchartsChartModule} from "highcharts-angular";
import {WeightComponent} from './components/weight/weight.component';
import {ExerciseInSessionComponent} from './components/exercise-in-session/exercise-in-session.component';
import {ChartsComponent} from './components/charts/charts.component';
import {TrainingLogsComponent} from './components/training-logs/training-logs.component';
import {RecordsComponent} from './components/records/records.component';
import {DatePickerComponent} from './components/date-picker/date-picker.component';
import { ContactComponent } from './components/contact/contact.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    HomeComponent,
    TrainingPlansComponent,
    AddTrainingComponent,
    WorkoutSessionComponent,
    LinechartComponent,
    WeightComponent,
    ExerciseInSessionComponent,
    ChartsComponent,
    TrainingLogsComponent,
    RecordsComponent,
    DatePickerComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    WorkoutPlanRoutingModule,
    FormsModule,
    NgOptimizedImage,
    HighchartsChartModule,
    ReactiveFormsModule,
  ]
})
export class WorkoutPlanModule { }
