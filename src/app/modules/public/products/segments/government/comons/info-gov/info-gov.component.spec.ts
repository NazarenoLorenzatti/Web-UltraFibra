import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGovComponent } from './info-gov.component';

describe('InfoGovComponent', () => {
  let component: InfoGovComponent;
  let fixture: ComponentFixture<InfoGovComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoGovComponent]
    });
    fixture = TestBed.createComponent(InfoGovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
