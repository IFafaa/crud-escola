import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFormComponent } from './student-form.component';
import { StudentService } from '../../services/student.service';
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
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { student_mock, students_mock } from 'src/app/core/mocks/student.mock';
import { of } from 'rxjs';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;
  let studentService: StudentService;
  let matDialogRef: MatDialogRef<StudentFormComponent>;
  let toastrService: ToastrService
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFormComponent],
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
    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    matDialogRef = TestBed.inject(MatDialogRef<StudentFormComponent>);
    studentService = TestBed.inject(StudentService);
    toastrService = TestBed.inject(ToastrService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    component.createForm();
    fixture.detectChanges();
    expect(component.form).toBeTruthy()
  });

  it('should get student case 1', () => {
    const spy = spyOn(studentService, 'getStudentsById').and.returnValue(of(student_mock))
    component.isCreate = true
    component.getStudent();
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled()
  });

  it('should get student case 2', () => {
    const spy = spyOn(studentService, 'getStudentsById').and.returnValue(of(student_mock))
    const spyForm = spyOn(component.form, 'patchValue')
    component.data.studentId = 1
    component.isCreate = false
    component.getStudent();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(component.data.studentId)
    expect(spyForm).toHaveBeenCalledWith(student_mock)
  });

  it('should create student', () => {
    const spy = spyOn(studentService, 'createStudent').and.returnValue(of(student_mock))
    const spyToastr = spyOn(toastrService, 'success')
    const spyClose = spyOn(component, 'close')
    const payload = {...component.form.value,
      idClass: component.data.classId,
      idSchool: component.data.schoolId,
    }
    component.data.studentId = 1
    component.isCreate = false
    component.create();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(payload)
    expect(spyToastr).toHaveBeenCalledWith('Estudante criado com sucesso!')
    expect(spyClose).toHaveBeenCalled()
  });

  it('should edit student', () => {
    const spy = spyOn(studentService, 'editStudent').and.returnValue(of(student_mock))
    const spyToastr = spyOn(toastrService, 'success')
    const spyClose = spyOn(component, 'close')
    const payload = {...component.form.value,
      idClass: component.data.classId,
      idSchool: component.data.schoolId,
    }
    component.data.studentId = 1
    component.isCreate = false
    component.edit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(component.data.studentId,payload)
    expect(spyToastr).toHaveBeenCalledWith('Estudante editado com sucesso!')
    expect(spyClose).toHaveBeenCalled()
  });

  it('should close', () => {
    const spy = spyOn(matDialogRef, 'close');
    component.close();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
