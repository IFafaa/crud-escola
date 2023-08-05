import { ISelect } from '../../models/select.model';
import { SchoolService } from './../../services/school.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.scss'],
})
export class SchoolFormComponent implements OnInit {
  typeSchools: ISelect[] = [];
  typeTeaching: ISelect[] = [];
  typeOpeningHours: ISelect[] = [];

  constructor(
    private _schoolService: SchoolService
    ) {}

  ngOnInit(): void {
    this.getTypeSchool();
    this.getTypeTeaching();
    this.getTypeOpeningHours();
  }

  getTypeSchool(): void {
    this._schoolService.typeSchool().subscribe({
      next: (res) => {
        this.typeSchools = res;
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
