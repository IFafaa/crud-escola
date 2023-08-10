import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private apiUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  getCep(cep: string): Observable<any> {
    const url = `${this.apiUrl}/${cep}/json/`;
    return this.http.get(url);
  }
}
