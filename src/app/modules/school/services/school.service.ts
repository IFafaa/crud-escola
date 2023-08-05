import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISelect } from '../models/select.model';
import { ISchool } from '../models/school.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(
    private http: HttpClient
  ) {}

  typeSchool(): Observable<ISelect[]> {
    return of([
      {
        name: 'Municipal',
        id: 0,
      },
      {
        name: 'Estadual',
        id: 1,
      },
    ]);
  }

  typeTeaching(): Observable<ISelect[]> {
    return of([
      {
        name: 'Jardim de infância',
        id: 0,
      },
      {
        name: 'Ensino Fundamental I',
        id: 1,
      },
      {
        name: 'Ensino Fundamental II',
        id: 3,
      },
      {
        name: 'Ensino Médio',
        id: 4,
      },
      {
        name: 'Ensino Técnico',
        id: 5,
      },
    ]);
  }

  typeOpeningHours(): Observable<ISelect[]> {
    return of([
      {
        name: 'Manhã',
        id: 0,
      },
      {
        name: 'Tarde',
        id: 0,
      },
      {
        name: 'Noite',
        id: 0,
      },
    ]);
  }

  createSchool(school: ISchool): Observable<any>{
    return this.http.post(environment.apiUrl + 'schools', school)
  }
}
