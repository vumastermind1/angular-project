import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared';

const routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ]
})

export class LoginModule { }
