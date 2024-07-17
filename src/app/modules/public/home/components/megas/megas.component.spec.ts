import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegasComponent } from './megas.component';

describe('MegasComponent', () => {
  let component: MegasComponent;
  let fixture: ComponentFixture<MegasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MegasComponent]
    });
    fixture = TestBed.createComponent(MegasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
