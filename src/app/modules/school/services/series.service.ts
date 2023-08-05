import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ISerie } from '../models/serie.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private readonly http: HttpClient) { }

  getSeries(idTypeTeaching: number): Observable<ISerie[]> {
    return this.http.get<ISerie[]>(environment.apiUrl + 'series', {
      params: { idTypeTeaching: idTypeTeaching },
    });
  }
}
