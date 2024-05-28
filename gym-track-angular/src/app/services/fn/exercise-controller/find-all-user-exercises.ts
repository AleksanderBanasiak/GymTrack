/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExerciseResponse } from '../../models/exercise-response';

export interface FindAllUserExercises$Params {
}

export function findAllUserExercises(http: HttpClient, rootUrl: string, params?: FindAllUserExercises$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExerciseResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllUserExercises.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ExerciseResponse>>;
    })
  );
}

findAllUserExercises.PATH = '/exercise/my-exercises';
