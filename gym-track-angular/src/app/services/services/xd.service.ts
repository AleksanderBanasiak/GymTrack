/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { xd } from '../fn/xd/xd';
import { Xd$Params } from '../fn/xd/xd';

@Injectable({ providedIn: 'root' })
export class XdService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `xd()` */
  static readonly XdPath = '/xd';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `xd()` instead.
   *
   * This method doesn't expect any request body.
   */
  xd$Response(params?: Xd$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return xd(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `xd$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  xd(params?: Xd$Params, context?: HttpContext): Observable<string> {
    return this.xd$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
