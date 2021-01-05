import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.css']
})
export class LecturersComponent implements OnInit {
  dataForm: FormGroup; // form group of our data fields
  submitted = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // build the dataForm and set validators for each field
    this.dataForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: ['', Validators.required]
    });
  }
  // get controls of the form in html code
  get f() { return this.dataForm.controls; }
  // function called after button click
  onSubmit() {
    this.submitted = true;

    if (this.dataForm.invalid) {
      return;
    }
    else {
      return; // data operations with backend
    }
  }
}
