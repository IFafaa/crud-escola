import { ClassesService } from './../../services/classes.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAddComponent } from './class-add.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolService } from '../../services/school.service';
import { of, throwError } from 'rxjs';
import { select_mock } from 'src/app/core/mocks/select.mock';
import { SeriesService } from '../../services/series.service';
import { serie_mock } from 'src/app/core/mocks/serie.mock';
import { class_mock } from 'src/app/core/mocks/class.mock';

describe('ClassAddComponent', () => {
  let component: ClassAddComponent;
  let fixture: ComponentFixture<ClassAddComponent>;
  let schoolService: SchoolService;
  let seriesService: SeriesService;
  let toastrService: ToastrService;
  let matDialogRef: MatDialogRef<ClassAddComponent>;
  let classesService: ClassesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassAddComponent],
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
        {
          provide: MatDialogRef,
          useValue: {
            close() {},
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(ClassAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    schoolService = TestBed.inject(SchoolService);
    toastrService = TestBed.inject(ToastrService);
    matDialogRef = TestBed.inject(MatDialogRef<ClassAddComponent>);
    seriesService = TestBed.inject(SeriesService);
    classesService = TestBed.inject(ClassesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get teaching', () => {
    const spy = spyOn(schoolService, 'typeTeaching').and.returnValue(
      of(select_mock)
    );
    component.data.typeTeaching = [0];
    const typeTeachingFiltered = select_mock.filter((typeTeaching) =>
      component.data.typeTeaching.includes(typeTeaching.id)
    );
    component.getTeaching();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.typeTeaching).toEqual(typeTeachingFiltered);
  });

  it('should get openingHours', () => {
    const spy = spyOn(schoolService, 'typeOpeningHours').and.returnValue(
      of(select_mock)
    );
    component.data.typeOpeningHours = [0];
    const typeOpeningHoursFiltered = select_mock.filter((typeOpeningHours) =>
      component.data.typeOpeningHours.includes(typeOpeningHours.id)
    );
    component.getOpeningHours();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.typeOpeningHours).toEqual(typeOpeningHoursFiltered);
  });

  it('should close', () => {
    const spy = spyOn(matDialogRef, 'close');
    component.close();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should select teaching change case 1', () => {
    component.form.get('typeTeaching')?.setValue(null);
    component.selectTeachingChange();
    fixture.detectChanges();
    expect(component.form.get('series')?.disabled).toBeTruthy();
  });

  it('should select teaching change case 2', () => {
    const spy = spyOn(seriesService, 'getSeries').and.returnValue(
      of(serie_mock)
    );
    component.form.get('typeTeaching')?.setValue(1);
    component.selectTeachingChange();
    fixture.detectChanges();
    expect(component.form.get('series')?.enabled).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(component.form.get('typeTeaching')?.value);
    expect(component.series).toEqual(serie_mock);
  });

  it('should create case 1', () => {
    const spy = spyOn(classesService, 'createClass').and.returnValue(
      of(class_mock)
    );
    const spyToastr = spyOn(toastrService, 'success');
    const spyClose = spyOn(component, 'close');
    const payload = { ...component.form.value, idSchool: undefined };
    component.create();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(payload);
    expect(spyToastr).toHaveBeenCalledWith('Classe cadastrada com sucesso!');
    expect(spyClose).toHaveBeenCalled();
  });

  it('should create case 2', () => {
    const spy = spyOn(classesService, 'createClass').and.returnValue(
      throwError('Erro simulado')
    );
    const payload = { ...component.form.value, idSchool: undefined };
    const spyToastr = spyOn(toastrService, 'error');
    component.create();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(payload);
    expect(spyToastr).toHaveBeenCalledWith(
      'Houve um problema, tente novamente ou mais tarde'
    );
  });
});
