import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { SchoolDetailsClassesComponent } from './school-details-classes.component';
import { ENUM_MODE_TYPE } from 'src/app/shared/enums/mode.type.enum';
import { ClassesService } from '../../services/classes.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { Router } from '@angular/router';
import { ISchool } from '../../models/school.model';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ClassAddComponent } from '../class-add/class-add.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { school_mock } from 'src/app/core/mocks/school.mock';
import { class_mock, classes_mock } from 'src/app/core/mocks/class.mock';
import { ENUM_STATUS_LIST } from 'src/app/shared/enums/status-list.enum';

describe('SchoolDetailsClassesComponent', () => {
  let component: SchoolDetailsClassesComponent;
  let fixture: ComponentFixture<SchoolDetailsClassesComponent>;
  let classesService: ClassesService;
  let matDialog: MatDialog;
  let dialogSpy: jasmine.Spy;
  let confirmDialog: ConfirmDialogService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolDetailsClassesComponent],
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
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolDetailsClassesComponent);
    component = fixture.componentInstance;
    classesService = TestBed.inject(ClassesService);
    matDialog = TestBed.inject(MatDialog);
    confirmDialog = TestBed.inject(ConfirmDialogService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
    dialogSpy = spyOn(matDialog, 'open').and.returnValue({
      afterClosed: () => of('dialog closed'),
    } as MatDialogRef<ClassAddComponent>);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get classes', () => {
    const spy = spyOn(component, 'getClasses');
    component.school = school_mock;
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should get classes case 1', () => {
    const spy = spyOn(classesService, 'getClasses').and.returnValue(
      of(classes_mock)
    );
    component.school = school_mock;
    component.getClasses();

    expect(spy).toHaveBeenCalledWith(school_mock.id, {});
    expect(component.classes).toEqual(classes_mock);
    expect(component.statusList).toEqual(ENUM_STATUS_LIST.IDLE);
  });

  it('should get classes case 2', () => {
    const spy = spyOn(classesService, 'getClasses').and.returnValue(of([]));
    component.school = school_mock;
    component.getClasses();

    expect(spy).toHaveBeenCalledWith(school_mock.id, {});
    expect(component.classes).toEqual([]);
    expect(component.statusList).toEqual(ENUM_STATUS_LIST.NOTFOUND);
  });

  it('should get classes case 3', () => {
    const spy = spyOn(classesService, 'getClasses').and.returnValue(
      throwError('erro')
    );
    component.school = school_mock;
    component.getClasses();

    expect(spy).toHaveBeenCalledWith(school_mock.id, {});
    expect(component.statusList).toEqual(ENUM_STATUS_LIST.ERROR);
  });

  it('should call viewClass and navigate on viewClass()', () => {
    const classId = 123;
    component.school = { id: 456 } as ISchool;
    component.viewClass(classId);
    expect(router.navigate).toHaveBeenCalledWith([
      '/escolas/classe',
      456,
      component.mode,
      classId,
      ENUM_MODE_TYPE.VIEW,
    ]);
  });

  it('should call editClass and navigate on editClass()', () => {
    const classId = 123;
    component.school = { id: 456 } as ISchool;
    component.editClass(classId);
    expect(router.navigate).toHaveBeenCalledWith([
      '/escolas/classe',
      456,
      component.mode,
      classId,
      ENUM_MODE_TYPE.EDIT,
    ]);
  });

  it('should call confirm dialog before deleting the class', () => {
    const mockId = 1;
    const confirmDialogSpy = spyOn(confirmDialog, 'confirm').and.callFake(
      (title, desc, callback) => {
        callback();
      }
    );

    component.deleteClass(mockId);

    expect(confirmDialogSpy).toHaveBeenCalledOnceWith(
      'Deletar Classe',
      'Você realmente deseja deletar essa classe?',
      jasmine.any(Function)
    );
  });

  it('should call classesService.deleteClass and show toastr on successful deletion', () => {
    const mockId = 1;
    spyOn(confirmDialog, 'confirm').and.callFake((title, desc, callback) => {
      callback();
    });
    const deleteClassSpy = spyOn(classesService, 'deleteClass').and.returnValue(
      of(class_mock)
    );
    const toastrSuccessSpy = spyOn(toastrService, 'success');

    component.deleteClass(mockId);

    expect(deleteClassSpy).toHaveBeenCalledOnceWith(mockId);
    expect(toastrSuccessSpy).toHaveBeenCalledOnceWith(
      'Classe deletada com sucesso!'
    );
  });

  it('should not call classesService.deleteClass or show toastr on cancel', () => {
    const mockId = 1;
    spyOn(confirmDialog, 'confirm').and.callFake((title, desc, callback) => {});
    const deleteClassSpy = spyOn(classesService, 'deleteClass');
    const toastrSuccessSpy = spyOn(toastrService, 'success');

    component.deleteClass(mockId);

    expect(deleteClassSpy).not.toHaveBeenCalled();
    expect(toastrSuccessSpy).not.toHaveBeenCalled();
  });

  it('should format type teaching', () => {
    expect(component.formatTypeTeaching(1)).toEqual('Ensino Fundamental I');
  });

  it('should format openingHours', () => {
    expect(component.formatOpeningHours(1)).toEqual('Tarde');
  });

  it('should format class name', () => {
    expect(component.formatClassName('A', 1)).toEqual('Maternal I - A');
  });
});
