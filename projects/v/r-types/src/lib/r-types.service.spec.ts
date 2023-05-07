import { TestBed } from '@angular/core/testing';

import { RTypesService } from './r-types.service';

describe('RTypesService', () => {
  let service: RTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
