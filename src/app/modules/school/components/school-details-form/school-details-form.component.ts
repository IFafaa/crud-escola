import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CepService } from 'src/app/core/services/cep.service';
import { ISelect } from '../../models/select.model';
import { SchoolService } from '../../services/school.service';
import { ISchool } from '../../models/school.model';

@Component({
  selector: 'app-school-details-form',
  templateUrl: './school-details-form.component.html',
  styleUrls: ['./school-details-form.component.scss'],
})
export class SchoolDetailsFormComponent implements OnInit {
  @Input() isReadOnlyMode!: boolean;
  @Input() isEditMode!: boolean;
  @Input() form!: FormGroup

  typeInstitution: ISelect[] = [];
  typeTeaching: ISelect[] = [];
  typeOpeningHours: ISelect[] = [];


  address: string = '';

  constructor(
    private readonly _schoolService: SchoolService,
    private readonly _fb: FormBuilder,
    private readonly _cepService: CepService,
    private readonly _toastr: ToastrService
  ) {}

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
}
