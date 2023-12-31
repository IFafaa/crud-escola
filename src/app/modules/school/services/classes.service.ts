import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IClass } from '../models/class.model';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor(private readonly http: HttpClient) {}

  getClasses(
    idSchool: number,
    filters: IClass | {} = {}
  ): Observable<IClass[]> {
    return this.http.get<IClass[]>(environment.apiUrl + 'classes', {
      params: { ...filters, idSchool: idSchool },
    });
  }

  editClass(id: number, _class: IClass): Observable<IClass> {
    return this.http.put<IClass>(environment.apiUrl + 'classes/' + id, _class);
  }

  createClass(_class: IClass): Observable<IClass> {
    return this.http.post<IClass>(environment.apiUrl + 'classes', _class);
  }

  deleteClass(id: number): Observable<IClass> {
    return this.http.delete<IClass>(environment.apiUrl + 'classes/' + id);
  }

  getClassById(id: number): Observable<IClass> {
    return this.http
      .get<IClass[]>(environment.apiUrl + 'classes', {
        params: { id: id },
      })
      .pipe(map((classes) => classes[0]));
  }
}
