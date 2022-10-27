import { TestBed } from '@angular/core/testing';

import { LogfilesService } from './logfiles.service';

describe('LogfilesService', () => {
  let service: LogfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
