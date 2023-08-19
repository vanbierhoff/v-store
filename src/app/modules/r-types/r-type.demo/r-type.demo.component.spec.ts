import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTypeDemoComponent } from './r-type.demo.component';

describe('RTypeDemoComponent', () => {
  let component: RTypeDemoComponent;
  let fixture: ComponentFixture<RTypeDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RTypeDemoComponent]
    });
    fixture = TestBed.createComponent(RTypeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
