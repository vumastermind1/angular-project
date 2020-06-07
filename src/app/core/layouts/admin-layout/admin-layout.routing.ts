
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerEditComponent } from "../../../pages/admin/customers/customer-edit/customer-edit.component";

const adminLayoutRoutes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		loadChildren: () => import('../../../pages/admin/dashboard/dashboard.module').then(m => m.DashboardModule)
	},
	{
		path: 'customers',
		loadChildren: () => import('../../../pages/admin/customers/customers.module').then(m => m.CustomersModule)
	},
	
	{
		path: 'contacts',
		loadChildren: () => import('../../../pages/admin/contacts/contacts.module').then(m => m.ContactsModule)
	},
	{
		path: 'administrators',
		loadChildren: () => import('../../../pages/admin/administrators/administrators.module').then(m => m.AdministratorsModule)
	},
	{
		path: 'orders',
		loadChildren: () => import('../../../pages/admin/orders/orders.module').then(m => m.OrdersModule)
	},
	{
		path: 'institutions',
		loadChildren: () => import('../../../pages/admin/institutions/institutions.module').then(m => m.InstitutionsModule)
	},
	{
		path: 'service-desk',
		loadChildren: () => import('../../../pages/admin/service-desk/service-desk.module').then(m => m.ServiceDeskModule)
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(adminLayoutRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AdminLayoutRoutingModule { }
