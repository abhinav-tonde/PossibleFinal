import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailFormatterPipe } from '../Pipes/mail-formatter.pipe';
import { TypeFormatterPipe } from '../Pipes/array-formatter.pipe';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectTimerComponent } from '../select-timer/select-timer.component';
import { CommonStore } from '../services/commonStore.service';
import { UserInfo } from '../Entities/UserInfo';
import { Reports } from '../Entities/ReportType';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-confimation',
  standalone: true,
  imports: [CommonModule, TypeFormatterPipe, MailFormatterPipe, RouterModule],
  templateUrl: './confimation.component.html',
  styleUrl: './confimation.component.css'
})
export class ConfimationComponent {




  // Variable to hold functionality of modal
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);

  userDetails: Reports

  type: any[] = []
  mail: any[] = []
  day: any | undefined
  schedule: any | undefined
  timing: any | undefined
  date: any | undefined
  hr: any | undefined
  min: any | undefined
  meredian: any | undefined

  constructor(private store: CommonStore, private rout: Router) {

    let userId = localStorage.getItem("userId")

    this.userDetails = this.store.getReportForUser(userId);
    this.type = this.userDetails.types
    this.mail = this.userDetails.emails
    this.schedule = this.userDetails.schedule.scheduleType
    this.day = this.userDetails.schedule.day
    this.date = this.userDetails.schedule.date
    this.hr = this.userDetails.schedule.hour
    this.min = this.userDetails.schedule.minute
    this.meredian = this.userDetails.schedule.meredian

    console.log(this.schedule);

    if (this.date % 10 === 1)
      this.date = this.date + "st"
    else if (this.date % 10 === 2)
      this.date = this.date + "nd"
    else if (this.date % 10 === 3)
      this.date = this.date + "rd"
    else
      this.date = this.date + "th"



    if (this.schedule === "Day") {
      this.schedule = "Every Week"
    } else if (this.schedule === "TwoDay") {
      this.schedule = "a Fortnight"
    } else if (this.schedule === "CustomYear") {
      this.schedule = "every Year"
    } else if (this.schedule === "CustomQua") {
      this.schedule = "every Quarter"
    } else if (this.schedule === "Monthly") {
      this.schedule = "every Month"
    } else if (this.schedule === "LastYear") {
      this.day = `31st December`
      this.schedule = `every Year`
    } else if (this.schedule === "FirstYear") {
      this.day = `1st January`
      this.schedule = `every Year`
    } else if (this.schedule === "FirstQua") {
      this.day = `1st Monday`
      this.schedule = `every Quarter`
    } else if (this.schedule === "LastQua") {
      this.day = `last Monday`
      this.schedule = `every Quarter`
    } else {
      console.log("Schedule not captured.")
    }

    if (this.day == undefined || this.day === "") {

      if (this.schedule === "Every Week") {
        this.day = `${this.day}s`
      } else if (this.schedule === "a Fortnight") {
        this.day = `First ${this.day}s`
      } else if (this.schedule === "every Month") {
        this.day = `date ${this.date}`
      } else if (this.schedule === "every Quarter") {
        this.day = `${this.date} of every First month`
      } else if (this.schedule === "every Year") {
        this.day = `${this.date} March`
      } else {
        console.log("Day and Date is not yet confirmed.");
      }

    }


  }

  cancel() {
    this.activeModal.close('Close click')
    this.modalService.open(SelectTimerComponent);
  }

  confirm() {
    this.activeModal.close('Close click')
    console.log(this.store.getAllUsers());
    this.rout.navigateByUrl("/reports")
  }

}