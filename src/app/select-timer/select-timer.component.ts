import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeFormatterPipe } from '../Pipes/array-formatter.pipe';
import { MailFormatterPipe } from '../Pipes/mail-formatter.pipe';
import { VehiclesPipe } from '../Pipes/vehicles.pipe';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonStore } from '../services/commonStore.service';
import { Router } from '@angular/router';
import { ScheduleReportComponent } from '../schedule-report/schedule-report.component';
import { ConfimationComponent } from '../confimation/confimation.component';
import { Reports } from '../Entities/ReportType';
import { CalenderComponent } from '../calender/calender.component';

@Component({
  selector: 'app-select-timer',
  standalone: true,
  imports: [CommonModule, FormsModule, TypeFormatterPipe, MailFormatterPipe, VehiclesPipe, CalenderComponent],
  templateUrl: './select-timer.component.html',
  styleUrl: './select-timer.component.css'
})
export class SelectTimerComponent {

  // Variable to hold functionality of modal
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);

  type: any[] = []
  vehicle: any[] = []
  mail: any[] = []

  // Clock based variables
  hr: number 
  min: number
  meredian: boolean = true

  // Criteria selector
  skipWeekEnd: boolean = true
  timeSelection: string = ""
  customTime: string = ""

  week: string[] = ["Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday", "Sunday"]
  weekEnd: string[] = ["Monday", "Tuesday", "Wednessday", "Thursday", "Friday"]

  userReport: Reports | undefined

  selectedDay: string = ""

  constructor(private store: CommonStore) {

    let userId = localStorage.getItem("userId")

    this.userReport = this.store.getReportForUser(userId)
    console.log(this.userReport);


    this.type = this.userReport.types
    this.mail = this.userReport.emails
    this.vehicle = this.userReport.vehicles

    this.hr = this.userReport.schedule.hour
    this.min = this.userReport.schedule.minute
    this.timeSelection = this.userReport.schedule.scheduleType

    if(this.userReport.schedule.meredian!=undefined || this.userReport.schedule.meredian != null){
      if(this.userReport.schedule.meredian === "AM")
        this.meredian = false
      else
        this.meredian = true
    }

  }

  // Adds minutes and Hours in the clock

  addTimer() {
    if (this.min < 59 && this.hr <= 12) {
      console.log("In the If block");
      this.min = this.min + 1;
    } else if (this.min === 59 && this.hr === 12) {
      console.log("In the Else If block");
      this.min = 0;
      this.hr = 1
    } else {
      console.log("In the Else block");
      this.min = 0;
      this.hr = this.hr + 1;
    }
  }
  // Removes minutes and Hours in the clock
  removeTimer() {
    if (this.hr > 1 && this.min > 0) {
      console.log("In the if block");
      this.min = this.min - 1;
    } else if (this.hr > 1 && this.min == 0) {
      console.log("In the else if block");
      this.min = 59;
      this.hr = this.hr - 1;
    } else if (this.hr == 1 && this.min == 0) {
      this.min = 59;
      this.hr = 12
    } else {
      this.min = this.min - 1
    }
  }

  get getTimeSelection(): any {
    return this.timeSelection
  }

  clickedItemIndex: number | null = null
  activeIndex: number | null = null;

  handleSelection(selection: string, index?: any, type?: string) {

    if (selection === "day" && type != undefined) {
      // alert(`${type} has been selected for notifications.`)
      this.customTime = "Day"
      this.selectedDay = type
      this.clickedItemIndex = index
    }
    if (selection === "TwoDay" && type != undefined) {
      // alert(`${type} has been selected for notifications.`)
      this.customTime = "TwoDay"
      this.selectedDay = type
      this.clickedItemIndex = index
    }
    if (selection === "CustomYear") {
      this.customTime = "CustomYear"
      this.activeIndex = this.activeIndex === index ? null : index;
    }
    if (selection === "CustomQua") {
      this.customTime = "CustomQua"
      this.activeIndex = this.activeIndex === index ? null : index;
    }
    if (selection === "FirstQua") {
      this.customTime = "FirstQua"
      this.activeIndex = this.activeIndex === index ? null : index;
    }
    if (selection === "LastQua") {
      this.customTime = "LastQua"
      this.activeIndex = this.activeIndex === index ? null : index;
    }
    if (selection === "FirstOfYear") {
      this.customTime = "FirstYear"
      this.activeIndex = this.activeIndex === index ? null : index;
    }
    if (selection === "LastOfYear") {
      this.customTime = "LastYear"
      this.activeIndex = this.activeIndex === index ? null : index;
    }

  }


  confirmation() {

    if ((this.timeSelection != "" && (this.customTime != "" || this.selectedDay != "")) || this.timeSelection === "Monthly") {

      if (this.timeSelection != "Monthly") {

        if (this.userReport != undefined) {

          if (this.meredian){
            this.userReport.schedule.hour = this.hr
            this.userReport.schedule.minute = this.min
            this.userReport.schedule.meredian = "PM"
          }else
            this.userReport.schedule.scheduleTiming = `${this.hr}:${this.min} AM`

          this.userReport.schedule.scheduleType = `${this.customTime}`

          this.userReport.schedule.day = `${this.selectedDay}`
        }

      } else {
        if (this.userReport != undefined) {

          if (this.meredian)
            this.userReport.schedule.scheduleTiming = `${this.hr}:${this.min} PM`
          else
            this.userReport.schedule.scheduleTiming = `${this.hr}:${this.min} AM`

          this.userReport.schedule.scheduleType = `${this.timeSelection}`
        }

      }

      this.modalService.open(ConfimationComponent, { size: 'lg', centered: true });
      this.activeModal.close('Close click')
    } else {
      console.log(this.timeSelection);
      console.log(this.customTime);
      console.log(this.selectedDay);


      alert("Please select a time schedule.")
    }

  }

  cancel() {
    this.activeModal.close('Close click')
    this.modalService.open(ScheduleReportComponent);
  }


}
