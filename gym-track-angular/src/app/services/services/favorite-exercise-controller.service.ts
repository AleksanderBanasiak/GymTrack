/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteFavoriteExercise } from '../fn/favorite-exercise-controller/delete-favorite-exercise';
import { DeleteFavoriteExercise$Params } from '../fn/favorite-exercise-controller/delete-favorite-exercise';
import { FavoriteExerciseResponse } from '../models/favorite-exercise-response';
import { findFavouriteExerciseByUserId } from '../fn/favorite-exercise-controller/find-favourite-exercise-by-user-id';
import { FindFavouriteExerciseByUserId$Params } from '../fn/favorite-exercise-controller/find-favourite-exercise-by-user-id';
import { save2 } from '../fn/favorite-exercise-controller/save-2';
import { Save2$Params } from '../fn/favorite-exercise-controller/save-2';

@Injectable({ providedIn: 'root' })
export class FavoriteExerciseControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findFavouriteExerciseByUserId()` */
  static readonly FindFavouriteExerciseByUserIdPath = '/favorite-exercise';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFavouriteExerciseByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFavouriteExerciseByUserId$Response(params?: FindFavouriteExerciseByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FavoriteExerciseResponse>>> {
    return findFavouriteExerciseByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findFavouriteExerciseByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFavouriteExerciseByUserId(params?: FindFavouriteExerciseByUserId$Params, context?: HttpContext): Observable<Array<FavoriteExerciseResponse>> {
    return this.findFavouriteExerciseByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FavoriteExerciseResponse>>): Array<FavoriteExerciseResponse> => r.body)
    );
  }

  /** Path part for operation `save2()` */
  static readonly Save2Path = '/favorite-exercise';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save2$Response(params: Save2$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return save2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save2(params: Save2$Params, context?: HttpContext): Observable<number> {
    return this.save2$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteFavoriteExercise()` */
  static readonly DeleteFavoriteExercisePath = '/favorite-exercise/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFavoriteExercise()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFavoriteExercise$Response(params: DeleteFavoriteExercise$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteFavoriteExercise(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteFavoriteExercise$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFavoriteExercise(params: DeleteFavoriteExercise$Params, context?: HttpContext): Observable<void> {
    return this.deleteFavoriteExercise$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
