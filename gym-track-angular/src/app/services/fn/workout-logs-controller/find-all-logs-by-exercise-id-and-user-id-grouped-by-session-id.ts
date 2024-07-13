/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WorkoutLogsResponse } from '../../models/workout-logs-response';

export interface FindAllLogsByExerciseIdAndUserIdGroupedBySessionId$Params {
  'exercise-id': number;
  'session-id': number;
}

export function findAllLogsByExerciseIdAndUserIdGroupedBySessionId(http: HttpClient, rootUrl: string, params: FindAllLogsByExerciseIdAndUserIdGroupedBySessionId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Array<WorkoutLogsResponse>>>> {
  const rb = new RequestBuilder(rootUrl, findAllLogsByExerciseIdAndUserIdGroupedBySessionId.PATH, 'get');
  if (params) {
    rb.path('exercise-id', params['exercise-id'], {});
    rb.path('session-id', params['session-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Array<WorkoutLogsResponse>>>;
    })
  );
}

findAllLogsByExerciseIdAndUserIdGroupedBySessionId.PATH = '/workout-logs/exercise/{exercise-id}/session/{session-id}';
