import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGridComponent } from './header-grid.component';

describe('HeaderGridComponent', () => {
  let component: HeaderGridComponent;
  let fixture: ComponentFixture<HeaderGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderGridComponent]
    });
    fixture = TestBed.createComponent(HeaderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
