/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WorkoutSessionResponse } from '../../models/workout-session-response';

export interface FindLastSession$Params {
}

export function findLastSession(http: HttpClient, rootUrl: string, params?: FindLastSession$Params, context?: HttpContext): Observable<StrictHttpResponse<WorkoutSessionResponse>> {
  const rb = new RequestBuilder(rootUrl, findLastSession.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<WorkoutSessionResponse>;
    })
  );
}

findLastSession.PATH = '/workout-session/last';
