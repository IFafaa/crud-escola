import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailsStudentsComponent } from './class-details-students.component';

describe('ClassDetailsStudentsComponent', () => {
  let component: ClassDetailsStudentsComponent;
  let fixture: ComponentFixture<ClassDetailsStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassDetailsStudentsComponent]
    });
    fixture = TestBed.createComponent(ClassDetailsStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
