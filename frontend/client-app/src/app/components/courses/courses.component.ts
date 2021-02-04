import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { CourseService } from './course.service';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesAddComponent } from './courses-add/courses-add.component';
import { CoursesEditComponent } from './courses-edit/courses-edit.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  dataForm: FormGroup;
  submitted = false;
  headers = ['title', 'description', 'zoomLink'];
  courses: Course[];

  constructor(
    private courseService: CourseService,
    public dialogAdd: MatDialog,
    public dialogEdit: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  openDialogAdd(): void {
    const dialogRef = this.dialogAdd.open(CoursesAddComponent, {
      width: '250px',
      height: '400px'
    });


    dialogRef.afterClosed().subscribe(() => {
      this.loadCourses();
    });
  }

  openDialogEdit(course: Course): void {
    const dialogRef = this.dialogEdit.open(CoursesEditComponent, {
      width: '250px',
      height: '400px',
      data: { eCourse: course }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadCourses();
    })
  }

  private loadCourses() {
    this.courseService.getCourses()
      .pipe(first())
      .subscribe(courses => this.courses = courses);
  }

  onDelete(course: Course): void {
    this.courseService.deleteCourse(course)
      .pipe(first())
      .subscribe(() => {
        this.loadCourses();
      });
  }

  onEdit(): void {
    // TODO
  }

}
