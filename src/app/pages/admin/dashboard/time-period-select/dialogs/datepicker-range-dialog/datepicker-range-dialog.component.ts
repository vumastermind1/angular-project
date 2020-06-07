import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';
import { SelectedPeriod } from '../../models/selected-period.model';

@Component({
  selector: 'flikshop-datepicker-range-dialog',
  templateUrl: './datepicker-range-dialog.component.html',
  styleUrls: ['./datepicker-range-dialog.component.scss']
})
export class DatepickerRangeDialogComponent implements OnInit {

  selectedDate: SelectedPeriod;

  constructor(
    private dialogRef: MatDialogRef<DatepickerRangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Moment[]
  ) { }

  ngOnInit() {
    if (this.data) {
      this.selectedDate = {
        begin: this.data[0].toDate(),
        end: this.data[1].toDate()
      };
    }
  }

  getDiff(beginDate: Date, endDate: Date): number {
    return moment(endDate).diff(beginDate, 'days');
  }

  getText(date: Date): string {
    return moment(date).format('MMM DD, YYYY');
  }

  dateRangesChange(selectedDate: SelectedPeriod) {
    this.selectedDate = selectedDate;
  }

  cancel() {
    this.dialogRef.close();
  }

}
