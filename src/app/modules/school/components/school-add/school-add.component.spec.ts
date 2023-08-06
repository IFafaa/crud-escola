import { of, throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SchoolAddComponent } from './school-add.component';
import { SchoolService } from '../../services/school.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { select_mock } from 'src/app/core/mocks/select.mock';
import { CepService } from 'src/app/core/services/cep.service';
import { cep_mock, cep_mock_erro } from 'src/app/core/mocks/cep.mock';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { school_mock } from 'src/app/core/mocks/school.mock';

describe('SchoolAddComponent', () => {
  let component: SchoolAddComponent;
  let fixture: ComponentFixture<SchoolAddComponent>;
  let schoolService: SchoolService;
  let toastrService: ToastrService;
  let matDialogRef: MatDialogRef<SchoolAddComponent>;
  let cepService: CepService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolAddComponent],
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
      providers: [
        SchoolService,
        ToastrService,
        CepService,
        {
          provide: MatDialogRef,
          useValue: {
            close() {},
          },
        },
      ],
    });
    fixture = TestBed.createComponent(SchoolAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    schoolService = TestBed.inject(SchoolService);
    toastrService = TestBed.inject(ToastrService);
    matDialogRef = TestBed.inject(MatDialogRef<SchoolAddComponent>);
    cepService = TestBed.inject(CepService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    component.createForm();
    fixture.detectChanges();
    expect(component.form).toBeTruthy();
  });

  it('should get instituition', () => {
    const spy = spyOn(schoolService, 'typeInstitution').and.returnValue(
      of(select_mock)
    );
    component.getTypeInstitution();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.typeInstitution).toEqual(select_mock);
  });

  it('should get traching', () => {
    const spy = spyOn(schoolService, 'typeTeaching').and.returnValue(
      of(select_mock)
    );
    component.getTypeTeaching();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.typeTeaching).toEqual(select_mock);
  });

  it('should get openingHours', () => {
    const spy = spyOn(schoolService, 'typeOpeningHours').and.returnValue(
      of(select_mock)
    );
    component.getTypeOpeningHours();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.typeOpeningHours).toEqual(select_mock);
  });

  it('should getCep case 1', () => {
    component.getCep('1');
    fixture.detectChanges();
    expect(
      component.form.get('location')?.get('number')?.disabled
    ).toBeTruthy();
    expect(component.address).toEqual('');
  });

  it('should getCep case 2', () => {
    const spy = spyOn(cepService, 'getCep').and.returnValue(of(cep_mock));
    const spySetLocation = spyOn(component, 'setLocation');
    const spySetAdress = spyOn(component, 'setAddress');
    component.getCep('12345678');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('12345678');
    expect(spySetLocation).toHaveBeenCalledWith(cep_mock);
    expect(spySetAdress).toHaveBeenCalled();
  });

  it('should getCep case 3', () => {
    const spy = spyOn(cepService, 'getCep').and.returnValue(of(cep_mock_erro));
    component.getCep('12345678');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('12345678');
    expect(
      component.form.get('location')?.get('cep')?.hasError('invalidCep')
    ).toBeTruthy();
  });

  it('should set location', () => {
    component.setLocation(cep_mock);
    const form = component.form.get('location');
    expect(form?.get('street')?.value).toEqual(cep_mock.logradouro);
    expect(form?.get('neighborhood')?.value).toEqual(cep_mock.bairro);
    expect(form?.get('city')?.value).toEqual(cep_mock.localidade);
    expect(form?.get('state')?.value).toEqual(cep_mock.uf);
  });

  it('should set address', () => {
    component.setAddress();
    fixture.detectChanges();
    const formValue = component.form.get('location')?.value;
    const address = `${formValue.state}, ${formValue.city} - ${
      formValue.neighborhood
    }, ${formValue.street}, ${formValue.number || ''}`;
    expect(component.form.get('location')?.get('number')?.enabled).toBeTruthy();
    expect(component.address).toEqual(address);
  });

  it('should create case 1', () => {
    spyOn(schoolService, 'createSchool').and.returnValue(of(school_mock));
    const spyToastr = spyOn(toastrService, 'success');
    const spyClose = spyOn(component, 'close');

    component.create();
    fixture.detectChanges();

    expect(schoolService.createSchool).toHaveBeenCalledWith(
      component.form.value
    );
    expect(spyToastr).toHaveBeenCalledWith('Escola cadastrada com sucesso!');
    expect(spyClose).toHaveBeenCalled();
  });

  it('should create case 2', () => {
    spyOn(schoolService, 'createSchool').and.returnValue(
      throwError('Erro simulado')
    );
    const spyToastr = spyOn(toastrService, 'error');
    component.create();
    fixture.detectChanges();
    expect(schoolService.createSchool).toHaveBeenCalledWith(
      component.form.value
    );
    expect(spyToastr).toHaveBeenCalledWith(
      'Houve um problema, tente novamente ou mais tarde'
    );
  });

  it('should close', () => {
    const spy = spyOn(matDialogRef, 'close');
    component.close();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
