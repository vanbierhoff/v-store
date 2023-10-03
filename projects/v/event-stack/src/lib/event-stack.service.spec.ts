import { TestBed } from '@angular/core/testing';

import { EventStackService } from './event-stack.service';

describe('EventStackService', () => {
  let service: EventStackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventStackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
