import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCellComponent } from './member-cell.component';

describe('MemberCellComponent', () => {
  let component: MemberCellComponent;
  let fixture: ComponentFixture<MemberCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
