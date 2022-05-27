import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { CurrentCompany } from '../models/CurrentCompany';

@Injectable({
  providedIn: 'root'
})
export class CurrentCompanyService {

  private apiUrl: string = "http://localhost:8080/v1/currentCompanies"

  private _currentCompanyRefreshRequired = new Subject<number>()

  get CurrentCompanyRefreshRequired() {
    return this._currentCompanyRefreshRequired;
  }

  constructor(private http: HttpClient) { }

  getById(id:number):Observable<CurrentCompany>{
    const url = `${this.apiUrl}/${id}`
    return this.http.get<CurrentCompany>(url);
  }

  // getCurrentCompanyByPortfolioId(idPortfolio: number): Observable<CurrentCompany> {
  //   let params = new HttpParams().set('portfolioId', idPortfolio)
  //   return this.http.get<CurrentCompany>(this.apiUrl, { params: params })
  // }

  updateCurrentCompany(id: number, currentCompany: CurrentCompany): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<void>(url, currentCompany).pipe(
      tap(() => {
        this.CurrentCompanyRefreshRequired.next(id)
      })
    );
  }
}
