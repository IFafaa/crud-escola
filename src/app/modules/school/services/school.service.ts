import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ISelect } from '../models/select.model';
import { ISchool } from '../models/school.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private http: HttpClient) {}

  typeInstitution(): Observable<ISelect[]> {
    return of([
      {
        name: 'Estadual',
        id: 0,
      },
      {
        name: 'Municipal',
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

  getSchools(): Observable<ISchool[]> {
    return this.http.get<ISchool[]>(environment.apiUrl + 'schools');
  }

  getSchoolById(id: number): Observable<ISchool> {
    return this.http.get<ISchool[]>(environment.apiUrl + 'schools', {
      params: { id: id },
    }).pipe(map((school) => school[0]))
  }

  createSchool(school: ISchool): Observable<ISchool> {
    return this.http.post<ISchool>(environment.apiUrl + 'schools', school);
  }

  deleteSchool(id: number): Observable<ISchool> {
    return this.http.delete<ISchool>(environment.apiUrl + 'schools/' + id);
  }
}
