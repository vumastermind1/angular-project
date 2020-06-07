import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AuthGuardService as AuthGuard,
  UnauthGuardService as UnauthGuard,
  AdminLayoutComponent
} from './core';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./core/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ],
    canActivate: [AuthGuard]
  }, {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule),
    canActivate: [UnauthGuard]
  }, {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash:true , enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
