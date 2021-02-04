import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lecturer } from 'src/app/models/lecturer';
import { LecturerService } from './lecturer.service';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LecturersAddComponent } from './lecturers-add/lecturers-add.component';
import { LecturersEditComponent } from './lecturers-edit/lecturers-edit.component';

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.css']
})
export class LecturersComponent implements OnInit {
  dataForm: FormGroup;
  submitted = false;
  headers = ['firstName', 'lastName', 'email'];
  lecturers: Lecturer[];

  constructor(
    private lecturerService: LecturerService,
    public dialogAdd: MatDialog,
    public dialogEdit: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadLecturers();
  }

  openDialogAdd(): void {
    const dialogRef = this.dialogAdd.open(LecturersAddComponent, {
      width: '250px',
      height: '400px'
    });


    dialogRef.afterClosed().subscribe(() => {
      this.loadLecturers();
    });
  }

  openDialogEdit(lecturer: Lecturer): void {
    const dialogRef = this.dialogEdit.open(LecturersEditComponent, {
      width: '250px',
      height: '400px',
      data: { eLecturer: lecturer }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadLecturers();
    })
  }

  private loadLecturers() {
    this.lecturerService.getLecturers()
      .pipe(first())
      .subscribe(lecturers => this.lecturers = lecturers);
  }

  onDelete(lecturer: Lecturer): void {
    this.lecturerService.deleteLecturer(lecturer)
      .pipe(first())
      .subscribe(() => {
        this.loadLecturers();
      });
  }

  onEdit(): void {
    // TODO
  }
}
