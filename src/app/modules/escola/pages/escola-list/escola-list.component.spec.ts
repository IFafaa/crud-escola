import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolaListComponent } from './escola-list.component';

describe('EscolaListComponent', () => {
  let component: EscolaListComponent;
  let fixture: ComponentFixture<EscolaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EscolaListComponent]
    });
    fixture = TestBed.createComponent(EscolaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
