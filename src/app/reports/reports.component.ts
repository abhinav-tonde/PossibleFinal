import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleReportComponent } from '../schedule-report/schedule-report.component';
import { LoginComponent } from '../login/login.component';
import { CommonStore } from '../services/commonStore.service';
import { Reports } from '../Entities/ReportType';
import { CommonModule } from '@angular/common';
import { VehiclesPipe } from '../Pipes/vehicles.pipe';
import { MailFormatterPipe } from '../Pipes/mail-formatter.pipe';
import { TypeFormatterPipe } from '../Pipes/array-formatter.pipe';
import { UserInfo } from '../Entities/UserInfo';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, TypeFormatterPipe, MailFormatterPipe, VehiclesPipe],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {

  private modalService = inject(NgbModal);
  loggedInUser: any
  usersData: Reports | undefined;
  day: any | undefined
  schedule: any | undefined
  timing: any | undefined
  date: any | undefined
  userInfo: UserInfo | undefined

  constructor(private store: CommonStore) {

    if(localStorage.getItem('userId')!=null)
      this.loggedInUser = localStorage.getItem('userId')
    else
      this.loggedInUser = "GUEST"

    this.userInfo = this.store.getInfoFor(this.loggedInUser);

  }

  ngOnInit(): void {

    if (this.loggedInUser === null || this.loggedInUser === "GUEST") {
      this.showLoginWindow()
    } else {
      this.usersData = this.store.getReportForUser(this.loggedInUser)

      this.schedule = this.usersData.schedule.scheduleType
      this.timing = this.usersData.schedule.scheduleTiming
      this.day = this.usersData.schedule.day
      this.date = this.usersData.schedule.date


      if (this.schedule === "Day") {
        this.schedule = "Every Week"
      } else if (this.schedule === "TwoDay") {
        this.schedule = "a Fortnight"
      } else if (this.schedule === "CustomYear") {
        this.schedule = "every Year"
      } else if (this.schedule === "CustomQua") {
        this.schedule = "every Quarter"
      } else if (this.schedule === "Month") {
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
      } else if (this.schedule === "Month") {
        this.schedule = `every Month`
      } else {
        console.log("Schedule not captured.")
      }

      if (this.day === undefined) {

        if (this.schedule === "Every Week") {
          this.day = `${this.day}s`
        } else if (this.schedule === "a Fortnight") {
          this.day = `First ${this.day}s`
        } else if (this.schedule === "every Month") {
          this.day = `date ${this.date}`
        } else if (this.schedule === "every Quarter") {

          if (this.date % 10 === 1)
            this.date = this.date + "st"
          else if (this.date % 10 === 2)
            this.date = this.date + "nd"
          else if (this.date % 10 === 3)
            this.date = this.date + "rd"
          else
            this.date = this.date + "th"

          this.day = `${this.date} of every First month`
        } else if (this.schedule === "every Year") {
          this.day = `${this.date} March`
        } else {
          console.log("Day and Date is not yet confirmed.");
        }

      }

    }

    console.log(this.usersData);

  }

  showLoginWindow() {
    this.modalService.open(LoginComponent, { size: 'lg' });
  }

  startSchedule() {
    this.modalService.open(ScheduleReportComponent, { windowClass: 'modal' })
  }

  startModal() {
    this.modalService.open(ScheduleReportComponent, { windowClass: 'modal' })
  }

}
