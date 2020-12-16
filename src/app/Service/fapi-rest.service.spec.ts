import { TestBed } from '@angular/core/testing';

import { FapiRestService } from './fapi-rest.service';

describe('FapiRestService', () => {
  let service: FapiRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FapiRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
