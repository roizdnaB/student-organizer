import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Course } from 'src/app/models/course';
import { Lecturer } from 'src/app/models/lecturer';
import { LecturerService } from '../../lecturers/lecturer.service';
import { CourseService } from '../course.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.css']
})
export class CoursesAddComponent implements OnInit {

  dataForm: FormGroup;
  course: Course = {};
  lecturers: Lecturer[];
  lecturersSelect = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<CoursesAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private formBuilder: FormBuilder,
    private service: CourseService,
    private lecturerService: LecturerService) { }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      title: ['', Validators?.compose([Validators?.required, Validators?.minLength(3)])],
      description: ['', Validators?.required],
      zoomLink: ['https://zoom.us/j/', Validators?.required]
    });

    this.lecturerService.getLecturers()
      .pipe(first())
      .subscribe(lecturers => this.lecturers = lecturers);
  }

  getErrorMessageTitle() {
    return this.dataForm.controls.title.hasError('required') ? 'You must enter a title' :
      this.dataForm.controls.title.hasError('minlength') ?  'The title has to be longer than 3 chars' :
      '';
  }

  getErrorMessageDescription() {
    return this.dataForm.controls.description.hasError('required') ? 'You must enter a description' : '';
  }

  getErrorMessageZoomLink() {
    return this.dataForm.controls.zoomLink.hasError('required') ? 'You must enter a meeting url' : '';
  }

  onSubmit(): void {
    if (this.dataForm.invalid) {
      return;
    }
    else {
      this.course.title = this.dataForm.controls.title.value.toString();
      this.course.description = this.dataForm.controls.description.value.toString();
      this.course.zoomLink = this.dataForm.controls.zoomLink.value.toString();

      var lecturerIds: string[] = [];
      this.lecturersSelect.value.forEach(el => {
        lecturerIds.push(el._id);
      });
      this.course.lecturers = lecturerIds;

      this.dataForm.reset();

      this.data = this.course;

      this.service.addCourse(this.course)
        .pipe(first())
        .subscribe(() => {});
    }
  }
}
