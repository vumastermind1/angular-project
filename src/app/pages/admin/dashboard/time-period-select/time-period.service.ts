import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { TimePeriod } from './models';

@Injectable({
  providedIn: 'root'
})
export class TimePeriodService {

  getTimePeriods(): Observable<TimePeriod[]> {
    const now = moment();
    const lastYear = moment().subtract(1, 'year');
    const lastMonth = moment().subtract(1, 'months');
    const twoMonthsAgo = moment().subtract(2, 'months');

    return of([
      new TimePeriod(1, 'LAST_7_DAYS', 'Last 7 Days'),
      new TimePeriod(2, 'LAST_28_DAYS', 'Last 28 Days'),
      new TimePeriod(3, 'LAST_90_DAYS', 'Last 90 Days'),
      new TimePeriod(4, 'LAST_365_DAYS', 'Last 365 Days'),
      new TimePeriod(5, 'LIFETIME', 'Lifetime', true),
      new TimePeriod(6, 'THIS_YEAR', `${now.format('YYYY')}`),
      new TimePeriod(7, 'LAST_YEAR', `${lastYear.format('YYYY')}`, true),
      new TimePeriod(8, 'THIS_MONTH', `${now.format('MMMM')}`),
      new TimePeriod(9, 'LAST_MONTH', `${lastMonth.format('YYYY') === now.format('YYYY') ? lastMonth.format('MMMM') : lastMonth.format('MMMM YYYY')}`),
      new TimePeriod(10, 'TWO_MONTHS_AGO', `${twoMonthsAgo.format('YYYY') === now.format('YYYY') ? twoMonthsAgo.format('MMMM') : twoMonthsAgo.format('MMMM YYYY')}`, true)
    ]);
  }
}
