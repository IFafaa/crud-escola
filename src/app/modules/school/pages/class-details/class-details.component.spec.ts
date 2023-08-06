import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailsComponent } from './class-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolModule } from '../../school.module';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { ClassesService } from '../../services/classes.service';
import { SchoolService } from '../../services/school.service';
import { StudentService } from '../../services/student.service';
import { Formatters } from 'src/app/core/helpers/formatters';
import { school_mock } from 'src/app/core/mocks/school.mock';
import { class_mock } from 'src/app/core/mocks/class.mock';
import { ENUM_MODE_TYPE } from 'src/app/shared/enums/mode.type.enum';

describe('ClassDetailsComponent', () => {
  let component: ClassDetailsComponent;
  let fixture: ComponentFixture<ClassDetailsComponent>;
  let router: Router;
  let schoolService: SchoolService;
  let classesService: ClassesService;
  let studentService: StudentService;
  let confirmDialog: ConfirmDialogService;
  let toastrService: ToastrService;
  let route: ActivatedRoute;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassDetailsComponent],
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
    fixture = TestBed.createComponent(ClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    schoolService = TestBed.inject(SchoolService);
    confirmDialog = TestBed.inject(ConfirmDialogService);
    toastrService = TestBed.inject(ToastrService);
    route = TestBed.inject(ActivatedRoute);
    studentService = TestBed.inject(StudentService);
    classesService = TestBed.inject(ClassesService);

    component.schoolId = 1;
    component.classId = 1;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get school', () => {
    const spy = spyOn(schoolService, 'getSchoolById').and.returnValue(
      of(school_mock)
    );
    component.getSchool();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(component.schoolId);
    expect(component.school).toEqual(school_mock);
  });

  it('should get class', () => {
    const spy = spyOn(classesService, 'getClassById').and.returnValue(
      of(class_mock)
    );
    component.getClass();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(component.classId);
    expect(component.class).toEqual(class_mock);
  });

  it('should save class', () => {
    const spy = spyOn(classesService, 'editClass').and.returnValue(of(class_mock))
    const spyBack = spyOn(component, 'back')
    const spyToastr = spyOn(toastrService, 'success')
    const payload = {
      ...component.classForm.value,
      idSchool: component.schoolId,
      id: component.classId,
    }
    component.saveClass()
    fixture.detectChanges()
    expect(spy).toHaveBeenCalledWith(component.classId, payload)
    expect(spyBack).toHaveBeenCalled()
    expect(spyToastr).toHaveBeenCalledWith('Classe criada com sucesso!')
  })

  it('should back', () => {
    const spy = spyOn(router, 'navigate')
    component.back()
    fixture.detectChanges()
    expect(spy).toHaveBeenCalledWith(['/escolas', component.schoolId, ENUM_MODE_TYPE.EDIT])
  })
});
