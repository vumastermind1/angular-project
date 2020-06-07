import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';

const routes = [
  { path: '', component: OrdersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    OrdersComponent
  ]
})

export class OrdersModule { }
