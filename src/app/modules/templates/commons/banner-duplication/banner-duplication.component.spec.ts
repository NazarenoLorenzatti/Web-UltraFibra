import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerDuplicationComponent } from './banner-duplication.component';

describe('BannerDuplicationComponent', () => {
  let component: BannerDuplicationComponent;
  let fixture: ComponentFixture<BannerDuplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerDuplicationComponent]
    });
    fixture = TestBed.createComponent(BannerDuplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
