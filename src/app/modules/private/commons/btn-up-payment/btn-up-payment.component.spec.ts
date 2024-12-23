import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnUpPaymentComponent } from './btn-up-payment.component';

describe('BtnUpPaymentComponent', () => {
  let component: BtnUpPaymentComponent;
  let fixture: ComponentFixture<BtnUpPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnUpPaymentComponent]
    });
    fixture = TestBed.createComponent(BtnUpPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
