/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PlanExerciseResponse } from '../../models/plan-exercise-response';

export interface FindAllPlanExercisesByPlanId$Params {
  'plan-id': number;
}

export function findAllPlanExercisesByPlanId(http: HttpClient, rootUrl: string, params: FindAllPlanExercisesByPlanId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PlanExerciseResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllPlanExercisesByPlanId.PATH, 'get');
  if (params) {
    rb.path('plan-id', params['plan-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<PlanExerciseResponse>>;
    })
  );
}

findAllPlanExercisesByPlanId.PATH = '/plan-exercise/{plan-id}';
