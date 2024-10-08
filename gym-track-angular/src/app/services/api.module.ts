/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { WorkoutSessionControllerService } from './services/workout-session-controller.service';
import { WorkoutLogsControllerService } from './services/workout-logs-controller.service';
import { WeightControllerService } from './services/weight-controller.service';
import { PlanControllerService } from './services/plan-controller.service';
import { PlanExerciseControllerService } from './services/plan-exercise-controller.service';
import { NotesControllerService } from './services/notes-controller.service';
import { FavoriteExerciseControllerService } from './services/favorite-exercise-controller.service';
import { ExerciseControllerService } from './services/exercise-controller.service';
import { AuthenticationControllerService } from './services/authentication-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    WorkoutSessionControllerService,
    WorkoutLogsControllerService,
    WeightControllerService,
    PlanControllerService,
    PlanExerciseControllerService,
    NotesControllerService,
    FavoriteExerciseControllerService,
    ExerciseControllerService,
    AuthenticationControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
