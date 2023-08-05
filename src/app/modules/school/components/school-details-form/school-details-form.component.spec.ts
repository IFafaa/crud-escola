import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDetailsFormComponent } from './school-details-form.component';

describe('SchoolDetailsFormComponent', () => {
  let component: SchoolDetailsFormComponent;
  let fixture: ComponentFixture<SchoolDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolDetailsFormComponent]
    });
    fixture = TestBed.createComponent(SchoolDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
