import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SchoolAddComponent } from '../../components/school-add/school-add.component';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss'],
})
export class SchoolListComponent {
  constructor(private _router: Router, private _matDialog: MatDialog) {}

  registerSchool(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      position: {
        right: '0',
        top: '0',
      },
      minHeight: '100vh',
      maxWidth: "420px"
    };

    this._matDialog.open(SchoolAddComponent, dialogConfig);
  }

  addFilters(): void {
    alert('em dev');
  }
}
