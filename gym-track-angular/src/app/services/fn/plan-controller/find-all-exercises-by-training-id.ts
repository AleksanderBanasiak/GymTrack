/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PlanExerciseResponse } from '../../models/plan-exercise-response';

export interface FindAllExercisesByTrainingId$Params {
  plan_id: number;
}

export function findAllExercisesByTrainingId(http: HttpClient, rootUrl: string, params: FindAllExercisesByTrainingId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PlanExerciseResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllExercisesByTrainingId.PATH, 'get');
  if (params) {
    rb.path('plan_id', params.plan_id, {});
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

findAllExercisesByTrainingId.PATH = '/plan/{plan_id}';
