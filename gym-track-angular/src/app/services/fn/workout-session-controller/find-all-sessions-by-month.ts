/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WorkoutSessionResponse } from '../../models/workout-session-response';

export interface FindAllSessionsByMonth$Params {
  'month-id': number;
  'year-id': number;
}

export function findAllSessionsByMonth(http: HttpClient, rootUrl: string, params: FindAllSessionsByMonth$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WorkoutSessionResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllSessionsByMonth.PATH, 'get');
  if (params) {
    rb.path('month-id', params['month-id'], {});
    rb.path('year-id', params['year-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<WorkoutSessionResponse>>;
    })
  );
}

findAllSessionsByMonth.PATH = '/workout-session/{month-id}/{year-id}';
