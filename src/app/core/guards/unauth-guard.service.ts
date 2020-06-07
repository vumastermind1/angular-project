import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuardService {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['dashboard']);
      return false;
    }

    return true;
  }
}
