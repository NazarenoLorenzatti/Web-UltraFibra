import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGovComponent } from './header-gov.component';

describe('HeaderGovComponent', () => {
  let component: HeaderGovComponent;
  let fixture: ComponentFixture<HeaderGovComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderGovComponent]
    });
    fixture = TestBed.createComponent(HeaderGovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
