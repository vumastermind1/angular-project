import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatRadioModule, MatRadioGroup } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app.routing';
import {
  CoreModule,
  SingletonsModule,
  AdminLayoutComponent,
  
  
} from './core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { PackagesPurchasedComponent } from './pages/admin/dashboard/packages-purchased/packages-purchased.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SingletonsModule,
    NgxDatatableModule,
    NgbModule,
    AgmCoreModule.forRoot({ apiKey: 'YOUR_GOOGLE_MAPS_API_KEY' }),
    // Material
    MatSnackBarModule,
    CoreModule.forRoot(),
    SharedModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
