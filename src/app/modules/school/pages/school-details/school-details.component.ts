import { SchoolService } from './../../services/school.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ENUM_MODE_TYPE } from 'src/app/shared/enums/mode.type.enum';
import { ISchool } from '../../models/school.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { IClass } from '../../models/class.model';
import { IStudent } from '../../models/students.model';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { cpfCnpjValidator } from 'src/app/shared/validators/cpfCnpj.validator';
import { StudentService } from '../../services/student.service';
import { ClassesService } from '../../services/classes.service';

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
  school!: ISchool;
  classes!: IClass[];
  students!: IStudent[];

  schoolForm!: FormGroup;
  qntForm!: FormGroup;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _schoolService: SchoolService,
    private readonly _studentService: StudentService,
    private readonly _classesService: ClassesService,
    private readonly _fb: FormBuilder,
    private readonly _toastr: ToastrService
  ) {
    this.mode = <ENUM_MODE_TYPE>this._route.snapshot.paramMap.get('method');
    this.escolaId = Number(this._route.snapshot.paramMap.get('id'));
    this.isEditMode = this.mode == ENUM_MODE_TYPE.EDIT;
    this.isReadOnlyMode = this.mode == ENUM_MODE_TYPE.VIEW;
  }

  ngOnInit(): void {
    this.getSchool();
    this.createSchoolForm();
    this.createQuantityForm();
  }

  createSchoolForm(): void {
    this.schoolForm = this._fb.group({
      name: [
        { value: null, disabled: this.isReadOnlyMode },
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      ],
      typeInstitution: [
        { value: null, disabled: this.isReadOnlyMode },
        [Validators.required],
      ],
      typeTeaching: [
        { value: null, disabled: this.isReadOnlyMode },
        [Validators.required],
      ],
      typeOpeningHours: [
        { value: null, disabled: this.isReadOnlyMode },
        [Validators.required],
      ],
      cnpj: [
        { value: null, disabled: this.isReadOnlyMode },
        [Validators.required, Validators.minLength(14), cpfCnpjValidator()],
      ],
      directorName: [
        { value: null, disabled: this.isReadOnlyMode },
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-zA-ZÀ-ÖØ-öø-ÿ])(?=.*\s)[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/
          ),
        ],
      ],
      location: this._fb.group({
        cep: [
          { value: null, disabled: this.isReadOnlyMode },
          [Validators.required, Validators.minLength(8)],
        ],
        street: [{ value: null, disabled: this.isReadOnlyMode }],
        number: [
          { value: null, disabled: this.isReadOnlyMode },
          [Validators.required],
        ],
        neighborhood: [{ value: null, disabled: this.isReadOnlyMode }],
        city: [{ value: null, disabled: this.isReadOnlyMode }],
        state: [{ value: null, disabled: this.isReadOnlyMode }],
      }),
    });
  }

  createQuantityForm() {
    this.qntForm = this._fb.group({
      classes: [null],
      students: [null],
    });
  }

  get addressForm(): FormGroup {
    return this.schoolForm.get('location') as FormGroup;
  }

  getSchool(): void {
    this._schoolService
      .getSchoolById(this.escolaId)
      .pipe(
        finalize(() => {
          this.getClasses();
          this.getStudents();
        })
      )
      .subscribe({
        next: (res) => {
          this.school = res;
          this.schoolForm.patchValue(this.school);
        },
      });
  }

  getClasses(): void {
    this._classesService.getClasses(this.school.id).subscribe({
      next: (res) => {
        this.classes = res;
        this.qntForm.get('classes')?.setValue(this.classes.length);
      },
    });
  }

  getStudents(): void {
    this._studentService.getStudentsBySchoolId(this.school.id).subscribe({
      next: (res) => {
        this.students = res;
        this.qntForm.get('students')?.setValue(this.students.length);
      },
    });
  }

  saveSchool(): void {
    const payload: ISchool = this.schoolForm.value;
    this._schoolService.editSchool(this.school.id, payload).subscribe({
      next: (res) => {
        this._toastr.success('Dados da escola editados com sucesso!');
        this._router.navigate(['/escolas']);
      },
    });
  }

  back(): void {
    this._router.navigate(['/escolas']);
  }
}
