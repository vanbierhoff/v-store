import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStackComponent } from './event-stack.component';

describe('EventStackComponent', () => {
  let component: EventStackComponent;
  let fixture: ComponentFixture<EventStackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventStackComponent]
    });
    fixture = TestBed.createComponent(EventStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
