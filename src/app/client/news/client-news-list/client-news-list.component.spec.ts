import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNewsListComponent } from './client-news-list.component';

describe('ClientNewsListComponent', () => {
  let component: ClientNewsListComponent;
  let fixture: ComponentFixture<ClientNewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientNewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
