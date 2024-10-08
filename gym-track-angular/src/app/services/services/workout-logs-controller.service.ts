/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAllLogsByExerciseIdAndUserId } from '../fn/workout-logs-controller/find-all-logs-by-exercise-id-and-user-id';
import { FindAllLogsByExerciseIdAndUserId$Params } from '../fn/workout-logs-controller/find-all-logs-by-exercise-id-and-user-id';
import { findAllLogsByExerciseIdAndUserIdGroupedBySessionId } from '../fn/workout-logs-controller/find-all-logs-by-exercise-id-and-user-id-grouped-by-session-id';
import { FindAllLogsByExerciseIdAndUserIdGroupedBySessionId$Params } from '../fn/workout-logs-controller/find-all-logs-by-exercise-id-and-user-id-grouped-by-session-id';
import { findAllLogsBySessionId } from '../fn/workout-logs-controller/find-all-logs-by-session-id';
import { FindAllLogsBySessionId$Params } from '../fn/workout-logs-controller/find-all-logs-by-session-id';
import { findAllLogsBySessionIdAndPlanExerciseId } from '../fn/workout-logs-controller/find-all-logs-by-session-id-and-plan-exercise-id';
import { FindAllLogsBySessionIdAndPlanExerciseId$Params } from '../fn/workout-logs-controller/find-all-logs-by-session-id-and-plan-exercise-id';
import { findAllLogsMaxByExerciseIdAndUserId } from '../fn/workout-logs-controller/find-all-logs-max-by-exercise-id-and-user-id';
import { FindAllLogsMaxByExerciseIdAndUserId$Params } from '../fn/workout-logs-controller/find-all-logs-max-by-exercise-id-and-user-id';
import { findAllRecordByExerciseId } from '../fn/workout-logs-controller/find-all-record-by-exercise-id';
import { FindAllRecordByExerciseId$Params } from '../fn/workout-logs-controller/find-all-record-by-exercise-id';
import { findLastLogsByExerciseIdAndUserId } from '../fn/workout-logs-controller/find-last-logs-by-exercise-id-and-user-id';
import { FindLastLogsByExerciseIdAndUserId$Params } from '../fn/workout-logs-controller/find-last-logs-by-exercise-id-and-user-id';
import { findSummaryLogs } from '../fn/workout-logs-controller/find-summary-logs';
import { FindSummaryLogs$Params } from '../fn/workout-logs-controller/find-summary-logs';
import { save } from '../fn/workout-logs-controller/save';
import { Save$Params } from '../fn/workout-logs-controller/save';
import { SummaryResponse } from '../models/summary-response';
import { WorkoutLogsResponse } from '../models/workout-logs-response';

