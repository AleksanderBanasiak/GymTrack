import { TestBed } from '@angular/core/testing';

import { ChosenDateServiceService } from './chosen-date-service.service';

describe('ChosenDateServiceService', () => {
  let service: ChosenDateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChosenDateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
