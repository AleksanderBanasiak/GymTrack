import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutPlanRoutingModule } from './workout-plan-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { TrainingPlansComponent } from './components/training-plans/training-plans.component';
import { AddTrainingComponent } from './components/add-training/add-training.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    HomeComponent,
    TrainingPlansComponent,
    AddTrainingComponent
  ],
    imports: [
        CommonModule,
        WorkoutPlanRoutingModule,
        FormsModule
    ]
})
export class WorkoutPlanModule { }
