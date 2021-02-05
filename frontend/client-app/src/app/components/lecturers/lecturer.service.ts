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

  getLecturerById(lecturerId: string): Observable<Lecturer> {
    return this.http.get<Lecturer>(this.lecturerUrl + lecturerId);
  }

  addLecturer(newLecturer: Lecturer): Observable<Lecturer> {
    return this.http.post<Lecturer>(this.lecturerUrl, newLecturer);
  }

  deleteLecturer(lecturer: Lecturer) {
    return this.http.delete<Lecturer>(this.lecturerUrl + lecturer._id);
  }

  editLecturer(lecturer: Lecturer) {
    return this.http.put<Lecturer>(this.lecturerUrl + lecturer._id, lecturer);
  }
}
