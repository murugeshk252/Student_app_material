import { TestBed } from '@angular/core/testing';

import { QuizurlService } from './quizurl.service';

describe('QuizurlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizurlService = TestBed.get(QuizurlService);
    expect(service).toBeTruthy();
  });
});
