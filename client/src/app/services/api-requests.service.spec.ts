import { TestBed, inject } from '@angular/core/testing';

import { ApiRequestsService } from './api-requests.service';

describe('ApiRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiRequestsService]
    });
  });

  it('should be created', inject([ApiRequestsService], (service: ApiRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
