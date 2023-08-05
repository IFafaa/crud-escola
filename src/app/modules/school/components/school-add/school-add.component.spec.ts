import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAddComponent } from './school-add.component';

describe('SchoolAddComponent', () => {
  let component: SchoolAddComponent;
  let fixture: ComponentFixture<SchoolAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolAddComponent]
    });
    fixture = TestBed.createComponent(SchoolAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
