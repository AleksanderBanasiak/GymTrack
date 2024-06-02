/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PlanResponse } from '../../models/plan-response';

export interface FindPlanById$Params {
  plan_id: number;
}

export function findPlanById(http: HttpClient, rootUrl: string, params: FindPlanById$Params, context?: HttpContext): Observable<StrictHttpResponse<PlanResponse>> {
  const rb = new RequestBuilder(rootUrl, findPlanById.PATH, 'get');
  if (params) {
    rb.path('plan_id', params.plan_id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PlanResponse>;
    })
  );
}

findPlanById.PATH = '/plan/{plan_id}';
