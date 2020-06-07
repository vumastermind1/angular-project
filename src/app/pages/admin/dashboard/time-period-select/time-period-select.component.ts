import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MatSelectChange, MatDialog } from '@angular/material';
import { TimePeriod } from './models';
import { TimePeriodService } from './time-period.service';
import { DatepickerRangeDialogComponent } from './dialogs';
import { SelectedPeriod } from './models';

@Component({
  selector: 'flikshop-time-period-select',
  templateUrl: './time-period-select.component.html',
  styleUrls: ['./time-period-select.component.scss']
})
export class TimePeriodSelectComponent implements OnInit {
  timePeriods: TimePeriod[];
  selectedTimePeriod: TimePeriod;
  timePeriodLabel: string;
  timePeriod: Moment[];
  prevSelectedValue: number | string;
  selectedValue: number | string;

  @Output() changed: EventEmitter<Moment[]> = new EventEmitter<Moment[]>();

  constructor(
    private service: TimePeriodService,
    private dialog: MatDialog,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.service.getTimePeriods().subscribe(res => {
      this.timePeriods = res;
      this.selectedTimePeriod = this.timePeriods[0];
      this.selectedValue = this.selectedTimePeriod.id;
      this.formatTimePeriodDisplay();
      this.changed.emit(this.timePeriod);
    });
  }

  onTimePeriodChanged(event: MatSelectChange) {
    if (!event.value) {
      this.prevSelectedValue = this.selectedTimePeriod.id;
      return;
    }
    this.selectedTimePeriod = this.timePeriods.find(period => period.id === event.value);
    this.formatTimePeriodDisplay();
    this.changed.emit(this.timePeriod);
  }

  formatTimePeriodDisplay() {
    const now = moment();
    switch (this.selectedTimePeriod.key) {
      case 'LAST_7_DAYS':
        this.timePeriod = [
          moment().subtract(7, 'days'),
          now
        ];
        break;
      case 'LAST_28_DAYS':
        this.timePeriod = [
          moment().subtract(28, 'days'),
          now
        ];
        break;
      case 'LAST_90_DAYS':
        this.timePeriod = [
          moment().subtract(90, 'days'),
          now
        ];
        break;
      case 'LAST_365_DAYS':
        this.timePeriod = [
          moment().subtract(1, 'years'),
          now
        ];
        break;
      case 'LIFETIME':
        this.timePeriod = [
          moment('2012-01-01'),
          now
        ];
        break;
      case 'THIS_YEAR':
        this.timePeriod = [
          moment().startOf('year'),
          now
        ];
        break;
      case 'LAST_YEAR':
        this.timePeriod = [
          moment().subtract(1, 'years').startOf('year'),
          moment().subtract(1, 'years').endOf('year')
        ];
        break;
      case 'THIS_MONTH':
        this.timePeriod = [
          moment().startOf('month'),
          now
        ];
        break;
      case 'LAST_MONTH':
        this.timePeriod = [
          moment().subtract(1, 'months').startOf('month'),
          moment().subtract(1, 'months').endOf('month')
        ];
        break;
      case 'TWO_MONTHS_AGO':
        this.timePeriod = [
          moment().subtract(2, 'months').startOf('month'),
          moment().subtract(2, 'months').endOf('month')
        ];
        break;
      default:
        break;
    }

    this.timePeriodLabel = this.getTimePeriodLabel(this.timePeriod);
  }

  getTimePeriodLabel(timePeriod: Moment[]): string {
    return timePeriod && timePeriod.map(date => date.format('MMMM DD, YYYY')).join(' - ');
  }

  openCustomDialog() {
    const position = this.el.nativeElement.getBoundingClientRect();
    this.dialog.open(DatepickerRangeDialogComponent, {
      position: {
        top: `${position.top}px`,
        left: `${position.left}px`,
      },
      data: this.timePeriod
    }).afterClosed().subscribe((res: SelectedPeriod) => {
      if (!res) {
        this.selectedValue = this.prevSelectedValue;
        return;
      }
      this.timePeriod = [moment(res.begin), moment(res.end)];
      this.timePeriodLabel = this.getTimePeriodLabel(this.timePeriod);
      this.selectedValue = this.prevSelectedValue = '';
      this.changed.emit(this.timePeriod);
    });
  }
}
