import { ISelect } from '../../models/select.model';
import { SchoolService } from './../../services/school.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.scss'],
})
export class SchoolFormComponent implements OnInit {
  typeInstitutions: ISelect[] = [];
  typeTeaching: ISelect[] = [];
  typeOpeningHours: ISelect[] = [];

  constructor(
    private _schoolService: SchoolService
    ) {}

  ngOnInit(): void {
    this.getTypeInstitution();
    this.getTypeTeaching();
    this.getTypeOpeningHours();
  }

  getTypeInstitution(): void {
    this._schoolService.typeInstitution().subscribe({
      next: (res) => {
        this.typeInstitutions = res;
      },
    });
  }

  getTypeTeaching(): void {
    this._schoolService.typeTeaching().subscribe({
      next: (res) => {
        this.typeTeaching = res;
      },
    });
  }

  getTypeOpeningHours(): void {
    this._schoolService.typeTeaching().subscribe({
      next: (res) => {
        this.typeOpeningHours = res;
      },
    });
  }
}
