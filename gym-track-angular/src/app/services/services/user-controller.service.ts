/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getUserName } from '../fn/user-controller/get-user-name';
import { GetUserName$Params } from '../fn/user-controller/get-user-name';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getUserName()` */
  static readonly GetUserNamePath = '/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserName$Response(params?: GetUserName$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    console.log('Sending request to /user endpoint'); // Log przed wysłaniem żądania
    return getUserName(this.http, this.rootUrl, params, context);
  }

  getUserName(params?: GetUserName$Params, context?: HttpContext): Observable<string> {
    return this.getUserName$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => {
        console.log('Received response from /user endpoint', r); // Log po otrzymaniu odpowiedzi
        return r.body;
      })
    );
  }
}
