import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterUserareaComponent } from './footer-userarea.component';

describe('FooterUserareaComponent', () => {
  let component: FooterUserareaComponent;
  let fixture: ComponentFixture<FooterUserareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterUserareaComponent]
    });
    fixture = TestBed.createComponent(FooterUserareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
