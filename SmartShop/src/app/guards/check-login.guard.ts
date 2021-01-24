import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService} from '../auth/services/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private authService:AuthService){

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree>  | boolean | UrlTree{
    return this.authService.hasUser().pipe(
      map(user => user === null ? false : true)
    );
    }
  }
  
