import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTypesComponent } from './r-types.component';

describe('RTypesComponent', () => {
  let component: RTypesComponent;
  let fixture: ComponentFixture<RTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RTypesComponent]
    });
    fixture = TestBed.createComponent(RTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
