/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllUserWeight } from '../fn/weight-controller/get-all-user-weight';
import { GetAllUserWeight$Params } from '../fn/weight-controller/get-all-user-weight';
import { getUserMonths } from '../fn/weight-controller/get-user-months';
import { GetUserMonths$Params } from '../fn/weight-controller/get-user-months';
import { getUserWeightMonthly } from '../fn/weight-controller/get-user-weight-monthly';
import { GetUserWeightMonthly$Params } from '../fn/weight-controller/get-user-weight-monthly';
import { saveWeight } from '../fn/weight-controller/save-weight';
import { SaveWeight$Params } from '../fn/weight-controller/save-weight';
import { WeightResponse } from '../models/weight-response';

@Injectable({ providedIn: 'root' })
export class WeightControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveWeight()` */
  static readonly SaveWeightPath = '/weight';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveWeight()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveWeight$Response(params: SaveWeight$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveWeight(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveWeight$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveWeight(params: SaveWeight$Params, context?: HttpContext): Observable<number> {
    return this.saveWeight$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getUserMonths()` */
  static readonly GetUserMonthsPath = '/weight/months';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserMonths()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserMonths$Response(params?: GetUserMonths$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return getUserMonths(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserMonths$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserMonths(params?: GetUserMonths$Params, context?: HttpContext): Observable<Array<string>> {
    return this.getUserMonths$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

  /** Path part for operation `getUserWeightMonthly()` */
  static readonly GetUserWeightMonthlyPath = '/weight/monthly';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserWeightMonthly()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserWeightMonthly$Response(params: GetUserWeightMonthly$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeightResponse>>> {
    return getUserWeightMonthly(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserWeightMonthly$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserWeightMonthly(params: GetUserWeightMonthly$Params, context?: HttpContext): Observable<Array<WeightResponse>> {
    return this.getUserWeightMonthly$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WeightResponse>>): Array<WeightResponse> => r.body)
    );
  }

  /** Path part for operation `getAllUserWeight()` */
  static readonly GetAllUserWeightPath = '/weight/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUserWeight()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserWeight$Response(params?: GetAllUserWeight$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeightResponse>>> {
    return getAllUserWeight(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUserWeight$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserWeight(params?: GetAllUserWeight$Params, context?: HttpContext): Observable<Array<WeightResponse>> {
    return this.getAllUserWeight$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WeightResponse>>): Array<WeightResponse> => r.body)
    );
  }

}
