import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef
} from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { BaseAnalyticsComponent } from '../base-analytics';
import { AnalyticsService } from '../../../../core/services';

@Component({
  selector: 'flikshop-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent extends BaseAnalyticsComponent implements OnInit, OnChanges {

  @Input() duration: Moment[];
  @ViewChild('revenueChart', { static: true }) revenueChart: ElementRef;
  @ViewChild('expandedChart', { static: true }) expandedChart: ElementRef;

  lineWidth = 90;
  selectedStartDate: string;
  selectedEndDate: string;
  expanded = false;
  loading = false;

  selectedSource = 'All';
  sources: string[] = ['PayPal', 'Stripe', 'All'];

  constructor(
    resolver: ComponentFactoryResolver,
    injector: Injector,
    appRef: ApplicationRef,
    analyticsService: AnalyticsService
  ) {
    super(resolver, injector, appRef, analyticsService);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
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

    const targetElement = this.expanded ? this.expandedChart.nativeElement : this.revenueChart.nativeElement;
    targetElement.innerHTML = '';

    this.loading = true;

    const startDate = moment(start).format(this.DAY_FORMAT);
    const endDate = moment(end).format(this.DAY_FORMAT);
    const rawData: any = await this.analyticsService.getRevenue(startDate, endDate, this.selectedSource).toPromise();
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
    super.createTooltip(value, parentElement, `Revenue: $${value}`);
  }
}
