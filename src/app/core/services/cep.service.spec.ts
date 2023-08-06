import { TestBed } from '@angular/core/testing';
import { CepService } from './cep.service'
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CepService', () => {
  let service: CepService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(CepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
