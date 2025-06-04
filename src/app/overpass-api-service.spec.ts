import { TestBed } from '@angular/core/testing';

import { OverpassApiService } from './overpass-api-service';

describe('OverpassApiService', () => {
  let service: OverpassApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverpassApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
