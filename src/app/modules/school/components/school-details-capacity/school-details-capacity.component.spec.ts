import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDetailsCapacityComponent } from './school-details-capacity.component';

describe('SchoolDetailsCapacityComponent', () => {
  let component: SchoolDetailsCapacityComponent;
  let fixture: ComponentFixture<SchoolDetailsCapacityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolDetailsCapacityComponent]
    });
    fixture = TestBed.createComponent(SchoolDetailsCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
