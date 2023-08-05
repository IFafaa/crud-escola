import { Component, Input } from '@angular/core';
import { IClass } from '../../models/class.model';
import { IStudent } from '../../models/students.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-school-details-capacity',
  templateUrl: './school-details-capacity.component.html',
  styleUrls: ['./school-details-capacity.component.scss']
})
export class SchoolDetailsCapacityComponent {
  @Input() classes: IClass[] = []
  @Input() students: IStudent[] = []

  qntClassesControl: FormControl = new FormControl(this.classes.length)
  qntStudentsControl: FormControl = new FormControl(this.students.length)

}
