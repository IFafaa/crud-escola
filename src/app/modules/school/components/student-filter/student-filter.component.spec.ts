import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFilterComponent } from './student-filter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { MockFilters } from './../../../../core/mocks/filters.mock'

describe('StudentFilterComponent', () => {
  let component: StudentFilterComponent;
  let fixture: ComponentFixture<StudentFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFilterComponent],
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
    fixture = TestBed.createComponent(StudentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    component.createForm();
    fixture.detectChanges();
    expect(component.form).toBeTruthy();
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
