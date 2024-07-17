import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsComponent } from './grids.component';

describe('GridsComponent', () => {
  let component: GridsComponent;
  let fixture: ComponentFixture<GridsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridsComponent]
    });
    fixture = TestBed.createComponent(GridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
