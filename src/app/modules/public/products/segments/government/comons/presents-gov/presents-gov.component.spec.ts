import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentsGovComponent } from './presents-gov.component';

describe('PresentsGovComponent', () => {
  let component: PresentsGovComponent;
  let fixture: ComponentFixture<PresentsGovComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentsGovComponent]
    });
    fixture = TestBed.createComponent(PresentsGovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
