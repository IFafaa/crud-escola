import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SchoolService } from './../../services/school.service';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { IClass } from '../../models/class.model';
import { IStudent } from '../../models/students.model';
import { ISchool } from '../../models/school.model';
import { ENUM_STATUS_LIST } from 'src/app/shared/enums/status-list.enum';
import { Formatters } from 'src/app/core/helpers/formatters';
import { ClassAddComponent } from '../class-add/class-add.component';
import { ENUM_SERIES_TYPE } from 'src/app/shared/enums/series.type.enum';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-school-details-classes',
  templateUrl: './school-details-classes.component.html',
  styleUrls: ['./school-details-classes.component.scss'],
})
export class SchoolDetailsClassesComponent implements OnInit {
  @Input() school!: ISchool;
  @Input() isReadOnlyMode!: boolean
  @Input() isEditMode!: boolean
  @Output() changeClassCallback: EventEmitter<null> = new EventEmitter()

  classes: IClass[] = [];
  ENUM_STATUS_LIST = ENUM_STATUS_LIST;
  statusList: ENUM_STATUS_LIST = ENUM_STATUS_LIST.IDLE;

  constructor(
    private readonly _schoolService: SchoolService,
    private readonly _matDialog: MatDialog,
    private readonly _confirmDialog: ConfirmDialogService,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses(): void {
    this.statusList = ENUM_STATUS_LIST.IDLE;
    this._schoolService.getClasses(this.school.id)
    .pipe(finalize(() => this.changeClassCallback.emit()))
    .subscribe({
      next: (res) => {
        this.classes = res;
        if (!this.classes.length) {
          this.statusList = ENUM_STATUS_LIST.NOTFOUND;
        }
      },
      error: () => {
        this.statusList = ENUM_STATUS_LIST.ERROR;
      },
    });
  }

  formatTypeTeaching(idTypeTeaching: number): string {
    return Formatters.formatTypeTeaching(idTypeTeaching);
  }

  formatOpeningHours(idOpeningHours: number): string {
    return Formatters.formatOpeningHours(idOpeningHours);
  }

  formatClassName(className: string, series: ENUM_SERIES_TYPE): string {
    return Formatters.formatClassName(className, series);
  }

  createClass(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      position: {
        right: '0',
        top: '0',
      },
      minHeight: '100vh',
      maxWidth: '420px',
      data: this.school,
    };
    this._matDialog
      .open(ClassAddComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.getClasses();
      });
  }
  viewClass(id: number): void {}
  editClass(id: number): void {}
  deleteClass(id: number): void {
    const titleDialog = 'Deletar Classe';
    const descDialog = 'Você realmente deseja deletar essa classe?';
    this._confirmDialog.confirm(titleDialog, descDialog, () => {
      this._schoolService
        .deleteClass(id)
        .pipe(finalize(() => this.getClasses()))
        .subscribe({
          next: (res) => {
            this._toastr.success("Classe deletada com sucesso!")
          },
        });
    });
  }
}
