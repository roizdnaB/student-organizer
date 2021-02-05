import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LecturersComponent } from './components/lecturers/lecturers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LecturersAddComponent } from './components/lecturers/lecturers-add/lecturers-add.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LecturersEditComponent } from './components/lecturers/lecturers-edit/lecturers-edit.component';
import { CoursesComponent } from './components/courses/courses.component'
import { CoursesAddComponent } from './components/courses/courses-add/courses-add.component';
import { CoursesEditComponent } from './components/courses/courses-edit/courses-edit.component'
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LecturersComponent,
    LecturersAddComponent,
    LecturersEditComponent,
    CoursesComponent,
    CoursesAddComponent,
    CoursesEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
