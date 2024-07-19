/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WorkoutLogsResponse } from '../../models/workout-logs-response';

export interface FindAllLogsBySessionIdAndPlanExerciseId$Params {
  'plan-exercise-id': number;
  'session-id': number;
}

export function findAllLogsBySessionIdAndPlanExerciseId(http: HttpClient, rootUrl: string, params: FindAllLogsBySessionIdAndPlanExerciseId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WorkoutLogsResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllLogsBySessionIdAndPlanExerciseId.PATH, 'get');
  if (params) {
    rb.path('plan-exercise-id', params['plan-exercise-id'], {});
    rb.path('session-id', params['session-id'], {});
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

findAllLogsBySessionIdAndPlanExerciseId.PATH = '/workout-logs/plan-exercise/{plan-exercise-id}/session/{session-id}';
