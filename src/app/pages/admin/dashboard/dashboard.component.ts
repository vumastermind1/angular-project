import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';

@Component({
  selector: 'flikshop-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedDuration: Moment[];

  constructor() { }

  ngOnInit() { }

  onPeriodChanged(duration: Moment[]) {
    this.selectedDuration = duration;
  }

}
