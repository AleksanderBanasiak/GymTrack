/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PlanResponse } from '../../models/plan-response';

export interface FindAllUserPlans$Params {
}

export function findAllUserPlans(http: HttpClient, rootUrl: string, params?: FindAllUserPlans$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PlanResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllUserPlans.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<PlanResponse>>;
    })
  );
}

findAllUserPlans.PATH = '/plan/all';
