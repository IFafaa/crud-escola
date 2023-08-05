import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filters } from 'src/app/core/helpers/filters';
import { IStudent } from '../../models/students.model';

@Component({
  selector: 'app-student-filter',
  templateUrl: './student-filter.component.html',
  styleUrls: ['./student-filter.component.scss'],
})
export class StudentFilterComponent implements OnInit {
  form!: FormGroup;
  @Output() searchCallback: EventEmitter<IStudent> = new EventEmitter();

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this._fb.group({
      name: [null],
      age: [null],
      cpf: [null],
    });
  }

  search(): void {
    const filters: IStudent = Filters.adjustObjLike(
      Filters.removeNullUndefinedKeys({ ...this.form.value })
    );
    this.searchCallback.emit(filters);
  }

}
