import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonsComponent } from './commons.component';

describe('CommonsComponent', () => {
  let component: CommonsComponent;
  let fixture: ComponentFixture<CommonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonsComponent]
    });
    fixture = TestBed.createComponent(CommonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
