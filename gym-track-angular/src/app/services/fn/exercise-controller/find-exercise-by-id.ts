/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExerciseResponse } from '../../models/exercise-response';

export interface FindExerciseById$Params {
  exercise_id: number;
}

export function findExerciseById(http: HttpClient, rootUrl: string, params: FindExerciseById$Params, context?: HttpContext): Observable<StrictHttpResponse<ExerciseResponse>> {
  const rb = new RequestBuilder(rootUrl, findExerciseById.PATH, 'get');
  if (params) {
    rb.path('exercise_id', params.exercise_id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ExerciseResponse>;
    })
  );
}

findExerciseById.PATH = '/exercise/{exercise_id}';