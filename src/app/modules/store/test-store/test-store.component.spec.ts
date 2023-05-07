import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStoreComponent } from './test-store.component';

describe('TestStoreComponent', () => {
  let component: TestStoreComponent;
  let fixture: ComponentFixture<TestStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestStoreComponent]
    });
    fixture = TestBed.createComponent(TestStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
