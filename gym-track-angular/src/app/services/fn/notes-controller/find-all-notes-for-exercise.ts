/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NotesResponse } from '../../models/notes-response';

export interface FindAllNotesForExercise$Params {
  id: number;
}

export function findAllNotesForExercise(http: HttpClient, rootUrl: string, params: FindAllNotesForExercise$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NotesResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllNotesForExercise.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<NotesResponse>>;
    })
  );
}

findAllNotesForExercise.PATH = '/notes/{id}';
