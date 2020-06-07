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
  selector: 'flikshop-gift-cards',
  templateUrl: './gift-cards.component.html',
  styleUrls: ['./gift-cards.component.scss']
})
export class GiftCardsComponent extends BaseAnalyticsComponent implements OnInit, OnChanges {
  @Input() duration: Moment[];
  @ViewChild('giftCardsChart', { static: true }) giftCardsChart: ElementRef;
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

  ngOnInit() { }

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

    const targetElement = this.expanded ? this.expandedChart.nativeElement : this.giftCardsChart.nativeElement;
    targetElement.innerHTML = '';

    this.loading = false;

    const startDate = moment(start).format(this.DAY_FORMAT);
    const endDate = moment(end).format(this.DAY_FORMAT);
    const rawData: any = await this.analyticsService.getGiftCardsSold(startDate, endDate).toPromise();
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

  createTooltip(value: number, parentElement) {
    super.createTooltip(value, parentElement, `Gift Cards: ${value}`);
  }
}
