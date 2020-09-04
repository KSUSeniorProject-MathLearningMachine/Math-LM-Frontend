import { TestBed } from '@angular/core/testing';

import { MathLearningMachineApiService } from './math-learning-machine-api.service';

describe('MathLearningMachineApiService', () => {
  let service: MathLearningMachineApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathLearningMachineApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
