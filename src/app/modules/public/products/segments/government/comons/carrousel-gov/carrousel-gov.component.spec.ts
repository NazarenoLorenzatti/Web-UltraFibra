import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselGovComponent } from './carrousel-gov.component';

describe('CarrouselGovComponent', () => {
  let component: CarrouselGovComponent;
  let fixture: ComponentFixture<CarrouselGovComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarrouselGovComponent]
    });
    fixture = TestBed.createComponent(CarrouselGovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
