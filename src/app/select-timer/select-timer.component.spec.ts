import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTimerComponent } from './select-timer.component';

describe('SelectTimerComponent', () => {
  let component: SelectTimerComponent;
  let fixture: ComponentFixture<SelectTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
