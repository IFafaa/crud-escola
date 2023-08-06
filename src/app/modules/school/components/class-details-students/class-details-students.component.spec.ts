import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailsStudentsComponent } from './class-details-students.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { student_mock, students_mock } from 'src/app/core/mocks/student.mock';
import { Formatters } from 'src/app/core/helpers/formatters';
import { Export } from 'src/app/core/helpers/export';
import { class_mock } from 'src/app/core/mocks/class.mock';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxMaskModule } from 'ngx-mask';
import { StudentService } from '../../services/student.service';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { ENUM_STATUS_LIST } from 'src/app/shared/enums/status-list.enum';

describe('ClassDetailsStudentsComponent', () => {
  let component: ClassDetailsStudentsComponent;
  let fixture: ComponentFixture<ClassDetailsStudentsComponent>;
  let studentService: StudentService;
  let confirmDialog: ConfirmDialogService;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassDetailsStudentsComponent],
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
        MatPaginatorModule,
        NgxMaskModule.forRoot(),
      ],
    });
    fixture = TestBed.createComponent(ClassDetailsStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.class = class_mock;
    component.students = students_mock;

    studentService = TestBed.inject(StudentService);
    confirmDialog = TestBed.inject(ConfirmDialogService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should export students', () => {
    const spy = spyOn(Export, 'exportToCsv');
    const array = students_mock.map((student) => ({
      name: student.name,
      age: student.age,
      cpf: student.cpf,
    }));
    const filename = Formatters.formatClassName(
      class_mock.name,
      class_mock.series
    );
    component.exportStudents();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(array, filename);
  });

  it('should call confirm dialog before deleting the class', () => {
    const mockId = 1;
    const confirmDialogSpy = spyOn(confirmDialog, 'confirm').and.callFake(
      (title, desc, callback) => {
        callback();
      }
    );
    component.deleteStudent(mockId);
    expect(confirmDialogSpy).toHaveBeenCalledOnceWith(
      'Deletar Estudante',
      'Você realmente deseja deletar essa estudante?',
      jasmine.any(Function)
    );
  });

  it('should call studentService.deleteStudent and show toastr on successful deletion', () => {
    const mockId = 1;
    spyOn(confirmDialog, 'confirm').and.callFake((title, desc, callback) => {
      callback();
    });
    const deleteStudentSpy = spyOn(
      studentService,
      'deleteStudent'
    ).and.returnValue(of(student_mock));
    const toastrSuccessSpy = spyOn(toastrService, 'success');

    component.deleteStudent(mockId);
    fixture.detectChanges();

    expect(deleteStudentSpy).toHaveBeenCalledOnceWith(mockId);
    expect(toastrSuccessSpy).toHaveBeenCalledOnceWith(
      'Estudante deletado com sucesso!'
    );
  });

  it('should get students case 1', () => {
    const spy = spyOn(studentService, 'getStudentsByClassId').and.returnValue(
      of(students_mock)
    );
    component.getStudents();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.students).toEqual(students_mock);
    expect(component.statusList).toEqual(ENUM_STATUS_LIST.IDLE);
  });

  it('should get students case 2', () => {
    const spy = spyOn(studentService, 'getStudentsByClassId').and.returnValue(
      of([])
    );
    component.getStudents();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.students).toEqual([]);
    expect(component.statusList).toEqual(ENUM_STATUS_LIST.NOTFOUND);
  });

  it('should get students case 2', () => {
    const spy = spyOn(studentService, 'getStudentsByClassId').and.returnValue(
      throwError('erro')
    );
    component.getStudents();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.statusList).toEqual(ENUM_STATUS_LIST.ERROR);
  });
});
