import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPymesComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormPymesComponent;
  let fixture: ComponentFixture<FormPymesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPymesComponent]
    });
    fixture = TestBed.createComponent(FormPymesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
