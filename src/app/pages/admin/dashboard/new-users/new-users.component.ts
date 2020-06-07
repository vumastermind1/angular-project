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
  selector: 'flikshop-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.scss']
})
export class NewUsersComponent extends BaseAnalyticsComponent implements OnInit, OnChanges {

  @Input() duration: Moment[];
  @ViewChild('newUsersChart', { static: true }) newUsersChart: ElementRef;
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

  search:any = 'brandi';
  status:string = 'locked';

  id:any = 1;

  ngOnInit() {
    this.analyticsService.getCustomerData(this.search,this.status).subscribe(result => {
       console.log('this is result', result);
      // debugger;
      //  if(result.length > 0) {
           
      //    } 
       },error=>{
         console.log(error);
       });


       this.analyticsService.getSingleCustomer(this.id).subscribe(result => {
        console.log('this is result', result);
       // debugger;
       //  if(result.length > 0) {
            
       //    } 
        },error=>{
          console.log(error);
        });

        // this.analyticsService.getAllCustomer().subscribe(result => {
        //   console.log('this is', result);
        //  // debugger;
        //  //  if(result.length > 0) {
              
        //  //    } 
        //   },error=>{
        //     console.log(error);
        //   });
   }

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

    const targetElement = this.expanded ? this.expandedChart.nativeElement : this.newUsersChart.nativeElement;
    targetElement.innerHTML = '';

    this.loading = true;

    const startDate = moment(start).format(this.DAY_FORMAT);
    const endDate = moment(end).format(this.DAY_FORMAT);
    const rawData: any = await this.analyticsService.getNewUserRegistrations(startDate, endDate).toPromise();
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
    super.createTooltip(value, parentElement, `Users: ${value}`);
  }


  


}
