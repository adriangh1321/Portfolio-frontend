import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ParamMap, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from '../models/Profile';
import { PortfolioService } from '../services/portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverService {

  constructor(private portfolioService: PortfolioService, private router: Router,) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,

  ): Observable<Profile[]> {
    let params: ParamMap = route.queryParamMap
   
    return this.portfolioService.getProfiles(params)
  }
}
