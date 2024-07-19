/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteWorkoutSession } from '../fn/workout-session-controller/delete-workout-session';
import { DeleteWorkoutSession$Params } from '../fn/workout-session-controller/delete-workout-session';
import { endSession } from '../fn/workout-session-controller/end-session';
import { EndSession$Params } from '../fn/workout-session-controller/end-session';
import { findAllSessions } from '../fn/workout-session-controller/find-all-sessions';
import { FindAllSessions$Params } from '../fn/workout-session-controller/find-all-sessions';
import { findLastUnsavedWorkoutSessionByUserId } from '../fn/workout-session-controller/find-last-unsaved-workout-session-by-user-id';
import { FindLastUnsavedWorkoutSessionByUserId$Params } from '../fn/workout-session-controller/find-last-unsaved-workout-session-by-user-id';
import { findSessionById } from '../fn/workout-session-controller/find-session-by-id';
import { FindSessionById$Params } from '../fn/workout-session-controller/find-session-by-id';
import { saveWorkoutSession } from '../fn/workout-session-controller/save-workout-session';
import { SaveWorkoutSession$Params } from '../fn/workout-session-controller/save-workout-session';
import { WorkoutSessionResponse } from '../models/workout-session-response';

@Injectable({ providedIn: 'root' })
export class WorkoutSessionControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllSessions()` */
  static readonly FindAllSessionsPath = '/workout-session';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllSessions()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSessions$Response(params?: FindAllSessions$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WorkoutSessionResponse>>> {
    return findAllSessions(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllSessions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSessions(params?: FindAllSessions$Params, context?: HttpContext): Observable<Array<WorkoutSessionResponse>> {
    return this.findAllSessions$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WorkoutSessionResponse>>): Array<WorkoutSessionResponse> => r.body)
    );
  }

  /** Path part for operation `saveWorkoutSession()` */
  static readonly SaveWorkoutSessionPath = '/workout-session';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveWorkoutSession()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveWorkoutSession$Response(params: SaveWorkoutSession$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveWorkoutSession(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveWorkoutSession$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveWorkoutSession(params: SaveWorkoutSession$Params, context?: HttpContext): Observable<number> {
    return this.saveWorkoutSession$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findSessionById()` */
  static readonly FindSessionByIdPath = '/workout-session/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findSessionById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findSessionById$Response(params: FindSessionById$Params, context?: HttpContext): Observable<StrictHttpResponse<WorkoutSessionResponse>> {
    return findSessionById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findSessionById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findSessionById(params: FindSessionById$Params, context?: HttpContext): Observable<WorkoutSessionResponse> {
    return this.findSessionById$Response(params, context).pipe(
      map((r: StrictHttpResponse<WorkoutSessionResponse>): WorkoutSessionResponse => r.body)
    );
  }

  /** Path part for operation `deleteWorkoutSession()` */
  static readonly DeleteWorkoutSessionPath = '/workout-session/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteWorkoutSession()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteWorkoutSession$Response(params: DeleteWorkoutSession$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteWorkoutSession(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteWorkoutSession$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteWorkoutSession(params: DeleteWorkoutSession$Params, context?: HttpContext): Observable<void> {
    return this.deleteWorkoutSession$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `endSession()` */
  static readonly EndSessionPath = '/workout-session/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `endSession()` instead.
   *
   * This method doesn't expect any request body.
   */
  endSession$Response(params: EndSession$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return endSession(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `endSession$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  endSession(params: EndSession$Params, context?: HttpContext): Observable<number> {
    return this.endSession$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findLastUnsavedWorkoutSessionByUserId()` */
  static readonly FindLastUnsavedWorkoutSessionByUserIdPath = '/workout-session/unsaved';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findLastUnsavedWorkoutSessionByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLastUnsavedWorkoutSessionByUserId$Response(params?: FindLastUnsavedWorkoutSessionByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<WorkoutSessionResponse>> {
    return findLastUnsavedWorkoutSessionByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findLastUnsavedWorkoutSessionByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLastUnsavedWorkoutSessionByUserId(params?: FindLastUnsavedWorkoutSessionByUserId$Params, context?: HttpContext): Observable<WorkoutSessionResponse> {
    return this.findLastUnsavedWorkoutSessionByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<WorkoutSessionResponse>): WorkoutSessionResponse => r.body)
    );
  }

}
