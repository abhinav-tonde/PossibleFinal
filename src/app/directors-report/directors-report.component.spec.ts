import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorsReportComponent } from './directors-report.component';

describe('DirectorsReportComponent', () => {
  let component: DirectorsReportComponent;
  let fixture: ComponentFixture<DirectorsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectorsReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
