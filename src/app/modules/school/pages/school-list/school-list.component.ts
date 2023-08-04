import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent {

  constructor(
    private _router: Router
  ){}


  registerSchool(): void{
    this._router.navigate(['/escolas/cadastrar'])
  }
}
