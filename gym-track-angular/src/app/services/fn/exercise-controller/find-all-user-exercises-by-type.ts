/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExerciseResponse } from '../../models/exercise-response';

export interface FindAllUserExercisesByType$Params {
  type: 'CHEST' | 'BACK' | 'BICEPS' | 'SHOULDERS' | 'TRICEPS' | 'FOREARM' | 'ABS' | 'GLUTES' | 'CALF' | 'THIGH' | 'HAMSTRINGS';
}

export function findAllUserExercisesByType(http: HttpClient, rootUrl: string, params: FindAllUserExercisesByType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExerciseResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllUserExercisesByType.PATH, 'get');
  if (params) {
    rb.path('type', params.type, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ExerciseResponse>>;
    })
  );
}

findAllUserExercisesByType.PATH = '/exercise/my-exercises/{type}';
