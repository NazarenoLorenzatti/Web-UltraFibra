import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsRedesUltraComponent } from './buttons-redes-ultra.component';

describe('ButtonsRedesUltraComponent', () => {
  let component: ButtonsRedesUltraComponent;
  let fixture: ComponentFixture<ButtonsRedesUltraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonsRedesUltraComponent]
    });
    fixture = TestBed.createComponent(ButtonsRedesUltraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
