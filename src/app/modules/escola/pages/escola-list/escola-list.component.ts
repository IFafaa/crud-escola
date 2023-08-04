import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escola-list',
  templateUrl: './escola-list.component.html',
  styleUrls: ['./escola-list.component.scss']
})
export class EscolaListComponent {

  constructor(
    private _router: Router
  ){}


  registerSchool(): void{
    this._router.navigate(['/escolas/cadastrar'])
  }
}
