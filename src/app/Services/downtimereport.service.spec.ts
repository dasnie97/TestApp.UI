import { TestBed } from '@angular/core/testing';

import { DowntimereportService } from './downtimereport.service';

describe('DowntimereportService', () => {
  let service: DowntimereportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DowntimereportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
