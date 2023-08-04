import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegisterComponent } from './school-register.component';

describe('SchoolRegisterComponent', () => {
  let component: SchoolRegisterComponent;
  let fixture: ComponentFixture<SchoolRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolRegisterComponent]
    });
    fixture = TestBed.createComponent(SchoolRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
