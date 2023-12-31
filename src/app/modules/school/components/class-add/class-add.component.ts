import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISelect } from '../../models/select.model';
import { SchoolService } from '../../services/school.service';
import { ISchool } from '../../models/school.model';
import { ISerie } from '../../models/serie.model';
import { IClass } from '../../models/class.model';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { ClassesService } from '../../services/classes.service';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-class-add',
  templateUrl: './class-add.component.html',
  styleUrls: ['./class-add.component.scss'],
})
export class ClassAddComponent implements OnInit {
  typeTeaching: ISelect[] = [];
  typeOpeningHours: ISelect[] = [];
  series: ISerie[] = [];

  form!: FormGroup;

  constructor(
    private readonly _schoolService: SchoolService,
    private readonly _classesService: ClassesService,
    private readonly _seriesService: SeriesService,
    private readonly _fb: FormBuilder,
    private readonly _ref: MatDialogRef<ClassAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISchool,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getTeaching();
    this.getOpeningHours();
  }

  createForm(): void {
    this.form = this._fb.group({
      typeTeaching: [{ value: null, disabled: false }, [Validators.required]],
      series: [{ value: null, disabled: true }, [Validators.required]],
      name: [
        { value: null, disabled: false },
        [Validators.required, Validators.pattern(/^[A-Z]+$/)],
      ],
      typeOpeningHours: [
        { value: null, disabled: false },
        [Validators.required],
      ],
    });
  }

  getTeaching(): void {
    this._schoolService.typeTeaching().subscribe({
      next: (res) => {
        this.typeTeaching = res.filter((typeTeaching) =>
          this.data.typeTeaching.includes(typeTeaching.id)
        );
      },
    });
  }

  getOpeningHours(): void {
    this._schoolService.typeOpeningHours().subscribe({
      next: (res) => {
        this.typeOpeningHours = res.filter((typeOpeningHours) =>
          this.data.typeOpeningHours.includes(typeOpeningHours.id)
        );
      },
    });
  }

  selectTeachingChange() {
    this.form.get('series')?.disable();
    let control = this.form.get('typeTeaching');
    if (control?.value !== null) {
      this.form.get('series')?.enable();
      this._seriesService.getSeries(control?.value).subscribe({
        next: (res) => {
          this.series = res;
        },
      });
    }
  }

  create(): void {
    const payload: IClass = {
      ...this.form.value,
      idSchool: this.data.id,
    };
    this._classesService.createClass(payload).subscribe({
      next: (res) => {
        this.close(true);
        this._toastr.success('Classe cadastrada com sucesso!');
      },
      error: () => {
        this._toastr.error('Houve um problema, tente novamente ou mais tarde');
      },
    });
  }

  close(created: boolean = false): void {
    this._ref.close(created);
  }
}
