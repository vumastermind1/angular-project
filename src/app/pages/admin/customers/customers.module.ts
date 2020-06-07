import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomersRoutingModule } from "./customers-routing.module";


@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgbModule,
    CustomersRoutingModule,
    
  ],
  declarations: [
    CustomersComponent,
    CustomerEditComponent
  ]
})

export class CustomersModule { }
