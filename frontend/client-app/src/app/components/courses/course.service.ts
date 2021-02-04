import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

private courseUrl = environment.apiUrl + 'courses/';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseUrl);
  }

  addCourse(newCourse: Course): Observable<Course> {
    return this.http.post<Course>(this.courseUrl, newCourse);
  }

  deleteCourse(course: Course) {
    return this.http.delete<Course>(this.courseUrl + course._id);
  }

  editCourse(course: Course) {
    return this.http.put<Course>(this.courseUrl + course._id, course);
  }
}
