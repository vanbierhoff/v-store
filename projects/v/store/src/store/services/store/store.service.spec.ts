import { TestBed } from '@angular/core/testing';

import { StoreDataService } from './store-data.service';

describe('StoreService', () => {
  let service: StoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [
        {
            provide: StoreDataService, useValue: StoreDataService
        }
    ]
    });
    service = TestBed.inject(StoreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
