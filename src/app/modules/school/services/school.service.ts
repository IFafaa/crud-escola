import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISelect } from '../models/select.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor() { }

  typeSchool(): Observable<ISelect[]>{
    return of([
      {
        name: "Privada",
        id: 0
      },
      {
        name: "Municipal",
        id: 1
      },
      {
        name: "Estadual",
        id: 2
      },
    ])
  }

  typeTeaching(): Observable<ISelect[]>{
    return of([
      {
        name: "Jardim de infância",
        id: 0
      },
      {
        name: "Ensino Fundamental I",
        id: 1
      },
      {
        name: "Ensino Fundamental II",
        id: 3
      },
      {
        name: "Ensino Médio",
        id: 4
      },
      {
        name: "Ensino Técnico",
        id: 5
      },
    ])
  }

  typeOpeningHours(): Observable<ISelect[]>{
    return of([
      {
        name: "Manhã",
        id: 0
      },
      {
        name: "Tarde",
        id: 0
      },
      {
        name: "Noite",
        id: 0
      },
    ])
  }
}
