import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSubmitUltraComponent } from './button-submit-ultra.component';

describe('ButtonSubmitUltraComponent', () => {
  let component: ButtonSubmitUltraComponent;
  let fixture: ComponentFixture<ButtonSubmitUltraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonSubmitUltraComponent]
    });
    fixture = TestBed.createComponent(ButtonSubmitUltraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
