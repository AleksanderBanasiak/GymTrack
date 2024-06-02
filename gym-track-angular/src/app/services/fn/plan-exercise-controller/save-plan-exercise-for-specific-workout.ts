/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PlanExerciseRequest } from '../../models/plan-exercise-request';

export interface SavePlanExerciseForSpecificWorkout$Params {
  id: number;
      body: PlanExerciseRequest
}

export function savePlanExerciseForSpecificWorkout(http: HttpClient, rootUrl: string, params: SavePlanExerciseForSpecificWorkout$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, savePlanExerciseForSpecificWorkout.PATH, 'post');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

savePlanExerciseForSpecificWorkout.PATH = '/plan-exercise/workout/{id}';
