import { environment } from '../../../environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { AuthService } from './auth.service';

// fake web storage for deps
const mockWebStorageService = {};

describe('AuthService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      AuthService
    ]
  }));

  it('should be created', inject([AuthService], (authService: AuthService) => {
    expect(authService).toBeTruthy();
  }));

  it('should successfully log in with proper credentials',
    fakeAsync(
      inject([AuthService, HttpTestingController],
        (authService: AuthService, httpMock: HttpTestingController) => {
          const expected = { token: btoa('flikshop') };

          // Act
          authService.login('admin@flikshop.com', 'administrator').subscribe(
            (res: any) => {
              expect(res).toEqual(expected);
            },
            (error: any) => { }
          );

          const req = httpMock.expectOne({ url: `${environment.baseLegacyUrl}/Auth/Login`, method: 'POST' });
          expect(req.request.method).toEqual('POST');
          req.flush(expected);
          httpMock.verify();
        })
    )
  );

  it('should fail login with invalid credentials',
    fakeAsync(
      inject([AuthService, HttpTestingController],
        (authService: AuthService, httpMock: HttpTestingController) => {

          // Act
          authService.login('badUser@gmail.com', 'badPassword').subscribe(
            (res: any) => { },
            (error: any) => {
              expect(error.status).toBe(301);
            }
          );

          const req = httpMock.expectOne({ url: `${environment.baseLegacyUrl}/Auth/Login` });
          req.error(
            new ErrorEvent(''), {
              status: 301
            });
          httpMock.verify();
        })
    )
  );
});
