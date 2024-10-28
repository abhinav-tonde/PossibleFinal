import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleHealthComponent } from './vehicle-health.component';

describe('VehicleHealthComponent', () => {
  let component: VehicleHealthComponent;
  let fixture: ComponentFixture<VehicleHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleHealthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
