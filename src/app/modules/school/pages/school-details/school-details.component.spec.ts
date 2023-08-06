import { students_mock } from './../../../../core/mocks/student.mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolDetailsComponent } from './school-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { SchoolService } from '../../services/school.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ClassesService } from '../../services/classes.service';
import { StudentService } from '../../services/student.service';
import { InjectionToken } from '@angular/core';
import { Formatters } from 'src/app/core/helpers/formatters';
import { SchoolModule } from '../../school.module';
import { NgxMaskModule } from 'ngx-mask';
import { of } from 'rxjs';
import { school_mock } from 'src/app/core/mocks/school.mock';
import { classes_mock } from 'src/app/core/mocks/class.mock';

describe('SchoolDetailsComponent', () => {
  let component: SchoolDetailsComponent;
  let fixture: ComponentFixture<SchoolDetailsComponent>;
  let router: Router;
  let schoolService: SchoolService;
  let classesService: ClassesService;
  let studentService: StudentService;
  let confirmDialog: ConfirmDialogService;
  let toastrService: ToastrService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolDetailsComponent],
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
        RouterTestingModule,
        SchoolModule,
        NgxMaskModule.forRoot(),
      ],
      providers: [SchoolService, ToastrService, Formatters],
    });
    fixture = TestBed.createComponent(SchoolDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    schoolService = TestBed.inject(SchoolService);
    confirmDialog = TestBed.inject(ConfirmDialogService);
    toastrService = TestBed.inject(ToastrService);
    route = TestBed.inject(ActivatedRoute);
    studentService = TestBed.inject(StudentService);
    classesService = TestBed.inject(ClassesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getClasses() and getStudents() after getSchoolById()', () => {
    spyOn(schoolService, 'getSchoolById').and.returnValue(of(school_mock));
    spyOn(classesService, 'getClasses').and.returnValue(of(classes_mock));
    spyOn(studentService, 'getStudentsBySchoolId').and.returnValue(
      of(students_mock)
    );
    component.escolaId = 1;
    component.getSchool();
    fixture.detectChanges();
    expect(component.school).toEqual(school_mock);
    expect(classesService.getClasses).toHaveBeenCalledWith(1);
    expect(studentService.getStudentsBySchoolId).toHaveBeenCalled();
  });

  it('should get classes', () => {
    const spy = spyOn(classesService, 'getClasses').and.returnValue(
      of(classes_mock)
    );
    component.school = school_mock;

    component.getClasses();

    expect(spy).toHaveBeenCalled();
    expect(component.classes).toEqual(classes_mock);
    expect(component.qntForm.get('classes')?.value).toEqual(1);
  });

  it('should get students', () => {
    const spy = spyOn(studentService, 'getStudentsBySchoolId').and.returnValue(
      of(students_mock)
    );
    component.school = school_mock;

    component.getStudents();

    expect(spy).toHaveBeenCalled();
    expect(component.students).toEqual(students_mock);
    expect(component.qntForm.get('students')?.value).toEqual(1);
  });

  it('should back', () => {
    const spy = spyOn(router, 'navigate');
    component.back();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(['/escolas']);
  });

  it('should save school', () => {
    const spy = spyOn(schoolService, 'editSchool').and.returnValue(
      of(school_mock)
    );
    const spyBack = spyOn(component, 'back');
    const spyToastr = spyOn(toastrService, 'success');

    component.schoolForm.patchValue(school_mock);
    component.school = school_mock;

    component.saveSchool();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(
      component.school.id,
      component.schoolForm.value
    );
    expect(spyBack).toHaveBeenCalled();
    expect(spyToastr).toHaveBeenCalledWith(
      'Dados da escola editados com sucesso!'
    );
  });
});
