import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'flikshop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  loading = false;

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = fb.group({
      username: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.required]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  public login(e: any) {
    this.loading = true;

    this.authService.login(this.username.value, this.password.value)
      .subscribe((res) => {
        this.loading = false;
        this.router.navigate(['dashboard']);
      },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.form.setErrors({ loginFailed: true });
          } else {
            console.log(error.statusText);
          }

          this.loading = false;
        });
  }
}
