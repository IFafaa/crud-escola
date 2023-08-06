import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsFilterComponent } from './schools-filter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolService } from '../../services/school.service';
import { MockFilters } from 'src/app/core/mocks/filters.mock';
import { of } from 'rxjs';
import { select_mock } from 'src/app/core/mocks/select.mock';

describe('SchoolsFilterComponent', () => {
  let component: SchoolsFilterComponent;
  let fixture: ComponentFixture<SchoolsFilterComponent>;
  let schoolService: SchoolService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolsFilterComponent],
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
    fixture = TestBed.createComponent(SchoolsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    schoolService = TestBed.inject(SchoolService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    component.createForm();
    fixture.detectChanges();
    expect(component.form).toBeTruthy();
  });

  it('should get typeInstitution', () => {
    const spy = spyOn(schoolService, 'typeInstitution').and.returnValue(
      of(select_mock)
    );
    component.getTypeInstitution();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.typeInstitution).toEqual(select_mock);
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
