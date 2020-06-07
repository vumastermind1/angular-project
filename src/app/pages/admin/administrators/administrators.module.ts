import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdministratorsComponent } from './administrators.component';

const routes = [
  { path: '', component: AdministratorsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    AdministratorsComponent
  ]
})

export class AdministratorsModule { }
