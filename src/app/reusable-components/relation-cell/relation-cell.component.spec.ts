import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RelationCellComponent} from './relation-cell.component';

describe('RelationCellComponent', () => {
  let component: RelationCellComponent;
  let fixture: ComponentFixture<RelationCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelationCellComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RelationCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
