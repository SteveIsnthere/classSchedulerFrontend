import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationBottomSheetComponent } from './relation-bottom-sheet.component';

describe('RelationBottomSheetComponent', () => {
  let component: RelationBottomSheetComponent;
  let fixture: ComponentFixture<RelationBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelationBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
