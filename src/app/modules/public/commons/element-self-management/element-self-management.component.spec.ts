import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementSelfManagementComponent } from './element-self-management.component';

describe('ElementSelfManagementComponent', () => {
  let component: ElementSelfManagementComponent;
  let fixture: ComponentFixture<ElementSelfManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElementSelfManagementComponent]
    });
    fixture = TestBed.createComponent(ElementSelfManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
