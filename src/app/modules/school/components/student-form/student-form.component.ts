import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { cpfCnpjValidator } from 'src/app/shared/validators/cpfCnpj.validator';
import { StudentService } from '../../services/student.service';
import { IStudent } from '../../models/students.model';
import { ToastrService } from 'src/app/core/services/toastr.service';

interface IStudentFormMat {
  schoolId: number;
  classId: number;
  studentId?: number;
}
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  form!: FormGroup;
  isEdit: boolean;
  isCreate: boolean;
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _studentService: StudentService,
    private readonly _ref: MatDialogRef<StudentFormComponent>,
    private readonly _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: IStudentFormMat
  ) {
    this.isEdit = this.data.studentId !== undefined;
    this.isCreate = !this.data.studentId;
  }

  ngOnInit(): void {
    this.createForm();
    this.getStudent();
  }
  createForm(): void {
    this.form = this._fb.group({
      name: [
        { value: null, disabled: false },
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-zA-ZÀ-ÖØ-öø-ÿ])(?=.*\s)[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/
          ),
        ],
      ],
      age: [{ value: null, disabled: false }, [Validators.required]],
      cpf: [
        { value: null, disabled: false },
        [Validators.required, cpfCnpjValidator(), Validators.minLength(11)],
      ],
    });
  }

  getStudent() {
    if (this.isCreate) return;
    this._studentService.getStudentsById(this.data.studentId!).subscribe({
      next: (res) => {
        this.form.patchValue(res);
      },
    });
  }

  create(): void {
    const payload: IStudent = {
      ...this.form.value,
      idClass: this.data.classId,
      idSchool: this.data.schoolId,
    };
    this._studentService.createStudent(payload).subscribe({
      next: (res) => {
        this._toastr.success('Estudante criado com sucesso!');
        this.close();
      },
    });
  }

  edit(): void {
    let payload: IStudent = this.form.value;
    payload = {
      ...payload,
      idClass: this.data.classId,
      idSchool: this.data.schoolId,
    };
    this._studentService.editStudent(this.data.studentId!, payload).subscribe({
      next: (res) => {
        this._toastr.success('Estudante editado com sucesso!');
        this.close();
      },
    });
  }

  close(): void {
    this._ref.close();
  }
}
