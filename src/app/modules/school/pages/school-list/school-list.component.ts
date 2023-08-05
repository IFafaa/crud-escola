import { SchoolService } from './../../services/school.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SchoolAddComponent } from '../../components/school-add/school-add.component';
import { ISchool } from '../../models/school.model';
import { ENUM_SCHOOL_TYPE } from 'src/app/shared/enums/school-type.enum';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { ENUM_STATUS_LIST } from 'src/app/shared/enums/status-list.enum';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { ENUM_MODE_TYPE } from 'src/app/shared/enums/mode.type.enum';
import { Formatters } from 'src/app/core/helpers/formatters';
import { ToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss'],
})
export class SchoolListComponent implements OnInit {
  schools: ISchool[] = [];
  public ENUM_STATUS_LIST = ENUM_STATUS_LIST;
  statusList: ENUM_STATUS_LIST = ENUM_STATUS_LIST.IDLE;

  showFilter: boolean = false;

  constructor(
    private readonly _router: Router,
    private readonly _matDialog: MatDialog,
    private readonly _schoolService: SchoolService,
    private readonly _confirmDialog: ConfirmDialogService,
    private readonly _toastr: ToastrService,
    private readonly _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getSchools();
  }

  registerSchool(): void {
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
      .open(SchoolAddComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.getSchools();
      });
  }

  getSchools(filters: ISchool | null = null): void {
    this.statusList = ENUM_STATUS_LIST.IDLE;
    this._schoolService.getSchools(filters).subscribe({
      next: (res) => {
        this.schools = res;
        if (!this.schools.length) {
          this.statusList = ENUM_STATUS_LIST.NOTFOUND;
        }
      },
      error: (err) => {
        this.statusList = ENUM_STATUS_LIST.ERROR;
      },
    });
  }

  formatSchoolType(schoolType: ENUM_SCHOOL_TYPE): string {
    return Formatters.formatSchoolType(schoolType);
  }

  deleteSchool(id: number): void {
    const titleDialog = 'Deletar Escola';
    const descDialog = 'Você realmente deseja deletar essa escola?';
    this._confirmDialog.confirm(titleDialog, descDialog, () => {
      this._schoolService
        .deleteSchool(id)
        .pipe(finalize(() => this.getSchools()))
        .subscribe({
          next: (res) => {
            this._toastr.success("Escola deletada com sucesso!")
          },
        });
    });
  }


  editSchool(id: number): void {
    this._router.navigate(['/escolas', id, ENUM_MODE_TYPE.EDIT]);
  }

  viewSchool(id: number): void {
    this._router.navigate(['/escolas', id, ENUM_MODE_TYPE.VIEW]);
  }
}
