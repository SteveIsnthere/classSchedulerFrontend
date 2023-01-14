import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationDetailDialogComponent } from './relation-detail-dialog.component';

describe('RelationBottomSheetComponent', () => {
  let component: RelationDetailDialogComponent;
  let fixture: ComponentFixture<RelationDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelationDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
