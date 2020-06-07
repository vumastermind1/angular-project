import { Component, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import {
  IChartistData,
  ILineChartOptions,
  IResponsiveOptionTuple,
  IPieChartOptions,
  Line,
  Pie,
  Svg
} from 'chartist';
import * as moment from 'moment';
import { TooltipComponent } from '../../../../shared';
import { AnalyticsService } from '../../../../core/services/analytics.service';

enum DATETYPE {
  DAY = 'Day',
  MONTH = 'Month',
  YEAR = 'Year'
}

@Component({ template: '' })
export abstract class BaseAnalyticsComponent {

  readonly YEAR_FORMAT = 'YYYY';
  readonly MONTH_FORMAT = 'MM-YYYY';
  readonly DAY_FORMAT = 'MM-DD-YYYY';

  lastUpdated: Date;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    protected analyticsService: AnalyticsService
  ) { }

  startAnimationForLineChart(params: {
    target: HTMLElement,
    data: IChartistData,
    options?: ILineChartOptions,
    responsiveOptions?: Array<IResponsiveOptionTuple<ILineChartOptions>>,
    onClick?: (start: string, end: string, expanded: boolean) => void,
    createTooltip?: (value: any, parentNode: SVGForeignObjectElement) => void
  }) {
    let seq = 0;
    const delays = 80;
    const durations = 500;

    new Line(params.target, params.data, params.options, params.responsiveOptions)
      .on('draw', data => {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'point') {
          seq++;
          data.element.animate({
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
        }
      })
      .on('created', ({ svg }) => {
        /** Add tooltip to dot */
        if (params.createTooltip) {
          const dots = svg.getNode().querySelectorAll('.ct-point');

          // for (let i = 0; i < dots.length; i++) {
          for (const dot of dots) {
            const value = dot.attributes['ct:value'].value;

            /** Create parent foreignObject element  */
            const x = dot.x1.baseVal.value;
            const y = dot.y1.baseVal.value;
            const parentNode = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');

            const width = 10;
            const height = 10;

            parentNode.setAttribute('x', `${x - width / 2}`);
            parentNode.setAttribute('y', `${y - height / 2}`);
            parentNode.setAttribute('width', `${width}`);
            parentNode.setAttribute('height', `${height}`);
            parentNode.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            parentNode.style.borderRadius = '50%';
            dot.parentNode.insertBefore(parentNode, dot);
            dot.style.display = 'none';

            params.createTooltip(value, parentNode);
          }
        }

        if (params.onClick) {
          const labels = svg.getNode().querySelectorAll('.ct-label.ct-end');

          for (let i = 0; i < labels.length; i++) {
            const start = labels[i].innerText;
            const end = i !== labels.length - 1 && labels[i + 1].innerText;

            labels[i].className += ' clickable';
            labels[i].onclick = () => {
              params.onClick(start, end, true);
            };
          }
        }
      });

    seq = 0;
  }

  startAnimationForBarChart(params: {
    target: HTMLElement,
    data: IChartistData,
    options?: IPieChartOptions,
    responsiveOptions?: Array<IResponsiveOptionTuple<IPieChartOptions>>
  }) {
    let seq = 0;
    const delays = 80;
    const durations = 500;

    new Pie(params.target, params.data, params.options, params.responsiveOptions).on('draw', data => {
      if (data.type === 'bar') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });
  }

  getDateFormat(type: string): string {
    let format = '';

    switch (type) {
      case DATETYPE.YEAR:
        format = this.YEAR_FORMAT;
        break;
      case DATETYPE.MONTH:
        format = this.MONTH_FORMAT;
        break;
      case DATETYPE.DAY:
      default:
        format = this.DAY_FORMAT;
        break;
    }

    return format;
  }

  getDateType(startDate: string, endDate: string): string {
    endDate = moment(endDate).endOf('month').format();
    const diff = moment(endDate).endOf('month').diff(startDate, 'd');

    if (diff <= 31) {
      return DATETYPE.DAY;
    } else if (diff <= 365) {
      return DATETYPE.MONTH;
    } else {
      return DATETYPE.YEAR;
    }
  }

  createTooltip(value: number, parentElement: HTMLElement, content: string) {
    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    const component = factory.create(this.injector, [], parentElement);
    component.instance.content = content;
    this.appRef.attachView(component.hostView);
  }

  abstract async drawChart(start: string, end?: string, expanded?: boolean);
}
