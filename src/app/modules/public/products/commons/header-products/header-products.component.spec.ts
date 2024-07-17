import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProductsComponent } from './header-products.component';

describe('HeaderProductsComponent', () => {
  let component: HeaderProductsComponent;
  let fixture: ComponentFixture<HeaderProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderProductsComponent]
    });
    fixture = TestBed.createComponent(HeaderProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
