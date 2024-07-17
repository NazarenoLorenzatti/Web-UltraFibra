import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCorpoComponent } from './header-corpo.component';

describe('HeaderCorpoComponent', () => {
  let component: HeaderCorpoComponent;
  let fixture: ComponentFixture<HeaderCorpoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderCorpoComponent]
    });
    fixture = TestBed.createComponent(HeaderCorpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
