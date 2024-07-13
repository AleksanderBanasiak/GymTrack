/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NotesResponse } from '../../models/notes-response';

export interface FindAllNotes$Params {
}

export function findAllNotes(http: HttpClient, rootUrl: string, params?: FindAllNotes$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NotesResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllNotes.PATH, 'get');
  if (params) {
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

findAllNotes.PATH = '/notes';
