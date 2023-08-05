import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IClass } from '../../models/class.model';
import { ISchool } from '../../models/school.model';
import { ISelect } from '../../models/select.model';
import { ISerie } from '../../models/serie.model';
import { SchoolService } from '../../services/school.service';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-class-details-form',
  templateUrl: './class-details-form.component.html',
  styleUrls: ['./class-details-form.component.scss'],
})
export class ClassDetailsFormComponent implements OnInit {
  @Input() school!: ISchool;
  @Input() form!: FormGroup;
  typeTeaching: ISelect[] = [];
  typeOpeningHours: ISelect[] = [];
  series: ISerie[] = [];

  constructor(
    private readonly _schoolService: SchoolService,
    private readonly _seriesService: SeriesService,
    private readonly _fb: FormBuilder,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTeaching();
    this.getOpeningHours();
    this.getSeries();
  }

  getTeaching(): void {
    this._schoolService.typeTeaching().subscribe({
      next: (res) => {
        this.typeTeaching = res.filter((typeTeaching) =>
          this.school.typeTeaching.includes(typeTeaching.id)
        );
      },
    });
  }

  getOpeningHours(): void {
    this._schoolService.typeOpeningHours().subscribe({
      next: (res) => {
        this.typeOpeningHours = res.filter((typeOpeningHours) =>
          this.school.typeOpeningHours.includes(typeOpeningHours.id)
        );
      },
    });
  }

  selectTeachingChange(): void {
    this.form.get('series')?.setValue(null);
    this.getSeries();
  }

  getSeries(): void {
    let control = this.form.get('typeTeaching');
    if (control?.value !== null) {
      this._seriesService.getSeries(control?.value).subscribe({
        next: (res) => {
          this.series = res;
        },
      });
    }
  }

}
