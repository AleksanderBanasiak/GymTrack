/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WorkoutSessionResponse } from '../../models/workout-session-response';

export interface FindAllSessions$Params {
}

export function findAllSessions(http: HttpClient, rootUrl: string, params?: FindAllSessions$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WorkoutSessionResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllSessions.PATH, 'get');
  if (params) {
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

findAllSessions.PATH = '/workout-session';
