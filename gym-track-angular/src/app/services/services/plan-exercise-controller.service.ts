/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deletePlanExercise } from '../fn/plan-exercise-controller/delete-plan-exercise';
import { DeletePlanExercise$Params } from '../fn/plan-exercise-controller/delete-plan-exercise';
import { getAllPlanExerciseWithoutPlan } from '../fn/plan-exercise-controller/get-all-plan-exercise-without-plan';
import { GetAllPlanExerciseWithoutPlan$Params } from '../fn/plan-exercise-controller/get-all-plan-exercise-without-plan';
import { PlanExerciseResponse } from '../models/plan-exercise-response';
import { savePlanExercise } from '../fn/plan-exercise-controller/save-plan-exercise';
import { SavePlanExercise$Params } from '../fn/plan-exercise-controller/save-plan-exercise';
import { setWorkoutPlan } from '../fn/plan-exercise-controller/set-workout-plan';
import { SetWorkoutPlan$Params } from '../fn/plan-exercise-controller/set-workout-plan';

@Injectable({ providedIn: 'root' })
export class PlanExerciseControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `savePlanExercise()` */
  static readonly SavePlanExercisePath = '/plan-exercise';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `savePlanExercise()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePlanExercise$Response(params: SavePlanExercise$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return savePlanExercise(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `savePlanExercise$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePlanExercise(params: SavePlanExercise$Params, context?: HttpContext): Observable<number> {
    return this.savePlanExercise$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `setWorkoutPlan()` */
  static readonly SetWorkoutPlanPath = '/plan-exercise/set-plan';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setWorkoutPlan()` instead.
   *
   * This method doesn't expect any request body.
   */
  setWorkoutPlan$Response(params?: SetWorkoutPlan$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return setWorkoutPlan(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setWorkoutPlan$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setWorkoutPlan(params?: SetWorkoutPlan$Params, context?: HttpContext): Observable<void> {
    return this.setWorkoutPlan$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllPlanExerciseWithoutPlan()` */
  static readonly GetAllPlanExerciseWithoutPlanPath = '/plan-exercise/unsaved';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPlanExerciseWithoutPlan()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPlanExerciseWithoutPlan$Response(params?: GetAllPlanExerciseWithoutPlan$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PlanExerciseResponse>>> {
    return getAllPlanExerciseWithoutPlan(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPlanExerciseWithoutPlan$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPlanExerciseWithoutPlan(params?: GetAllPlanExerciseWithoutPlan$Params, context?: HttpContext): Observable<Array<PlanExerciseResponse>> {
    return this.getAllPlanExerciseWithoutPlan$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PlanExerciseResponse>>): Array<PlanExerciseResponse> => r.body)
    );
  }

  /** Path part for operation `deletePlanExercise()` */
  static readonly DeletePlanExercisePath = '/plan-exercise/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePlanExercise()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePlanExercise$Response(params: DeletePlanExercise$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deletePlanExercise(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deletePlanExercise$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePlanExercise(params: DeletePlanExercise$Params, context?: HttpContext): Observable<void> {
    return this.deletePlanExercise$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}