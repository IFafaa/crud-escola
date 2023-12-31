import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ENUM_MODE_TYPE } from 'src/app/shared/enums/mode.type.enum';
import { ISchool } from '../../models/school.model';
import { IStudent } from '../../models/students.model';
import { SchoolService } from '../../services/school.service';
import { IClass } from '../../models/class.model';
import { finalize } from 'rxjs';
import { ClassesService } from '../../services/classes.service';
import { ToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
})
export class ClassDetailsComponent implements OnInit {
  modeClass: ENUM_MODE_TYPE;
  mode: ENUM_MODE_TYPE;
  isReadOnlyMode: boolean;
  isEditMode: boolean;

  schoolId: number;
  classId: number;

  school!: ISchool;
  class!: IClass;
  students!: IStudent[];

  classForm!: FormGroup;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _schoolService: SchoolService,
    private readonly _classesService: ClassesService,
    private readonly _fb: FormBuilder,
    private readonly _toastr: ToastrService
  ) {
    this.modeClass = <ENUM_MODE_TYPE>(
      this._route.snapshot.paramMap.get('classMethod')
    );
    this.mode = <ENUM_MODE_TYPE>(
      this._route.snapshot.paramMap.get('method')
    );
    this.classId = Number(this._route.snapshot.paramMap.get('classId'));
    this.schoolId = Number(this._route.snapshot.paramMap.get('id'));
    this.isEditMode = this.modeClass == ENUM_MODE_TYPE.EDIT;
    this.isReadOnlyMode = this.modeClass == ENUM_MODE_TYPE.VIEW;
  }

  ngOnInit(): void {
    this.createClassForm();
    this.getSchool();
    this.getClass();
  }
  createClassForm(): void {
    this.classForm = this._fb.group({
      typeTeaching: [
        { value: null, disabled: this.isReadOnlyMode },
        [Validators.required],
      ],
      series: [
        { value: null, disabled: this.isReadOnlyMode },
        [Validators.required],
      ],
      name: [
        { value: null, disabled: this.isReadOnlyMode },
        [Validators.required, Validators.pattern(/^[A-Z]+$/)],
      ],
      typeOpeningHours: [
        { value: null, disabled: this.isReadOnlyMode },
        [Validators.required],
      ],
    });
  }

  getSchool(): void {
    this._schoolService.getSchoolById(this.schoolId).subscribe({
      next: (res) => {
        this.school = res;
      },
    });
  }

  getClass(): void {
    this._classesService
      .getClassById(this.classId)
      .pipe(
        finalize(() => {
          this.classForm.patchValue(this.class);
        })
      )
      .subscribe({
        next: (res) => {
          this.class = res;
        },
      });
  }

  saveClass() {
    const payload: IClass = {
      ...this.classForm.value,
      idSchool: this.schoolId,
      id: this.classId,
    };
    this._classesService.editClass(this.classId, payload).subscribe({
      next: () => {
        this.back();
        this._toastr.success('Classe criada com sucesso!');
      },
    });
  }

  back(): void {
    this._router.navigate(['/escolas', this.schoolId, this.mode]);
  }
}
