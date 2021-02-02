import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Lecturer } from 'src/app/models/lecturer';
import { environment } from './../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LecturerService {

  private lecturerUrl = environment.apiUrl + 'lecturers/';

  constructor(private http: HttpClient) { }

  getLecturers(): Observable<Lecturer[]> {
    return this.http.get<Lecturer[]>(this.lecturerUrl);
  }
}
