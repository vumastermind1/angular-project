import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-loaded';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlikshopHttpInterceptor } from './interceptors';

@NgModule({
  imports: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FlikshopHttpInterceptor,
          multi: true
        },
      ]
    };
  }
}
