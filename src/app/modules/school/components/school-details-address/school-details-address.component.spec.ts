import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDetailsAddressComponent } from './school-details-address.component';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { CepService } from 'src/app/core/services/cep.service';
import { of } from 'rxjs';
import { cep_mock, cep_mock_erro } from 'src/app/core/mocks/cep.mock';

describe('SchoolDetailsAddressComponent', () => {
  let component: SchoolDetailsAddressComponent;
  let fixture: ComponentFixture<SchoolDetailsAddressComponent>;
  let cepService: CepService;
  let formGroup: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolDetailsAddressComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BrowserModule,
      ],
    });
    fixture = TestBed.createComponent(SchoolDetailsAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolDetailsAddressComponent);
    component = fixture.componentInstance;
    cepService = TestBed.inject(CepService);

    formGroup = new FormGroup({
      number: new FormControl(''),
      cep: new FormControl(''),
      street: new FormControl(''),
      neighborhood: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
    });

    component.form = formGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCep and setLocation with valid CEP', () => {
    const cep = '12345678';
    spyOn(cepService, 'getCep').and.returnValue(of(cep_mock));
    spyOn(component, 'setLocation');
    component.getCep(cep);
    expect(cepService.getCep).toHaveBeenCalledWith(cep);
    expect(component.setLocation).toHaveBeenCalledWith(cep_mock);
  });

  it('should call getCep adn return error', () => {
    const cep = '12345678';
    spyOn(cepService, 'getCep').and.returnValue(of(cep_mock_erro));
    component.getCep(cep);
    expect(cepService.getCep).toHaveBeenCalledWith(cep);
    expect(component.form.get('cep')?.hasError('invalidCep')).toBeTruthy();
  });

  it('should not call getCep for invalid CEP length', () => {
    const cep = '123456';
    spyOn(cepService, 'getCep');

    component.getCep(cep);
    expect(cepService.getCep).not.toHaveBeenCalled();
  });

  it('should setLocation correctly', () => {
    const location = {
      logradouro: 'Rua Exemplo',
      bairro: 'Bairro Exemplo',
      localidade: 'Cidade Exemplo',
      uf: 'EX',
    };
    component.setLocation(location);
    expect(component.form.value).toEqual({
      street: location.logradouro,
      neighborhood: location.bairro,
      city: location.localidade,
      state: location.uf,
      number: '',
      cep: '',
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
