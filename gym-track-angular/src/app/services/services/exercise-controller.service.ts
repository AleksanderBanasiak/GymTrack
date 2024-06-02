/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deletePlanExercise1 } from '../fn/exercise-controller/delete-plan-exercise-1';
import { DeletePlanExercise1$Params } from '../fn/exercise-controller/delete-plan-exercise-1';
import { ExerciseResponse } from '../models/exercise-response';
import { findAllExercisesByType } from '../fn/exercise-controller/find-all-exercises-by-type';
import { FindAllExercisesByType$Params } from '../fn/exercise-controller/find-all-exercises-by-type';
import { findAllUserExercises } from '../fn/exercise-controller/find-all-user-exercises';
import { FindAllUserExercises$Params } from '../fn/exercise-controller/find-all-user-exercises';
import { findAllUserExercisesByType } from '../fn/exercise-controller/find-all-user-exercises-by-type';
import { FindAllUserExercisesByType$Params } from '../fn/exercise-controller/find-all-user-exercises-by-type';
import { findExerciseById } from '../fn/exercise-controller/find-exercise-by-id';
import { FindExerciseById$Params } from '../fn/exercise-controller/find-exercise-by-id';
import { saveExercise } from '../fn/exercise-controller/save-exercise';
import { SaveExercise$Params } from '../fn/exercise-controller/save-exercise';

@Injectable({ providedIn: 'root' })
export class ExerciseControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveExercise()` */
  static readonly SaveExercisePath = '/exercise';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveExercise()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveExercise$Response(params: SaveExercise$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveExercise(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveExercise$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveExercise(params: SaveExercise$Params, context?: HttpContext): Observable<number> {
    return this.saveExercise$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findExerciseById()` */
  static readonly FindExerciseByIdPath = '/exercise/{exercise_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findExerciseById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findExerciseById$Response(params: FindExerciseById$Params, context?: HttpContext): Observable<StrictHttpResponse<ExerciseResponse>> {
    return findExerciseById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findExerciseById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findExerciseById(params: FindExerciseById$Params, context?: HttpContext): Observable<ExerciseResponse> {
    return this.findExerciseById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ExerciseResponse>): ExerciseResponse => r.body)
    );
  }

  /** Path part for operation `findAllExercisesByType()` */
  static readonly FindAllExercisesByTypePath = '/exercise/type/{type}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllExercisesByType()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllExercisesByType$Response(params: FindAllExercisesByType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExerciseResponse>>> {
    return findAllExercisesByType(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllExercisesByType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllExercisesByType(params: FindAllExercisesByType$Params, context?: HttpContext): Observable<Array<ExerciseResponse>> {
    return this.findAllExercisesByType$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ExerciseResponse>>): Array<ExerciseResponse> => r.body)
    );
  }

  /** Path part for operation `findAllUserExercises()` */
  static readonly FindAllUserExercisesPath = '/exercise/my-exercises';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllUserExercises()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUserExercises$Response(params?: FindAllUserExercises$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExerciseResponse>>> {
    return findAllUserExercises(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllUserExercises$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUserExercises(params?: FindAllUserExercises$Params, context?: HttpContext): Observable<Array<ExerciseResponse>> {
    return this.findAllUserExercises$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ExerciseResponse>>): Array<ExerciseResponse> => r.body)
    );
  }

  /** Path part for operation `findAllUserExercisesByType()` */
  static readonly FindAllUserExercisesByTypePath = '/exercise/my-exercises/{type}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllUserExercisesByType()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUserExercisesByType$Response(params: FindAllUserExercisesByType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExerciseResponse>>> {
    return findAllUserExercisesByType(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllUserExercisesByType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUserExercisesByType(params: FindAllUserExercisesByType$Params, context?: HttpContext): Observable<Array<ExerciseResponse>> {
    return this.findAllUserExercisesByType$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ExerciseResponse>>): Array<ExerciseResponse> => r.body)
    );
  }

  /** Path part for operation `deletePlanExercise1()` */
  static readonly DeletePlanExercise1Path = '/exercise/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePlanExercise1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePlanExercise1$Response(params: DeletePlanExercise1$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deletePlanExercise1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deletePlanExercise1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePlanExercise1(params: DeletePlanExercise1$Params, context?: HttpContext): Observable<void> {
    return this.deletePlanExercise1$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
