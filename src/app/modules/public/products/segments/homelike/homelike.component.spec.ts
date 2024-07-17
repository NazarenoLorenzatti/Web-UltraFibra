import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomelikeComponent } from './homelike.component';

describe('HomelikeComponent', () => {
  let component: HomelikeComponent;
  let fixture: ComponentFixture<HomelikeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomelikeComponent]
    });
    fixture = TestBed.createComponent(HomelikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
