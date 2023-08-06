import { TestBed } from '@angular/core/testing';

import { ToastrService } from './toastr.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ToastrService', () => {
  let service: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
