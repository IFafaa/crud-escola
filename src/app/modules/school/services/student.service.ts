import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IStudent } from '../models/students.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private readonly http: HttpClient) { }

  getStudents(idSchool: number): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(environment.apiUrl + 'students', {
      params: { idSchool: idSchool },
    });
  }
}
