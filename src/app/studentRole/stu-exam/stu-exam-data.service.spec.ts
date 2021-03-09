import { TestBed } from '@angular/core/testing';

import { StuExamDataService } from './stu-exam-data.service';

describe('StuExamDataService', () => {
  let service: StuExamDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StuExamDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
