import { TestBed } from '@angular/core/testing';

import { ClassesService } from './classes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClassesService', () => {
  let service: ClassesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(ClassesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
