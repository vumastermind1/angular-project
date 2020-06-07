import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from "./customers.component";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
        { path: '', redirectTo: 'customers', pathMatch: 'full' },
        // {
        //   path: 'edit/:id',
        //   loadChildren: './cases-edit/case-edit.module#CasesEditModule'
        // },
        {
          path: 'show/:id',
          component: CustomerEditComponent,
          
          data: {
            title: 'Customer'
          }
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule { }