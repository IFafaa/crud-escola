import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private apiUrl = 'https://viacep.com.br/ws';

  constructor() {}

  getCep(cep: string): Observable<any> {
    return new Observable((x) => {
      console.log('via cep url: ',this.apiUrl);
      var request = new XMLHttpRequest();
      request.open('get', `${this.apiUrl}/${cep}/json/`, true);
      request.send();
      request.onload = function () {
        var data = JSON.parse(this.response);
        x.next(data);
      };
    });
  }
}
