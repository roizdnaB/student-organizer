import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Lecturer } from 'src/app/models/lecturer';
import { LecturerService } from '../lecturer.service';

@Component({
  selector: 'app-lecturers-edit',
  templateUrl: './lecturers-edit.component.html',
  styleUrls: ['./lecturers-edit.component.css']
})
export class LecturersEditComponent implements OnInit {
  dataForm: FormGroup;
  lecturer: Lecturer = {};

  constructor(
    public dialogRef: MatDialogRef<LecturersEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {eLecturer: Lecturer},
    private formBuilder: FormBuilder,
    private service: LecturerService
  ) { }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      firstName: ['', Validators?.compose([Validators?.required, Validators?.minLength(3)])],
      lastName: ['', Validators?.required]
    });

    this.dataForm.controls.firstName.setValue(this.data.eLecturer.firstName);
    this.dataForm.controls.lastName.setValue(this.data.eLecturer.lastName);
  }

  getErrorMessageFirstName() {
    return this.dataForm.controls.firstName.hasError('required') ? 'You must enter a first name' :
      this.dataForm.controls.firstName.hasError('minlength') ?  'The first name has to be longer than 3 chars' :
      '';
  }

  getErrorMessageLastName() {
    return this.dataForm.controls.lastName.hasError('required') ? 'You must enter a last name' : '';
  }

  onSubmit(): void {
    if (this.dataForm.invalid) {
      return;
    }
    else {
      this.lecturer._id = this.data.eLecturer._id;
      this.lecturer.firstName = this.dataForm.controls.firstName.value.toString();
      this.lecturer.lastName = this.dataForm.controls.lastName.value.toString();
      this.lecturer.email = this.buildEmail();

      this.dataForm.reset();

      this.service.editLecturer(this.lecturer)
        .pipe(first())
        .subscribe(() => {});
    }
  }

  private buildEmail(): string {

    let engFirstName = '';
    let engLastName = '';

    const firstName = this.dataForm.controls.firstName.value.toString().toLowerCase();
    const lastName = this.dataForm.controls.lastName.value.toString().toLowerCase();

    const polishEnglishChars = new Map([
      ['ą', 'a'], ['ć', 'c'], ['ę', 'e'], ['ł', 'l'],
      ['ń', 'n'], ['ó', 'o'], ['ś', 's'], ['ź', 'z'], ['ż', 'z']]);

    for (let i = 0; i < firstName.length; i++) {
      if (polishEnglishChars.has(firstName.charAt(i))) {
        engFirstName += polishEnglishChars.get(firstName.charAt(i));
      } else {
        engFirstName += firstName.charAt(i);
      }
    }

    for (let i = 0; i < lastName.length; i++) {
      if (polishEnglishChars.has(lastName.charAt(i))) {
        engLastName += polishEnglishChars.get(lastName.charAt(i));
      } else {
        engLastName += lastName.charAt(i);
      }
    }

    return engFirstName + '.' + engLastName + '@polsl.pl';
  }

}
