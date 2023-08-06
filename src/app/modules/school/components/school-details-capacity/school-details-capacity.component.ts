import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-school-details-capacity',
  templateUrl: './school-details-capacity.component.html',
  styleUrls: ['./school-details-capacity.component.scss'],
})
export class SchoolDetailsCapacityComponent {
  @Input() qntForm!: FormGroup;

  constructor(){
    //TO TEST
    if(!this.qntForm){
      this.qntForm = new FormGroup({
        classes: new FormControl(''),
        students: new FormControl(''),
      });
    }
  }
}
