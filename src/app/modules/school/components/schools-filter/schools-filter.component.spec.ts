import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsFilterComponent } from './schools-filter.component';

describe('SchoolsFilterComponent', () => {
  let component: SchoolsFilterComponent;
  let fixture: ComponentFixture<SchoolsFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolsFilterComponent]
    });
    fixture = TestBed.createComponent(SchoolsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
