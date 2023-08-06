import { IClass } from './../../models/class.model';
import { StudentService } from './../../services/student.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ENUM_STATUS_LIST } from 'src/app/shared/enums/status-list.enum';
import { IStudent } from '../../models/students.model';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';
import { ISchool } from '../../models/school.model';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { Export } from 'src/app/core/helpers/export';
import { ClassesService } from '../../services/classes.service';
import { Formatters } from 'src/app/core/helpers/formatters';

@Component({
  selector: 'app-class-details-students',
  templateUrl: './class-details-students.component.html',
  styleUrls: ['./class-details-students.component.scss'],
})
export class ClassDetailsStudentsComponent implements OnInit {
  @Input() isEditMode!: boolean;
  @Input() isReadOnlyMode!: boolean;
  @Input() schoolId!: number;
  @Input() classId!: number;
  @Input() class!: IClass;
  students: IStudent[] = [];
  pageIndex: number = 0;

  showFilter: boolean = false;

  ENUM_STATUS_LIST = ENUM_STATUS_LIST;
  statusList = ENUM_STATUS_LIST.IDLE;

  constructor(
    private readonly _matDialog: MatDialog,
    private readonly _studentsService: StudentService,
    private readonly _classesService: ClassesService,
    private readonly _confirmDialog: ConfirmDialogService,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  createEditStudent(idStudent?: number): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      position: {
        right: '0',
        top: '0',
      },
      minHeight: '100vh',
      maxWidth: '420px',
      data: {
        schoolId: this.schoolId,
        classId: this.classId,
        studentId: idStudent,
      },
    };
    this._matDialog
      .open(StudentFormComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.getStudents();
      });
  }

  getStudents(filter: IStudent | {} = {}): void {
    this.statusList = ENUM_STATUS_LIST.IDLE;
    this._studentsService.getStudentsByClassId(this.classId, filter).subscribe({
      next: (res) => {
        this.students = res;
        if (!this.students.length) {
          this.statusList = ENUM_STATUS_LIST.NOTFOUND;
        }
      },
      error: () => {
        this.statusList = ENUM_STATUS_LIST.ERROR;
      },
    });
  }

  deleteStudent(id: number): void {
    const titleDialog = 'Deletar Estudante';
    const descDialog = 'Você realmente deseja deletar essa estudante?';
    this._confirmDialog.confirm(titleDialog, descDialog, () => {
      this._studentsService
        .deleteStudent(id)
        .pipe(finalize(() => this.getStudents()))
        .subscribe({
          next: (res) => {
            this._toastr.success('Estudante deletado com sucesso!');
          },
        });
    });
  }

  exportStudents(): void {
    const array = this.students.map((student) => ({
      name: student.name,
      age: student.age,
      cpf: student.cpf,
    }));
    const filename = Formatters.formatClassName(
      this.class.name,
      this.class.series
    );
    Export.exportToCsv(array, filename);
  }
}
