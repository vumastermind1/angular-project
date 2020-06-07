import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerRangeDialogComponent } from './datepicker-range-dialog.component';

describe('DatepickerRangeDialogComponent', () => {
  let component: DatepickerRangeDialogComponent;
  let fixture: ComponentFixture<DatepickerRangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerRangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerRangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
