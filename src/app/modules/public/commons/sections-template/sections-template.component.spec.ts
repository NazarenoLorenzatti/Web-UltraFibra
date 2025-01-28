import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsTemplateComponent } from './sections-template.component';

describe('SectionsTemplateComponent', () => {
  let component: SectionsTemplateComponent;
  let fixture: ComponentFixture<SectionsTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionsTemplateComponent]
    });
    fixture = TestBed.createComponent(SectionsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
