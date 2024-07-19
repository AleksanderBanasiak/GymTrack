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
import { ExerciseResponse } from '../models/exercise-response';
import { findAllPlanExercisesByPlanId } from '../fn/plan-exercise-controller/find-all-plan-exercises-by-plan-id';
import { FindAllPlanExercisesByPlanId$Params } from '../fn/plan-exercise-controller/find-all-plan-exercises-by-plan-id';
import { findAllUserUsedExercises } from '../fn/plan-exercise-controller/find-all-user-used-exercises';
import { FindAllUserUsedExercises$Params } from '../fn/plan-exercise-controller/find-all-user-used-exercises';
import { getAllPlanExerciseWithoutPlan } from '../fn/plan-exercise-controller/get-all-plan-exercise-without-plan';
import { GetAllPlanExerciseWithoutPlan$Params } from '../fn/plan-exercise-controller/get-all-plan-exercise-without-plan';
import { PlanExerciseResponse } from '../models/plan-exercise-response';
import { savePlanExercise } from '../fn/plan-exercise-controller/save-plan-exercise';
import { SavePlanExercise$Params } from '../fn/plan-exercise-controller/save-plan-exercise';
import { savePlanExerciseForSpecificWorkout } from '../fn/plan-exercise-controller/save-plan-exercise-for-specific-workout';
import { SavePlanExerciseForSpecificWorkout$Params } from '../fn/plan-exercise-controller/save-plan-exercise-for-specific-workout';

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

  /** Path part for operation `savePlanExerciseForSpecificWorkout()` */
  static readonly SavePlanExerciseForSpecificWorkoutPath = '/plan-exercise/workout/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `savePlanExerciseForSpecificWorkout()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePlanExerciseForSpecificWorkout$Response(params: SavePlanExerciseForSpecificWorkout$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return savePlanExerciseForSpecificWorkout(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `savePlanExerciseForSpecificWorkout$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePlanExerciseForSpecificWorkout(params: SavePlanExerciseForSpecificWorkout$Params, context?: HttpContext): Observable<number> {
    return this.savePlanExerciseForSpecificWorkout$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findAllPlanExercisesByPlanId()` */
  static readonly FindAllPlanExercisesByPlanIdPath = '/plan-exercise/{plan-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPlanExercisesByPlanId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPlanExercisesByPlanId$Response(params: FindAllPlanExercisesByPlanId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PlanExerciseResponse>>> {
    return findAllPlanExercisesByPlanId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllPlanExercisesByPlanId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPlanExercisesByPlanId(params: FindAllPlanExercisesByPlanId$Params, context?: HttpContext): Observable<Array<PlanExerciseResponse>> {
    return this.findAllPlanExercisesByPlanId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PlanExerciseResponse>>): Array<PlanExerciseResponse> => r.body)
    );
  }

  /** Path part for operation `findAllUserUsedExercises()` */
  static readonly FindAllUserUsedExercisesPath = '/plan-exercise/used-exercises';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllUserUsedExercises()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUserUsedExercises$Response(params?: FindAllUserUsedExercises$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExerciseResponse>>> {
    return findAllUserUsedExercises(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllUserUsedExercises$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUserUsedExercises(params?: FindAllUserUsedExercises$Params, context?: HttpContext): Observable<Array<ExerciseResponse>> {
    return this.findAllUserUsedExercises$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ExerciseResponse>>): Array<ExerciseResponse> => r.body)
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
