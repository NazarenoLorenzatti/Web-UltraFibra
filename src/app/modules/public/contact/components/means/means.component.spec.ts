import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeansComponent } from './means.component';

describe('MeansComponent', () => {
  let component: MeansComponent;
  let fixture: ComponentFixture<MeansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeansComponent]
    });
    fixture = TestBed.createComponent(MeansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
