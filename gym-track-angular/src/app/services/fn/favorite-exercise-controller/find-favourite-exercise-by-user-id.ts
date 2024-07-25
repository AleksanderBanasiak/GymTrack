/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FavoriteExerciseResponse } from '../../models/favorite-exercise-response';

export interface FindFavouriteExerciseByUserId$Params {
}

export function findFavouriteExerciseByUserId(http: HttpClient, rootUrl: string, params?: FindFavouriteExerciseByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FavoriteExerciseResponse>>> {
  const rb = new RequestBuilder(rootUrl, findFavouriteExerciseByUserId.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FavoriteExerciseResponse>>;
    })
  );
}

findFavouriteExerciseByUserId.PATH = '/favorite-exercise';
