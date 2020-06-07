import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InstitutionsComponent } from './institutions.component';

const routes = [
  { path: '', component: InstitutionsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    InstitutionsComponent
  ]
})

export class InstitutionsModule { }
