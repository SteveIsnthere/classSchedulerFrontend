import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminClassPlannerComponent} from './admin-class-planner.component';

describe('AdminClassPlannerComponent', () => {
  let component: AdminClassPlannerComponent;
  let fixture: ComponentFixture<AdminClassPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminClassPlannerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminClassPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
