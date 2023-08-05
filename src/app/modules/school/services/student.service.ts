import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IStudent } from '../models/students.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private readonly http: HttpClient) {}

  createStudent(student: IStudent): Observable<IStudent> {
    return this.http.post<IStudent>(environment.apiUrl + 'students', student);
  }

  getStudentsBySchoolId(idSchool: number): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(environment.apiUrl + 'students', {
      params: { idSchool: idSchool },
    });
  }

  getStudentsByClassId(idClass: number): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(environment.apiUrl + 'students', {
      params: { idClass: idClass },
    });
  }

  getStudentsById(id: number): Observable<IStudent> {
    return this.http
      .get<IStudent[]>(environment.apiUrl + 'students', {
        params: { id: id },
      })
      .pipe(map((students) => students[0]));
  }

  editStudent(id: number, student: IStudent): Observable<IStudent> {
    return this.http.put<IStudent>(
      environment.apiUrl + 'students/' + id,
      student
    );
  }

  deleteStudent(idStudent: number): Observable<IStudent> {
    return this.http.delete<IStudent>(
      environment.apiUrl + 'students/' + idStudent
    );
  }
}
