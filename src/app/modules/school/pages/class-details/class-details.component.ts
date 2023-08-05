import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ENUM_MODE_TYPE } from 'src/app/shared/enums/mode.type.enum';
import { ISchool } from '../../models/school.model';
import { IStudent } from '../../models/students.model';
import { SchoolService } from '../../services/school.service';
import { IClass } from '../../models/class.model';
import { finalize } from 'rxjs';
import { ClassesService } from '../../services/classes.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
})
export class ClassDetailsComponent implements OnInit {
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
    private readonly _fb: FormBuilder
  ) {
    this.mode = <ENUM_MODE_TYPE>(
      this._route.snapshot.paramMap.get('classMethod')
    );
    this.classId = Number(this._route.snapshot.paramMap.get('classId'));
    this.schoolId = Number(this._route.snapshot.paramMap.get('id'));
    this.isEditMode = this.mode == ENUM_MODE_TYPE.EDIT;
    this.isReadOnlyMode = this.mode == ENUM_MODE_TYPE.VIEW;
  }

  ngOnInit(): void {
    this.createClassForm();
    this.getSchool();
    this.getClass();
  }
  createClassForm(): void {
    this.classForm = this._fb.group({
      typeTeaching: [{ value: null, disabled: this.isReadOnlyMode }, [Validators.required]],
      series: [{ value: null, disabled: this.isReadOnlyMode }, [Validators.required]],
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

  saveClass(){

  }

  back(): void{
    this._router.navigate(["/escolas", this.schoolId, ENUM_MODE_TYPE.EDIT])
  }
}
