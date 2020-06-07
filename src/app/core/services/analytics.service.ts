import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const ANALYTICS_URL = `analytics`;

const CUSTOMER_URL = `customer`;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  getNewUserRegistrations(start: string, end: string): Observable<object> {
    return this.http.get(`${ANALYTICS_URL}/registrations/${start}/${end}`);
  }

  getPostcardsShipped(start: string, end: string): Observable<object> {
    return this.http.get(`${ANALYTICS_URL}/postcards/${start}/${end}`);
  }

  getActiveUsers(start: string, end: string): Observable<object> {
    return this.http.get(`${ANALYTICS_URL}/activeusers/${start}/${end}`);
  }

  getGiftCardsSold(start: string, end: string): Observable<object> {
    return this.http.get(`${ANALYTICS_URL}/giftcards/${start}/${end}`);
  }

  getRevenue(start: string, end: string, source: string): Observable<object> {
    return this.http.get(`${ANALYTICS_URL}/revenue/${start}/${end}/${source}`);
  }

  getPackagesPurchased(start: string, end: string): Observable<object> {
    return this.http.get(`${ANALYTICS_URL}/packages/${start}/${end}`);
  }

  getCustomerData(search:string, status:string): Observable<object> {
    return this.http.get(`${CUSTOMER_URL}/count/${search}/${status}`);
  }

  getSingleCustomer(id:any): Observable<object> {
    return this.http.get(`${CUSTOMER_URL}/${id}`);
  }

  getAllCustomer(data:object): Observable<object> {
    console.log('data',data);
    if(data['page'] == 1){
      data['page'] = 0;
      console.log('first',data['page']);
    }else{
      data['page'] = data['page'] * 10;
      console.log('other',data['page']);
    }
    return this.http.get(`${CUSTOMER_URL}/${data['page']}/${data['per_page']}/id/ascending/`);

  }

}
