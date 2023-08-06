import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFilterComponent } from './class-filter.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolService } from '../../services/school.service';
import { SeriesService } from '../../services/series.service';
import { of } from 'rxjs';
import { serie_mock } from 'src/app/core/mocks/serie.mock';
import { select_mock } from 'src/app/core/mocks/select.mock';
import { MockFilters } from 'src/app/core/mocks/filters.mock';

describe('ClassFilterComponent', () => {
  let component: ClassFilterComponent;
  let fixture: ComponentFixture<ClassFilterComponent>;
  let schoolService: SchoolService;
  let seriesService: SeriesService
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassFilterComponent],
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
    fixture = TestBed.createComponent(ClassFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    schoolService = TestBed.inject(SchoolService);
    seriesService = TestBed.inject(SeriesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    component.createForm();
    fixture.detectChanges();
    expect(component.form).toBeTruthy();
  });

  it('should select teaching change case 1', () => {
    component.form.get('typeTeaching')?.setValue(null);
    component.selectTeachingChange();
    fixture.detectChanges();
    expect(component.form.get('series')?.disabled).toBeTruthy();
  });

  it('should get teaching', () => {
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

  it('should search', () => {
    const spyEventEmitter = spyOn(component.searchCallback, 'emit')

    spyOn(MockFilters, 'adjustObjLike').and.callFake((obj: any) => obj);
    spyOn(MockFilters, 'removeNullUndefinedKeys').and.callFake((obj: any) => obj);

    component.search();
    fixture.detectChanges();
    expect(spyEventEmitter).toHaveBeenCalled()
  });
});
