import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleScheduleComponent } from './vehicle-schedule.component';

describe('VehicleScheduleComponent', () => {
  let component: VehicleScheduleComponent;
  let fixture: ComponentFixture<VehicleScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
