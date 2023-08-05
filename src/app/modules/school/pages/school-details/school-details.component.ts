import { SchoolService } from './../../services/school.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ENUM_MODE_TYPE } from 'src/app/shared/enums/mode.type.enum';
import { ISchool } from '../../models/school.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.scss'],
})
export class SchoolDetailsComponent implements OnInit {
  mode: ENUM_MODE_TYPE;
  isReadOnlyMode: boolean;
  isEditMode: boolean;

  escolaId: number;
  school!: ISchool

  schoolForm!: FormGroup

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _schoolService: SchoolService,
    private readonly _fb:FormBuilder
  ) {
    this.mode = <ENUM_MODE_TYPE>this._route.snapshot.paramMap.get('method');
    this.escolaId = Number(this._route.snapshot.paramMap.get('id'));
    this.isEditMode = this.mode == ENUM_MODE_TYPE.EDIT;
    this.isReadOnlyMode = this.mode == ENUM_MODE_TYPE.VIEW;
  }

  ngOnInit(): void {
    this.getSchool();
    this.createSchoolForm();
  }

  createSchoolForm(): void{
    this.schoolForm = this._fb.group({
      name: [
        { value: null, disabled: this.isReadOnlyMode },
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      ],
      typeInstitution: [{ value: null, disabled: this.isReadOnlyMode }, [Validators.required]],
      typeTeaching: [{ value: null, disabled: this.isReadOnlyMode }, [Validators.required]],
      typeOpeningHours: [
        { value: null, disabled: this.isReadOnlyMode },
        [Validators.required],
      ],
      cnpj: [
        { value: null, disabled: this.isReadOnlyMode },
        [Validators.required, Validators.minLength(14)],
      ],
      directorName: [
        { value: null, disabled: this.isReadOnlyMode },
        [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)+$/)],
      ],
      location: this._fb.group({
        cep: [
          { value: null, disabled: this.isReadOnlyMode },
          [Validators.required, Validators.minLength(8)],
        ],
        street: [{ value: null, disabled: true }, [Validators.required]],
        number: [{ value: null, disabled: this.isReadOnlyMode }, [Validators.required]],
        neighborhood: [{ value: null, disabled: true }, [Validators.required]],
        city: [{ value: null, disabled: true }, [Validators.required]],
        state: [{ value: null, disabled: true }, [Validators.required]],
      }),
    });
  }

  get addressForm(): FormGroup{
    return this.schoolForm.get("location") as FormGroup
  }

  getSchool(): void {
    this._schoolService.getSchoolById(this.escolaId).subscribe({
      next: (res) => {
        this.school = res;
        this.schoolForm.patchValue(this.school)
      }
    })
  }
}
