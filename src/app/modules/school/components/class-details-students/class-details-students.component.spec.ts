import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailsStudentsComponent } from './class-details-students.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ClassDetailsStudentsComponent', () => {
  let component: ClassDetailsStudentsComponent;
  let fixture: ComponentFixture<ClassDetailsStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassDetailsStudentsComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BrowserModule,
      ],
    });
    fixture = TestBed.createComponent(ClassDetailsStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
