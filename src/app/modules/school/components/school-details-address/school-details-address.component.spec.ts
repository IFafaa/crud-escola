import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDetailsAddressComponent } from './school-details-address.component';

describe('SchoolDetailsAddressComponent', () => {
  let component: SchoolDetailsAddressComponent;
  let fixture: ComponentFixture<SchoolDetailsAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolDetailsAddressComponent]
    });
    fixture = TestBed.createComponent(SchoolDetailsAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
