import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService, NotificationService } from '../services';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';

enum HTTP_STATUS {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403
}

@Injectable()
export class FlikshopHttpInterceptor implements HttpInterceptor {

  legacyRoutes = ['Auth'];

  constructor(
    private authService: AuthService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private router: Router,
    private notification: NotificationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let baseUrl;

    if (this.legacyRoutes.find(route => req.url.startsWith(route))) {
      baseUrl = environment.baseLegacyUrl;
    } else {
      baseUrl = environment.baseModernUrl;
    }

    req = req.clone({
      url: `${baseUrl}/${req.url}`
    });

    const token = this.storage.get('id_token');
    if (token) {
      req = req.clone({
        headers: req.headers.set('authorization', `Bearer ${token}`)
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HTTP_STATUS.SUCCESS) {
          const body = error.error.text || '';
          const resp = new HttpResponse({
            body
          });
          return of(resp);
        } else {
          if (error.status === HTTP_STATUS.UNAUTHORIZED || error.status === HTTP_STATUS.FORBIDDEN) {
            this.authService.logout();
            this.router.navigate(['login']);
          }
          this.notification.showError(error.statusText);
          return throwError(error);
        }
      })
    );
  }
}
