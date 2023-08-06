import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailsFormComponent } from './class-details-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolService } from '../../services/school.service';
import { select_mock } from 'src/app/core/mocks/select.mock';
import { of } from 'rxjs';
import { school_mock } from 'src/app/core/mocks/school.mock';
import { SeriesService } from '../../services/series.service';
import { serie_mock } from 'src/app/core/mocks/serie.mock';

describe('ClassDetailsFormComponent', () => {
  let component: ClassDetailsFormComponent;
  let fixture: ComponentFixture<ClassDetailsFormComponent>;
  let schoolService: SchoolService;
  let seriesService: SeriesService
  let formGroup: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassDetailsFormComponent],
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
    fixture = TestBed.createComponent(ClassDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    schoolService = TestBed.inject(SchoolService);
    seriesService = TestBed.inject(SeriesService);

    formGroup = new FormGroup({
      typeTeaching: new FormControl(''),
      series: new FormControl(''),
      name: new FormControl(''),
      typeOpeningHours: new FormControl(''),
    });
    component.form = formGroup;
    component.school = school_mock
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get teaching', () => {
    const spy = spyOn(schoolService, 'typeTeaching').and.returnValue(
      of(select_mock)
    );
    component.school.typeTeaching = [0];
    const typeTeachingFiltered = select_mock.filter((typeTeaching) =>
      component.school.typeTeaching.includes(typeTeaching.id)
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
    component.school.typeOpeningHours = [0];
    const typeOpeningHoursFiltered = select_mock.filter((typeOpeningHours) =>
      component.school.typeOpeningHours.includes(typeOpeningHours.id)
    );
    component.getOpeningHours();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.typeOpeningHours).toEqual(typeOpeningHoursFiltered);
  });

  it('should select teaching change', () => {
    const spy = spyOn(seriesService, 'getSeries').and.returnValue(
      of(serie_mock)
    );
    component.form.get('typeTeaching')?.setValue(1);
    component.selectTeachingChange();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(component.form.get('typeTeaching')?.value);
    expect(component.series).toEqual(serie_mock);
  });
});