@Injectable({ providedIn: 'root' })
export class WorkoutLogsControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `save()` */
  static readonly SavePath = '/workout-logs';

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

  /** Path part for operation `findAllLogsBySessionId()` */
  static readonly FindAllLogsBySessionIdPath = '/workout-logs/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllLogsBySessionId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLogsBySessionId$Response(params: FindAllLogsBySessionId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Array<WorkoutLogsResponse>>>> {
    return findAllLogsBySessionId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllLogsBySessionId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLogsBySessionId(params: FindAllLogsBySessionId$Params, context?: HttpContext): Observable<Array<Array<WorkoutLogsResponse>>> {
    return this.findAllLogsBySessionId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Array<WorkoutLogsResponse>>>): Array<Array<WorkoutLogsResponse>> => r.body)
    );
  }

  /** Path part for operation `findSummaryLogs()` */
  static readonly FindSummaryLogsPath = '/workout-logs/summary';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findSummaryLogs()` instead.
   *
   * This method doesn't expect any request body.
   */
  findSummaryLogs$Response(params?: FindSummaryLogs$Params, context?: HttpContext): Observable<StrictHttpResponse<SummaryResponse>> {
    return findSummaryLogs(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findSummaryLogs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findSummaryLogs(params?: FindSummaryLogs$Params, context?: HttpContext): Observable<SummaryResponse> {
    return this.findSummaryLogs$Response(params, context).pipe(
      map((r: StrictHttpResponse<SummaryResponse>): SummaryResponse => r.body)
    );
  }

  /** Path part for operation `findAllRecordByExerciseId()` */
  static readonly FindAllRecordByExerciseIdPath = '/workout-logs/records/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllRecordByExerciseId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRecordByExerciseId$Response(params: FindAllRecordByExerciseId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WorkoutLogsResponse>>> {
    return findAllRecordByExerciseId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllRecordByExerciseId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRecordByExerciseId(params: FindAllRecordByExerciseId$Params, context?: HttpContext): Observable<Array<WorkoutLogsResponse>> {
    return this.findAllRecordByExerciseId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WorkoutLogsResponse>>): Array<WorkoutLogsResponse> => r.body)
    );
  }

  /** Path part for operation `findAllLogsBySessionIdAndPlanExerciseId()` */
  static readonly FindAllLogsBySessionIdAndPlanExerciseIdPath = '/workout-logs/plan-exercise/{plan-exercise-id}/session/{session-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllLogsBySessionIdAndPlanExerciseId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLogsBySessionIdAndPlanExerciseId$Response(params: FindAllLogsBySessionIdAndPlanExerciseId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WorkoutLogsResponse>>> {
    return findAllLogsBySessionIdAndPlanExerciseId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllLogsBySessionIdAndPlanExerciseId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLogsBySessionIdAndPlanExerciseId(params: FindAllLogsBySessionIdAndPlanExerciseId$Params, context?: HttpContext): Observable<Array<WorkoutLogsResponse>> {
    return this.findAllLogsBySessionIdAndPlanExerciseId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WorkoutLogsResponse>>): Array<WorkoutLogsResponse> => r.body)
    );
  }

  /** Path part for operation `findLastLogsByExerciseIdAndUserId()` */
  static readonly FindLastLogsByExerciseIdAndUserIdPath = '/workout-logs/last/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findLastLogsByExerciseIdAndUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLastLogsByExerciseIdAndUserId$Response(params: FindLastLogsByExerciseIdAndUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WorkoutLogsResponse>>> {
    return findLastLogsByExerciseIdAndUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findLastLogsByExerciseIdAndUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLastLogsByExerciseIdAndUserId(params: FindLastLogsByExerciseIdAndUserId$Params, context?: HttpContext): Observable<Array<WorkoutLogsResponse>> {
    return this.findLastLogsByExerciseIdAndUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WorkoutLogsResponse>>): Array<WorkoutLogsResponse> => r.body)
    );
  }

  /** Path part for operation `findAllLogsByExerciseIdAndUserId()` */
  static readonly FindAllLogsByExerciseIdAndUserIdPath = '/workout-logs/exercise/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllLogsByExerciseIdAndUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLogsByExerciseIdAndUserId$Response(params: FindAllLogsByExerciseIdAndUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WorkoutLogsResponse>>> {
    return findAllLogsByExerciseIdAndUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllLogsByExerciseIdAndUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLogsByExerciseIdAndUserId(params: FindAllLogsByExerciseIdAndUserId$Params, context?: HttpContext): Observable<Array<WorkoutLogsResponse>> {
    return this.findAllLogsByExerciseIdAndUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WorkoutLogsResponse>>): Array<WorkoutLogsResponse> => r.body)
    );
  }

  /** Path part for operation `findAllLogsByExerciseIdAndUserIdGroupedBySessionId()` */
  static readonly FindAllLogsByExerciseIdAndUserIdGroupedBySessionIdPath = '/workout-logs/exercise/{exercise-id}/session/{session-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllLogsByExerciseIdAndUserIdGroupedBySessionId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLogsByExerciseIdAndUserIdGroupedBySessionId$Response(params: FindAllLogsByExerciseIdAndUserIdGroupedBySessionId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Array<WorkoutLogsResponse>>>> {
    return findAllLogsByExerciseIdAndUserIdGroupedBySessionId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllLogsByExerciseIdAndUserIdGroupedBySessionId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLogsByExerciseIdAndUserIdGroupedBySessionId(params: FindAllLogsByExerciseIdAndUserIdGroupedBySessionId$Params, context?: HttpContext): Observable<Array<Array<WorkoutLogsResponse>>> {
    return this.findAllLogsByExerciseIdAndUserIdGroupedBySessionId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Array<WorkoutLogsResponse>>>): Array<Array<WorkoutLogsResponse>> => r.body)
    );
  }

  /** Path part for operation `findAllLogsMaxByExerciseIdAndUserId()` */
  static readonly FindAllLogsMaxByExerciseIdAndUserIdPath = '/workout-logs/exercise/max/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllLogsMaxByExerciseIdAndUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLogsMaxByExerciseIdAndUserId$Response(params: FindAllLogsMaxByExerciseIdAndUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WorkoutLogsResponse>>> {
    return findAllLogsMaxByExerciseIdAndUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllLogsMaxByExerciseIdAndUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLogsMaxByExerciseIdAndUserId(params: FindAllLogsMaxByExerciseIdAndUserId$Params, context?: HttpContext): Observable<Array<WorkoutLogsResponse>> {
    return this.findAllLogsMaxByExerciseIdAndUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WorkoutLogsResponse>>): Array<WorkoutLogsResponse> => r.body)
    );
  }

}
