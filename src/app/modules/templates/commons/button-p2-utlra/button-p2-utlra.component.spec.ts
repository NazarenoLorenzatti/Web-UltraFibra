import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonP2UtlraComponent } from './button-p2-utlra.component';

describe('ButtonP2UtlraComponent', () => {
  let component: ButtonP2UtlraComponent;
  let fixture: ComponentFixture<ButtonP2UtlraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonP2UtlraComponent]
    });
    fixture = TestBed.createComponent(ButtonP2UtlraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
