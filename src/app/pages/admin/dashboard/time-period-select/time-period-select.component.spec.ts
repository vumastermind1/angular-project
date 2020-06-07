import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePeriodSelectComponent } from './time-period-select.component';

describe('TimePeriodSelectComponent', () => {
  let component: TimePeriodSelectComponent;
  let fixture: ComponentFixture<TimePeriodSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePeriodSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePeriodSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
