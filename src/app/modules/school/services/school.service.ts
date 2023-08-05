import { IClass } from './../models/class.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ISelect } from '../models/select.model';
import { ISchool } from '../models/school.model';
import { environment } from 'src/environment/environment';
import { IStudent } from '../models/students.model';
import { ISerie } from '../models/serie.model';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private http: HttpClient) {}

  typeInstitution(): Observable<ISelect[]> {
    return this.http.get<ISelect[]>(environment.apiUrl + 'typeInstitution');
  }

  typeTeaching(): Observable<ISelect[]> {
    return this.http.get<ISelect[]>(environment.apiUrl + 'typeTeaching');
  }

  typeOpeningHours(): Observable<ISelect[]> {
    return this.http.get<ISelect[]>(environment.apiUrl + 'typeOpeningHours');
  }

  getSeries(idTypeTeaching: number): Observable<ISerie[]> {
    return this.http.get<ISerie[]>(environment.apiUrl + 'series', {
      params: { idTypeTeaching: idTypeTeaching },
    });
  }

  getSchools(): Observable<ISchool[]> {
    return this.http.get<ISchool[]>(environment.apiUrl + 'schools');
  }

  getSchoolById(id: number): Observable<ISchool> {
    return this.http
      .get<ISchool[]>(environment.apiUrl + 'schools', {
        params: { id: id },
      })
      .pipe(map((school) => school[0]));
  }

  createSchool(school: ISchool): Observable<ISchool> {
    return this.http.post<ISchool>(environment.apiUrl + 'schools', school);
  }

  deleteSchool(id: number): Observable<ISchool> {
    return this.http.delete<ISchool>(environment.apiUrl + 'schools/' + id);
  }

  getClasses(idSchool: number): Observable<IClass[]> {
    return this.http.get<IClass[]>(environment.apiUrl + 'classes', {
      params: { idSchool: idSchool },
    });
  }

  createClass(_class: IClass): Observable<IClass> {
    return this.http.post<IClass>(environment.apiUrl + 'classes', _class);
  }

  getStudents(idSchool: number): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(environment.apiUrl + 'students', {
      params: { idSchool: idSchool },
    });
  }
}
