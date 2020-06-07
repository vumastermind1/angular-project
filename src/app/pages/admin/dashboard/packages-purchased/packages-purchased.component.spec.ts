import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesPurchasedComponent } from './packages-purchased.component';

describe('PackagesPurchasedComponent', () => {
  let component: PackagesPurchasedComponent;
  let fixture: ComponentFixture<PackagesPurchasedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagesPurchasedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesPurchasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
