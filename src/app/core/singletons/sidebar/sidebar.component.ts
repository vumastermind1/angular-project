import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/customers', title: 'Customers', icon: 'people', class: '' },
  { path: '/contacts', title: 'Contacts', icon: 'person', class: '' },
  { path: '/administrators', title: 'Administrators', icon: 'lock_open', class: '' },
  { path: '/orders', title: 'Orders', icon: 'shopping_cart', class: '' },
  { path: '/institutions', title: 'Institutions', icon: 'location_city', class: '-' },
  { path: '/gift-cards', title: 'Gift Cards', icon: 'card_giftcard', class: '' },
  { path: '/service-desk', title: 'Service Desk', icon: 'unarchive', class: '' },
];

@Component({
  selector: 'flikshop-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
