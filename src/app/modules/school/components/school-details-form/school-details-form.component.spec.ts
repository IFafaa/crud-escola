import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDetailsFormComponent } from './school-details-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { Formatters } from 'src/app/core/helpers/formatters';
import { SchoolService } from '../../services/school.service';
import { of } from 'rxjs';
import { select_mock } from 'src/app/core/mocks/select.mock';

describe('SchoolDetailsFormComponent', () => {
  let component: SchoolDetailsFormComponent;
  let fixture: ComponentFixture<SchoolDetailsFormComponent>;
  let schoolService: SchoolService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolDetailsFormComponent],
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
        Formatters
      ]
    });
    fixture = TestBed.createComponent(SchoolDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    schoolService = TestBed.inject(SchoolService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should format type teaching', () => {
    expect(component.formatTypeTeaching(1)).toEqual('Ensino Fundamental I');
  });

  it('should format openingHours', () => {
    expect(component.formatOpeningHours(1)).toEqual('Tarde');
  });
});
