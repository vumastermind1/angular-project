import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardsComponent } from './post-cards.component';

describe('PostCardsComponent', () => {
  let component: PostCardsComponent;
  let fixture: ComponentFixture<PostCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
