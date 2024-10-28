import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingScoreCardComponent } from './driving-score-card.component';

describe('DrivingScoreCardComponent', () => {
  let component: DrivingScoreCardComponent;
  let fixture: ComponentFixture<DrivingScoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrivingScoreCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivingScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
