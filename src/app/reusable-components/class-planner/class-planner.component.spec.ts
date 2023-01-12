import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassPlannerComponent } from './class-planner.component';

describe('ClassPlannerComponent', () => {
  let component: ClassPlannerComponent;
  let fixture: ComponentFixture<ClassPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassPlannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
