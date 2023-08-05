import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailsFormComponent } from './class-details-form.component';

describe('ClassDetailsFormComponent', () => {
  let component: ClassDetailsFormComponent;
  let fixture: ComponentFixture<ClassDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassDetailsFormComponent]
    });
    fixture = TestBed.createComponent(ClassDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
