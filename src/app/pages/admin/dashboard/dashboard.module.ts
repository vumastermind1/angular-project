import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatDividerModule,
  MatDialogModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCardModule
} from '@angular/material';

import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

import { DashboardComponent } from './dashboard.component';
import { TimePeriodSelectComponent } from './time-period-select';
import { DatepickerRangeDialogComponent } from './time-period-select';
import { NewUsersComponent } from './new-users';

import { SharedModule } from '../../../shared';
import { GiftCardsComponent } from './gift-cards/gift-cards.component';
import { PostCardsComponent } from './post-cards/post-cards.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { RevenueComponent } from './revenue/revenue.component';
import { PackagesPurchasedComponent } from './packages-purchased/packages-purchased.component';


const routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    TimePeriodSelectComponent,
    DatepickerRangeDialogComponent,
    NewUsersComponent,
    GiftCardsComponent,
    PostCardsComponent,
    ActiveUsersComponent,
    RevenueComponent,
    PackagesPurchasedComponent
  ],
  entryComponents: [
    DatepickerRangeDialogComponent
  ]
})

export class DashboardModule { }
