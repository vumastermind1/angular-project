import {
  Component,
  OnInit,
  OnChanges,
  Input,
  ViewChild,
  ElementRef,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  SimpleChanges
} from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { BaseAnalyticsComponent } from '../base-analytics';
import { AnalyticsService } from '../../../../core/services';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'flikshop-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent extends BaseAnalyticsComponent implements OnInit, OnChanges {

  @Input() duration: Moment[];
  @ViewChild('activeUsersChart', { static: true }) activeUsersChart: ElementRef;
  @ViewChild('expandedChart', { static: true }) expandedChart: ElementRef;

  lineWidth = 90;
  selectedStartDate: string;
  selectedEndDate: string;
  expanded = false;
  loading = false;

  constructor(
    resolver: ComponentFactoryResolver,
    injector: Injector,
    appRef: ApplicationRef,
    analyticsService: AnalyticsService
  ) {
    super(resolver, injector, appRef, analyticsService);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.duration.currentValue) {
      this.onDataUpdated();
    }
  }

  onDataUpdated() {
    const [start, end] = this.duration.map(date => date.format(this.DAY_FORMAT));
    this.selectedStartDate = start;
    this.selectedEndDate = end;
    this.drawChart(start, end);
  }

  async drawChart(start: string, end?: string, expanded?: boolean) {
    /** Expand the chart when data is grouped */
    end = end || this.selectedEndDate;
    this.expanded = expanded || false;

    const targetElement = this.expanded ? this.expandedChart.nativeElement : this.activeUsersChart.nativeElement;
    targetElement.innerHTML = '';

    this.loading = true;

    const startDate = moment(start).format(this.DAY_FORMAT);
    const endDate = moment(end).format(this.DAY_FORMAT);
    const rawData: any = await this.analyticsService.getActiveUsers(startDate, endDate).toPromise();
    const data = {
      labels: [],
      series: []
    };

    if (!rawData.length) {
      return;
    }

    const type = this.getDateType(rawData[0].date, rawData[rawData.length - 1].date);

    for (const item of rawData) {
      data.labels.push(moment(item.date).format(this.getDateFormat(type)));
      data.series[0] = [
        ...(data.series[0] || []),
        item.value
      ];
    }

    this.loading = false;

    const width = Math.max(targetElement.clientWidth, rawData.length * this.lineWidth);

    this.startAnimationForLineChart({
      target: targetElement,
      data,
      options: {
        width
      },
      onClick: type !== 'Day' && this.drawChart.bind(this),
      createTooltip: this.createTooltip.bind(this)
    });
  }

  createTooltip(value: number, parentElement: HTMLElement) {
    super.createTooltip(value, parentElement, `Active Users: ${value}`);
  }
}
