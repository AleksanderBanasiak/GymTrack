/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAllExercisesByTrainingId } from '../fn/plan-controller/find-all-exercises-by-training-id';
import { FindAllExercisesByTrainingId$Params } from '../fn/plan-controller/find-all-exercises-by-training-id';
import { findAllUserPlans } from '../fn/plan-controller/find-all-user-plans';
import { FindAllUserPlans$Params } from '../fn/plan-controller/find-all-user-plans';
import { findPlanById } from '../fn/plan-controller/find-plan-by-id';
import { FindPlanById$Params } from '../fn/plan-controller/find-plan-by-id';
import { PlanExerciseResponse } from '../models/plan-exercise-response';
import { PlanResponse } from '../models/plan-response';
import { save } from '../fn/plan-controller/save';
import { Save$Params } from '../fn/plan-controller/save';

@Injectable({ providedIn: 'root' })
export class PlanControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `save()` */
  static readonly SavePath = '/plan';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save$Response(params: Save$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return save(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save(params: Save$Params, context?: HttpContext): Observable<number> {
    return this.save$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findPlanById()` */
  static readonly FindPlanByIdPath = '/plan/{plan_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPlanById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPlanById$Response(params: FindPlanById$Params, context?: HttpContext): Observable<StrictHttpResponse<PlanResponse>> {
    return findPlanById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findPlanById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPlanById(params: FindPlanById$Params, context?: HttpContext): Observable<PlanResponse> {
    return this.findPlanById$Response(params, context).pipe(
      map((r: StrictHttpResponse<PlanResponse>): PlanResponse => r.body)
    );
  }

  /** Path part for operation `findAllExercisesByTrainingId()` */
  static readonly FindAllExercisesByTrainingIdPath = '/plan/{plan_id}/exercises';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllExercisesByTrainingId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllExercisesByTrainingId$Response(params: FindAllExercisesByTrainingId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PlanExerciseResponse>>> {
    return findAllExercisesByTrainingId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllExercisesByTrainingId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllExercisesByTrainingId(params: FindAllExercisesByTrainingId$Params, context?: HttpContext): Observable<Array<PlanExerciseResponse>> {
    return this.findAllExercisesByTrainingId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PlanExerciseResponse>>): Array<PlanExerciseResponse> => r.body)
    );
  }

  /** Path part for operation `findAllUserPlans()` */
  static readonly FindAllUserPlansPath = '/plan/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllUserPlans()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUserPlans$Response(params?: FindAllUserPlans$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PlanResponse>>> {
    return findAllUserPlans(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllUserPlans$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUserPlans(params?: FindAllUserPlans$Params, context?: HttpContext): Observable<Array<PlanResponse>> {
    return this.findAllUserPlans$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PlanResponse>>): Array<PlanResponse> => r.body)
    );
  }

}
