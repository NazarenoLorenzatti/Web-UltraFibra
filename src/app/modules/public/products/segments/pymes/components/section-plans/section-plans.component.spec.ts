import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPlansPymesComponent } from './section-plans.component';

describe('SectionPlansComponent', () => {
  let component: SectionPlansPymesComponent;
  let fixture: ComponentFixture<SectionPlansPymesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionPlansPymesComponent]
    });
    fixture = TestBed.createComponent(SectionPlansPymesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
