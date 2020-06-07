import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts.component';

const routes = [
  { path: '', component: ContactsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    ContactsComponent
  ]
})

export class ContactsModule { }
