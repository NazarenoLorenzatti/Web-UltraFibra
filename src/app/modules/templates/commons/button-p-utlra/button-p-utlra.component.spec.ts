import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPUtlraComponent } from './button-p-utlra.component';

describe('ButtonPUtlraComponent', () => {
  let component: ButtonPUtlraComponent;
  let fixture: ComponentFixture<ButtonPUtlraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonPUtlraComponent]
    });
    fixture = TestBed.createComponent(ButtonPUtlraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
