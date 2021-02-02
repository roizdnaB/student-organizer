import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lecturer } from 'src/app/models/lecturer';
import { LecturerService } from './lecturer.service';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LecturersAddComponent } from './lecturers-add/lecturers-add.component';

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
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadLecturers();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LecturersAddComponent, {
      width: '250px',
      height: '400px'
    });


    dialogRef.afterClosed().subscribe(() => {
      this.loadLecturers();
    });
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
