import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { Lecturer } from 'src/app/models/lecturer';
import { LecturerService } from './lecturer.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.css']
})
export class LecturersComponent implements OnInit {
  dataForm: FormGroup; // form group of our data fields
  submitted = false;
  headers = ['firstName', 'lastName', 'email'];
  lecturers: Lecturer[];


  constructor(
    private formBuilder: FormBuilder,
    private lecturerService: LecturerService
  ) { }

  ngOnInit(): void {

    this.loadLecturers();

    this.dataForm = this.formBuilder?.group({
      firstName: ['', Validators?.compose([Validators?.required, Validators?.minLength(3)])],
      lastName: ['', Validators?.required]
    });
  }

  get f() { return this.dataForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.dataForm.invalid) {
      return;
    }
    else {
      return;
    }
  }

  private buildEmail(): string {
    return this.dataForm.controls.firstName.value.toString().toLowerCase() + '.' +
      this.dataForm.controls.lastName.value.toString().toLowerCase() + '@polsl.pl';
  }

  private loadLecturers() {
    this.lecturerService.getLecturers()
      .pipe(first())
      .subscribe(lecturers => this.lecturers = lecturers)
  }
}
