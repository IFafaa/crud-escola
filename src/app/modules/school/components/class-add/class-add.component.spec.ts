import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAddComponent } from './class-add.component';

describe('ClassAddComponent', () => {
  let component: ClassAddComponent;
  let fixture: ComponentFixture<ClassAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassAddComponent]
    });
    fixture = TestBed.createComponent(ClassAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
