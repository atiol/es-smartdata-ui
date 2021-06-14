import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { catchError, debounce } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IGenericModel } from '../models/generic.model';
import { IMarketDetails } from '../models/market.model';
import { IMgmtDetails } from '../models/mgmt.model';
import { IPagedRequest } from '../models/paged-request.model';
import { IPagedResponse } from '../models/paged-response.model';
import { IPropertyDetails } from '../models/property.model';

@Injectable()
export class SearchService {
  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  get(requestData: IPagedRequest): Observable<IPagedResponse<IGenericModel>> {
    return this._http.get<IPagedResponse<IGenericModel>>(`${this.baseUrl}/api/v1/search`, {
      params: this.createQueryParams(requestData.query, requestData?.market, requestData?.pageIndex, requestData?.pageSize)
    }).pipe(debounce(() => interval(200)));
  }

  getProperties(queryString: string, market: string): Observable<IPropertyDetails[]> {
    return this._http.get<IPropertyDetails[]>(`${this.baseUrl}/api/v1/search/properties`, {
      params: this.createQueryParams(queryString, market)
    }).pipe(debounce(() => interval(500)));
  }

  getMgmt(pageIndex: number, pageSize: number): Observable<IMgmtDetails[]> {
    return this._http.get<IMgmtDetails[]>(`${this.baseUrl}/api/v1/search/mgmts`, {params: {
      pageIndex: pageIndex.toString(),
      pageSize: pageSize.toString()
    }}).pipe(debounce(() => interval(500)));
  }

  getMarkets(): Observable<IMarketDetails[]> {
    return this._http.get<IMgmtDetails[]>(`${this.baseUrl}/api/v1/search/markets`);
  }

  private createQueryParams(query: string, market?: string, pageIndex?: number, pageSize?: number): {[key: string]: string} {
    let obj = {};
    if (query) obj['query'] = query;
    if (market) obj['market'] = market;
    if (pageIndex) obj['pageIndex'] = pageIndex;
    if (pageSize) obj['pageSize'] = pageSize;
    return obj;
  }
}
