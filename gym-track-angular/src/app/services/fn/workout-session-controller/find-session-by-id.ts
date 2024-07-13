/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WorkoutSessionResponse } from '../../models/workout-session-response';

export interface FindSessionById$Params {
  id: number;
}

export function findSessionById(http: HttpClient, rootUrl: string, params: FindSessionById$Params, context?: HttpContext): Observable<StrictHttpResponse<WorkoutSessionResponse>> {
  const rb = new RequestBuilder(rootUrl, findSessionById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
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

findSessionById.PATH = '/workout-session/{id}';
