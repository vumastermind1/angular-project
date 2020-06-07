import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Moment } from 'moment';
import * as moment from 'moment';
import { BaseAnalyticsComponent } from '../dashboard/base-analytics';
import { AnalyticsService } from '../../../core/services';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

@Component({
  selector: 'flikshop-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  @ViewChild(DatatableComponent, {static: false}) myFilterTable: DatatableComponent;

  rows = [];
  temp = [];
  caseLimit : number = 10;
	caseOffset: number = 0;
	caseaActivePage: number = 1;
	caseItemsTotal: number = 0;	
  constructor(
    private analyticsService: AnalyticsService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {

    this.getAllCustomers(null);
  }


  getAllCustomers(id:any) {
		const offset = (this.caseaActivePage - 1) * this.caseLimit;
		const limit = this.caseLimit;
		let params = {
			"pagination": 1,
			"page": this.caseaActivePage,
			"per_page": this.caseLimit
		};

				
		this.analyticsService.getAllCustomer(params).subscribe(
			(res:any) =>{

        console.log('res',res);
        this.temp = [...res];
				let rows = [];
				if(res) {
					this.rows = res
					this.caseItemsTotal = 100;
				}
				else {
                    // show error message to user
                    //this.toastrService.error(res.message, "Error");
                }
            },
            err => {
            	
            });
  }
  
  onCasePageChange(event) {
		console.log('event',event);
    this.caseLimit = event.limit;
    console.log('caselimit', this.caseLimit);
    this.caseOffset = event.offset;
    console.log('caseOffset', this.caseOffset);
    this.caseaActivePage = event.offset+1;
    console.log('caseaActivePage', this.caseaActivePage);
    
		this.getAllCustomers(null);
  }

  
  
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log('val',val);

    console.log('temp',this.temp);
    //var self = this;
    // filter our data
    const temp = this.temp.filter(function (d) {
      
      return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
      
    
    });

    // update the rows
    this.rows = temp;

    console.log('this.rows',this.rows);
    // Whenever the filter changes, always go back to the first page
    this.myFilterTable.offset = 0;

    // if (d.yourFirstColumnName.toLowerCase().indexOf(val) !== -1 || !val) {
    //   returnData = d.user_name.toLowerCase().indexOf(val) !== -1 || !val;
    //   } else if (d.yourSecondColumnName.toLowerCase().indexOf(val) !== -1 || !val) {
    //   returnData = d.notes_title.toLowerCase().indexOf(val) !== -1 || !val;
    //   }
    //   return returnData;

  }

  onView(row){
    console.log('singlerow',row);
  
    this.router.navigate(['show/' , row.id], { relativeTo: this.route }).then( (e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
    // return false;
  }

}
