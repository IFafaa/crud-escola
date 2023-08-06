import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SchoolService } from '../../services/school.service';
import { Filters } from 'src/app/core/helpers/filters';
import { ISelect } from '../../models/select.model';
import { IClass } from '../../models/class.model';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-class-filter',
  templateUrl: './class-filter.component.html',
  styleUrls: ['./class-filter.component.scss'],
})
export class ClassFilterComponent implements OnInit {
  @Output() searchCallback: EventEmitter<IClass> = new EventEmitter();

  form!: FormGroup;

  typeTeaching: ISelect[] = [];
  typeOpeningHours: ISelect[] = [];
  series: ISelect[] = [];

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _schoolService: SchoolService,
    private readonly _seriesService: SeriesService
  ) {}

  ngOnInit(): void {
    this.getTypeTeaching();
    this.getTypeOpeningHours();
    this.createForm();
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

  createForm(): void {
    this.form = this._fb.group({
      name: [null],
      series: [null],
      typeTeaching: [null],
      typeOpeningHours: [null],
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

  search(): void {
    const filters: IClass = Filters.adjustObjLike(
      Filters.removeNullUndefinedKeys({ ...this.form.value })
    );
    this.searchCallback.emit(filters);
  }
}
