import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SchoolService } from '../../services/school.service';
import { ISelect } from '../../models/select.model';
import { ISchool } from '../../models/school.model';
import { Filters } from 'src/app/core/helpers/filters';

@Component({
  selector: 'app-schools-filter',
  templateUrl: './schools-filter.component.html',
  styleUrls: ['./schools-filter.component.scss'],
})
export class SchoolsFilterComponent implements OnInit {
  @Output() searchCallback: EventEmitter<ISchool> = new EventEmitter();

  form!: FormGroup;
  typeInstitution: ISelect[] = [];

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _schoolService: SchoolService
  ) {}

  ngOnInit(): void {
    this.getTypeInstitution();
    this.createForm();
  }

  getTypeInstitution(): void {
    this._schoolService.typeInstitution().subscribe({
      next: (res) => {
        this.typeInstitution = res;
      },
    });
  }
  createForm(): void {
    this.form = this._fb.group({
      name: [null],
      directorName: [null],
      typeInstitution: [null],
    });
  }
  search(): void {
    const filters: ISchool = Filters.adjustObjLike(
      Filters.removeNullUndefinedKeys({ ...this.form.value })
    );
    console.log('filters', filters);

    this.searchCallback.emit(filters);
  }
}
