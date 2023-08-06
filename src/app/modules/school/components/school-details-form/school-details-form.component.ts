import { Formatters } from './../../../../core/helpers/formatters';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ISelect } from '../../models/select.model';
import { SchoolService } from '../../services/school.service';
import { ENUM_TEACHING_TYPE } from 'src/app/shared/enums/teaching-type.enum';
import { ENUM_OPENING_HOURS_TYPE } from 'src/app/shared/enums/opening-hours-type.enum';

@Component({
  selector: 'app-school-details-form',
  templateUrl: './school-details-form.component.html',
  styleUrls: ['./school-details-form.component.scss'],
})
export class SchoolDetailsFormComponent implements OnInit {
  @Input() isReadOnlyMode!: boolean;
  @Input() isEditMode!: boolean;
  @Input() form!: FormGroup;

  typeInstitution: ISelect[] = [];
  typeTeaching: ISelect[] = [];
  typeOpeningHours: ISelect[] = [];

  address: string = '';

  constructor(
    private readonly _schoolService: SchoolService,
    public readonly Formatters: Formatters
  ) {
    // TO TEST
    if (!this.form) {
      this.form = new FormGroup({
        name: new FormControl(''),
        typeInstitution: new FormControl(''),
        typeTeaching: new FormControl(''),
        typeOpeningHours: new FormControl(''),
        cnpj: new FormControl(''),
        directorName: new FormControl(''),
        location: new FormGroup({
          cep: new FormControl(''),
          street: new FormControl(''),
          number: new FormControl(''),
          neighborhood: new FormControl(''),
          city: new FormControl(''),
          state: new FormControl(''),
        }),
      });
    }
  }

  ngOnInit(): void {
    this.getTypeInstitution();
    this.getTypeTeaching();
    this.getTypeOpeningHours();
  }

  getTypeInstitution(): void {
    this._schoolService.typeInstitution().subscribe({
      next: (res) => {
        this.typeInstitution = res;
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
    this._schoolService.typeOpeningHours().subscribe({
      next: (res) => {
        this.typeOpeningHours = res;
      },
    });
  }

  formatTypeTeaching(idTypeTeaching: ENUM_TEACHING_TYPE): string {
    return Formatters.formatTypeTeaching(idTypeTeaching);
  }

  formatOpeningHours(idOpeningHours: ENUM_OPENING_HOURS_TYPE): string {
    return Formatters.formatOpeningHours(idOpeningHours);
  }
}
