import { TestBed } from '@angular/core/testing';

import { AdService } from './ads-service.service';

describe('AdsServiceService', () => {
  let service: AdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
