import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiceDeskComponent } from './service-desk.component';

const routes = [
  { path: '', component: ServiceDeskComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    ServiceDeskComponent
  ]
})

export class ServiceDeskModule { }
