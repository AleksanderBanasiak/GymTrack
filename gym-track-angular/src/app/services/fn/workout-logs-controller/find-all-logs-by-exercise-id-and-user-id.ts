/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WorkoutLogsResponse } from '../../models/workout-logs-response';

export interface FindAllLogsByExerciseIdAndUserId$Params {
  id: number;
}

export function findAllLogsByExerciseIdAndUserId(http: HttpClient, rootUrl: string, params: FindAllLogsByExerciseIdAndUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WorkoutLogsResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllLogsByExerciseIdAndUserId.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<WorkoutLogsResponse>>;
    })
  );
}

findAllLogsByExerciseIdAndUserId.PATH = '/workout-logs/exercise/{id}';
