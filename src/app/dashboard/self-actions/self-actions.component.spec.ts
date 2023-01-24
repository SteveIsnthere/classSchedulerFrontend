import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelfActionsComponent} from './self-actions.component';

describe('SelfActionsComponent', () => {
  let component: SelfActionsComponent;
  let fixture: ComponentFixture<SelfActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfActionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelfActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
