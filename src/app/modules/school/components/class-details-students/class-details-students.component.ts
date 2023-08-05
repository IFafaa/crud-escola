import { Component, Input, OnInit } from '@angular/core';
import { ENUM_STATUS_LIST } from 'src/app/shared/enums/status-list.enum';
import { IStudent } from '../../models/students.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-class-details-students',
  templateUrl: './class-details-students.component.html',
  styleUrls: ['./class-details-students.component.scss'],
})
export class ClassDetailsStudentsComponent implements OnInit {
  @Input() isEditMode!: boolean;
  @Input() isReadOnlyMode!: boolean;
  students: IStudent[] = []

  ENUM_STATUS_LIST = ENUM_STATUS_LIST
  statusList = ENUM_STATUS_LIST.IDLE

  constructor(
    private readonly _matDialog: MatDialog
  ) {}

  ngOnInit(): void {

  }

  createStudent(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      position: {
        right: '0',
        top: '0',
      },
      minHeight: '100vh',
      maxWidth: '420px',
    };
    this._matDialog
      .open(StudentFormComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        // this.getStudents();
      });
  }
  deleteStudent(id: number): void{

  }
  editStudent(id: number): void{

  }
  viewStudent(id: number): void{

  }
}
