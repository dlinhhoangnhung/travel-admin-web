import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsIndexComponent } from './bookings-index.component';

describe('BookingsIndexComponent', () => {
  let component: BookingsIndexComponent;
  let fixture: ComponentFixture<BookingsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
