import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesComponent } from './offices.component';

describe('OfficesComponent', () => {
  let component: OfficesComponent;
  let fixture: ComponentFixture<OfficesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficesComponent]
    });
    fixture = TestBed.createComponent(OfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
