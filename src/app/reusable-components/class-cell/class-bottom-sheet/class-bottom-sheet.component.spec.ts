import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassBottomSheetComponent} from './class-bottom-sheet.component';

describe('ClassBottomSheetComponent', () => {
  let component: ClassBottomSheetComponent;
  let fixture: ComponentFixture<ClassBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassBottomSheetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
