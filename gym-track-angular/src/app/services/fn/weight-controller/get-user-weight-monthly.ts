/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WeightResponse } from '../../models/weight-response';

export interface GetUserWeightMonthly$Params {
  year: number;
  month: number;
}

export function getUserWeightMonthly(http: HttpClient, rootUrl: string, params: GetUserWeightMonthly$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeightResponse>>> {
  const rb = new RequestBuilder(rootUrl, getUserWeightMonthly.PATH, 'get');
  if (params) {
    rb.query('year', params.year, {});
    rb.query('month', params.month, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<WeightResponse>>;
    })
  );
}

getUserWeightMonthly.PATH = '/weight/monthly';
