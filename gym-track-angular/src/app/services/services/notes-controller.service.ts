/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteNotes } from '../fn/notes-controller/delete-notes';
import { DeleteNotes$Params } from '../fn/notes-controller/delete-notes';
import { findAllNotes } from '../fn/notes-controller/find-all-notes';
import { FindAllNotes$Params } from '../fn/notes-controller/find-all-notes';
import { NotesResponse } from '../models/notes-response';
import { saveNotes } from '../fn/notes-controller/save-notes';
import { SaveNotes$Params } from '../fn/notes-controller/save-notes';

@Injectable({ providedIn: 'root' })
export class NotesControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllNotes()` */
  static readonly FindAllNotesPath = '/notes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllNotes()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllNotes$Response(params?: FindAllNotes$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NotesResponse>>> {
    return findAllNotes(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllNotes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllNotes(params?: FindAllNotes$Params, context?: HttpContext): Observable<Array<NotesResponse>> {
    return this.findAllNotes$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<NotesResponse>>): Array<NotesResponse> => r.body)
    );
  }

  /** Path part for operation `saveNotes()` */
  static readonly SaveNotesPath = '/notes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveNotes()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveNotes$Response(params: SaveNotes$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveNotes(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveNotes$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveNotes(params: SaveNotes$Params, context?: HttpContext): Observable<number> {
    return this.saveNotes$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteNotes()` */
  static readonly DeleteNotesPath = '/notes/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteNotes()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteNotes$Response(params: DeleteNotes$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteNotes(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteNotes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteNotes(params: DeleteNotes$Params, context?: HttpContext): Observable<void> {
    return this.deleteNotes$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
