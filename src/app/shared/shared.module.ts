import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { TooltipComponent } from './components';
import { MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MomentModule
];

@NgModule({
  imports: [
    ...modules,
    MatTooltipModule
  ],
  exports: [
    ...modules,
    TooltipComponent
  ],
  declarations: [
    TooltipComponent
  ],
  entryComponents: [
    TooltipComponent
  ]
})
export class SharedModule { }
