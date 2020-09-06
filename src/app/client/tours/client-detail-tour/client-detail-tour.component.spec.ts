import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailTourComponent } from './client-detail-tour.component';

describe('ClientDetailTourComponent', () => {
  let component: ClientDetailTourComponent;
  let fixture: ComponentFixture<ClientDetailTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
