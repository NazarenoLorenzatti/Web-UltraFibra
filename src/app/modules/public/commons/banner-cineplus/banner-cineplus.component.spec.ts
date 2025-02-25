import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCineplusComponent } from './banner-cineplus.component';

describe('BannerCineplusComponent', () => {
  let component: BannerCineplusComponent;
  let fixture: ComponentFixture<BannerCineplusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerCineplusComponent]
    });
    fixture = TestBed.createComponent(BannerCineplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
