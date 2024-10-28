import { Component } from '@angular/core';
import { CommonStore } from '../services/commonStore.service';
import { CommonModule } from '@angular/common';
import { Reports } from '../Entities/ReportType';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent {

  dates: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]

  userDetails: Reports | undefined

  constructor(private store: CommonStore) {

    let userId = localStorage.getItem("userId")

    this.userDetails = this.store.getReportForUser(userId)

  }

  clickedItemIndex: number | null = null;

  storeDate(value: number, index: number) {

    console.log(value + " Captured properly");
    

    this.clickedItemIndex = index;
    if (this.userDetails != undefined) {
      this.userDetails.schedule.scheduleType = "Month"
      this.userDetails.schedule.date = value
    }

    console.log(this.userDetails?.schedule.date);
    
  }


}
