import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromosSectionComponent } from './promos-section.component';

describe('PromosSectionComponent', () => {
  let component: PromosSectionComponent;
  let fixture: ComponentFixture<PromosSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromosSectionComponent]
    });
    fixture = TestBed.createComponent(PromosSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
