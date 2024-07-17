import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkusComponent } from 'src/app/modules/public/company/components/workus/workus.component';

describe('WorkusComponent', () => {
  let component: WorkusComponent;
  let fixture: ComponentFixture<WorkusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkusComponent]
    });
    fixture = TestBed.createComponent(WorkusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
