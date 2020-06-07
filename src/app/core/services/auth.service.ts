import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../../shared';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'flikshop-admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  // Creates the headers with the token required by the login service
  private createHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      Token: 'b2e684d7-8807-4232-b5fc-1a6e80c175c0'
    });

    return headers;
  }

  login(username: string, password: string): Observable<object> {
    return this.http.post('Auth/Login', {
      email: username,
      password
    }, {
        headers: this.createHeaders()
      }).pipe(tap(res => {
        const response = res as LoginResponse;
        if (response.hasErrors) {
          throw new Error('Failed response');
        }

        this.setToken(res as LoginResponse);
      }));
  }

  private setToken(res: LoginResponse) {
    this.storage.set('id_token', res.data.accessToken);
    this.storage.set('user_id', res.data.user.id.toString());
    this.storage.set('user_name', res.data.user.userName);
    this.storage.set('role_name', res.data.user.role.toString());
    this.storage.set('expires_at', res.data.expiresIn.toString());
  }

  logout() {
    this.storage.remove('id_token');
    this.storage.remove('user_id');
    this.storage.remove('user_name');
    this.storage.remove('role_name');
    this.storage.remove('expires_at');
  }

  isLoggedIn(): boolean {
    return !!this.storage.get('id_token');
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getDecodedToken(token): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

}
