import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolListComponent } from './school-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { SchoolService } from '../../services/school.service';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { SchoolAddComponent } from '../../components/school-add/school-add.component';
import { of, throwError } from 'rxjs';
import { school_mock, schools_mock } from 'src/app/core/mocks/school.mock';
import { ENUM_STATUS_LIST } from 'src/app/shared/enums/status-list.enum';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { ENUM_MODE_TYPE } from 'src/app/shared/enums/mode.type.enum';

describe('SchoolListComponent', () => {
  let component: SchoolListComponent;
  let fixture: ComponentFixture<SchoolListComponent>;
  let matDialog: MatDialog;
  let dialogSpy: jasmine.Spy;
  let router: Router;
  let schoolService: SchoolService;
  let confirmDialog: ConfirmDialogService;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolListComponent],
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
      ],
    });
    fixture = TestBed.createComponent(SchoolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    matDialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
    schoolService = TestBed.inject(SchoolService);
    confirmDialog = TestBed.inject(ConfirmDialogService);
    toastrService = TestBed.inject(ToastrService);

    dialogSpy = spyOn(matDialog, 'open').and.returnValue({
      afterClosed: () => of('dialog closed'),
    } as MatDialogRef<SchoolAddComponent>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog on registerSchool', () => {
    component.registerSchool();
    fixture.detectChanges();

    expect(dialogSpy).toHaveBeenCalledOnceWith(
      SchoolAddComponent,
      jasmine.any(Object)
    );
  });

  it('should call getSchools after the dialog is closed', () => {
    const getSchoolsSpy = spyOn(component, 'getSchools');

    component.registerSchool();
    fixture.detectChanges();

    expect(getSchoolsSpy).toHaveBeenCalled();
  });

  it('should get schools case 1', () => {
    const spy = spyOn(schoolService, 'getSchools').and.returnValue(
      of(schools_mock)
    );
    component.getSchools();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.schools).toEqual(schools_mock);
    expect(component.statusList).toEqual(ENUM_STATUS_LIST.IDLE);
  });

  it('should get schools case 2', () => {
    const spy = spyOn(schoolService, 'getSchools').and.returnValue(of([]));
    component.getSchools();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.schools).toEqual([]);
    expect(component.statusList).toEqual(ENUM_STATUS_LIST.NOTFOUND);
  });

  it('should get schools case 2', () => {
    const spy = spyOn(schoolService, 'getSchools').and.returnValue(
      throwError('error')
    );
    component.getSchools();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.statusList).toEqual(ENUM_STATUS_LIST.ERROR);
  });

  it('should call confirm dialog before deleting the school', () => {
    const mockId = 1;
    const confirmDialogSpy = spyOn(confirmDialog, 'confirm').and.callFake(
      (title, desc, callback) => {
        callback();
      }
    );

    component.deleteSchool(mockId);

    expect(confirmDialogSpy).toHaveBeenCalledOnceWith(
      'Deletar Escola',
      'Você realmente deseja deletar essa escola?',
      jasmine.any(Function)
    );
  });

  it('should call schoolService.deleteSchool and show toastr on successful deletion', () => {
    const mockId = 1;
    spyOn(confirmDialog, 'confirm').and.callFake((title, desc, callback) => {
      callback();
    });
    const deleteSchoolSpy = spyOn(
      schoolService,
      'deleteSchool'
    ).and.returnValue(of(school_mock));
    const toastrSuccessSpy = spyOn(toastrService, 'success');

    component.deleteSchool(mockId);

    expect(deleteSchoolSpy).toHaveBeenCalledOnceWith(mockId);
    expect(toastrSuccessSpy).toHaveBeenCalledOnceWith(
      'Escola deletada com sucesso!'
    );
  });

  it('should not call schoolService.deleteSchool or show toastr on cancel', () => {
    const mockId = 1;
    spyOn(confirmDialog, 'confirm').and.callFake((title, desc, callback) => {});
    const deleteSchoolSpy = spyOn(schoolService, 'deleteSchool');
    const toastrSuccessSpy = spyOn(toastrService, 'success');

    component.deleteSchool(mockId);

    expect(deleteSchoolSpy).not.toHaveBeenCalled();
    expect(toastrSuccessSpy).not.toHaveBeenCalled();
  });

  it('should edit school', () => {
    const spy = spyOn(router, 'navigate');
    component.editSchool(1);
    fixture.detectChanges()
    expect(spy).toHaveBeenCalledWith(['/escolas', 1, ENUM_MODE_TYPE.EDIT])
  });

  it('should view school', () => {
    const spy = spyOn(router, 'navigate');
    component.viewSchool(1);
    fixture.detectChanges()
    expect(spy).toHaveBeenCalledWith(['/escolas', 1, ENUM_MODE_TYPE.VIEW])
  });
});
