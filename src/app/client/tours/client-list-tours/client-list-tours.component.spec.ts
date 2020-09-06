import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListToursComponent } from './client-list-tours.component';

describe('ClientListToursComponent', () => {
  let component: ClientListToursComponent;
  let fixture: ComponentFixture<ClientListToursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientListToursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
