import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { cpfCnpjValidator } from 'src/app/shared/validators/cpfCnpj.validator';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private readonly _fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.form = this._fb.group({
      name: [
        { value: null, disabled: false },
        [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)+$/)],
      ],
      age: [{ value: null, disabled: false }, [Validators.required]],
      cpf: [
        { value: null, disabled: false },
        [Validators.required, cpfCnpjValidator(), Validators.minLength(11)],
      ],
    });
  }

  create(): void {}
}
