import { TestBed } from '@angular/core/testing';

import { SyncStoreService } from './sync-store.service';

describe('StoreService', () => {
  let service: SyncStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [
        {
            provide: SyncStoreService, useValue: SyncStoreService
        }
    ]
    });
    service = TestBed.inject(SyncStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
