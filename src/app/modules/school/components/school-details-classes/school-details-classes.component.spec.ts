import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDetailsClassesComponent } from './school-details-classes.component';

describe('SchoolDetailsClassesComponent', () => {
  let component: SchoolDetailsClassesComponent;
  let fixture: ComponentFixture<SchoolDetailsClassesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolDetailsClassesComponent]
    });
    fixture = TestBed.createComponent(SchoolDetailsClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
