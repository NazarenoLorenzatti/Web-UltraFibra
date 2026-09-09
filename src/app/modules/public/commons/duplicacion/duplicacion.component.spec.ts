import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicacionComponent } from './duplicacion.component';

describe('DuplicacionComponent', () => {
  let component: DuplicacionComponent;
  let fixture: ComponentFixture<DuplicacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuplicacionComponent]
    });
    fixture = TestBed.createComponent(DuplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
