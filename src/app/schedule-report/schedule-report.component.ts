import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiHandlerService } from '../services/api-handler.service';
import { CommonStore } from '../services/commonStore.service';
import { SelectTimerComponent } from '../select-timer/select-timer.component';
import { CommonModule } from '@angular/common';
import { Reports } from '../Entities/ReportType';
import { UserInfo } from '../Entities/UserInfo';
import { Schedule } from '../Entities/Schedule';

@Component({
  selector: 'app-schedule-report',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './schedule-report.component.html',
  styleUrl: './schedule-report.component.css'
})
export class ScheduleReportComponent {

  // Variable to hold functionality of modal
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);

  // Track and Toggle checkbox state
  isChecked = false;

  onCheckboxChange(item: any) {
    item.isChecked = !item.isChecked;
  }

  // variable to show add and cancel button to add new mailId.
  showAdd: boolean = true

  // Checkboxes and resp variable to handle it's data transfer.
  selectReportType: any[] = [
    { id: 1, type: "Fleet Wise Report" },
    { id: 2, type: "Vehicle Wise Report" },
    { id: 3, type: "Trip Wise Report" },
    { id: 4, type: "Driving Scorecard Report" }
  ]

  selectedReportOptions: any[] = []

  // Handle email id entry.
  emails: any[] = [];
  showInputField: boolean = false

  // Handles vehicle related selections
  vehiclesInfo: any[] = []
  selectedVehicleOption: string = "all" // The variable can be used to provide search over different types.
  selectedVehicle: any[] = []

  // Reactive form to take validated input for email.
  emailHandler: FormGroup = new FormGroup({
    inputEmail: new FormControl("", Validators.email)
  })

  // handles search functionality
  searchParam: string = ''
  usersData: UserInfo | undefined;
  userId:any|undefined


  // Holds the functionality to retrieve data from json file at the very beginning while using Service class and subscribe method.
  constructor(private serv: ApiHandlerService, private store: CommonStore) {
    console.log("In the Constructor");
    this.userId = localStorage.getItem("userId");
    this.usersData = this.store.getInfoFor(this.userId);

    if(this.usersData!=undefined)
      this.emails = this.usersData.reports.emails

  }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
    this.usersData = this.store.getInfoFor(this.userId);
    this.findAll();
  }

  findAll() {
    this.serv.getAllVehicles().subscribe(
      data => {
        console.log("Data captured in findAll");
        this.vehiclesInfo = data.vehicles
      }, error => {
        console.log("Vehicles info was not captured from method findAll")
        console.log(error); 
      }
    )
  }

  // Getter Method to handle selected checkboxes of report generation.
  get types(): any {
    return this.selectReportType.filter(
      (elem, index) => this.selectedReportOptions[index]
    )
  }

  // Getter Method to capture content of email input field.
  get inputEmail(): any {
    console.log(this.emailHandler.get('inputEmail'))
    return this.emailHandler.get('inputEmail')
  }

  getSelectedVehicleOption() {
    let vehiclesData: any[] = []
    console.log(this.selectedVehicleOption);

    if (this.selectedVehicleOption != "all") {
      for (let itr of this.vehiclesInfo) {
        if (itr.branch === this.selectedVehicleOption) {
          vehiclesData.push(itr)
        }
      }

      console.log(vehiclesData);
      this.setVehiclesInfo = vehiclesData
      console.log("Value of vehicles info set to " + JSON.stringify(this.vehiclesInfo));
    } else {
      console.log("Else block of search car.");
      this.findAll()
    }

  }

  // Searches for the input given and loads related vehicles in the list.
  searchCar() {
    let vehiclesData: any[] = []
    console.log(this.searchParam);

    if (this.searchParam != "") {
      for (let itr of this.vehiclesInfo) {
        if (itr.registration_number === this.searchParam) {
          vehiclesData.push(itr)
        }
      }

      console.log(vehiclesData);
      this.setVehiclesInfo = vehiclesData
    } else {
      this.findAll()
    }
  }

  // Getter method to handle selected checkboxes of vehicles.
  get vehicles(): any[] {
    let vehicleData: any[] = this.vehiclesInfo.filter(
      (elem: any, index: number) => this.selectedVehicle[index]
    )
    return vehicleData;
  }

  set setVehiclesInfo(input: any[]) {
    this.vehiclesInfo = input;
  }

  // Getter method to ensure the status of next button
  get isNextActive(): boolean {
    let typeFlag: boolean = false
    if (this.emails.length > 0 && this.types.length > 0) {
      for (let i of this.types) {
        if (i.type === "Vehicle Wise Report" && this.vehicles.length === 0) {
          typeFlag = false
        } else if (i.type != "Vehicle Wise Report" && this.vehicles.length > 0) {
          typeFlag = true
        } else {
          typeFlag = true
        }
      }
      return typeFlag;
    } else {
      return typeFlag;
    }
  }

  // Method to show email input based on all the conditions.
  addInputField() {
    if (this.showAdd == true && this.emails.length < 5) {
      this.showInputField = true
      this.showAdd = false
    } else if (this.showAdd === false) {
      this.showAdd = true
      this.showInputField = false
    } else {
      this.showAdd = true
      this.showInputField = false
      alert("Limit of maximum 5 mails has reached.")
    }
  }

  // Method to add email in the list if it's not empty and valid
  addEmail() {
    if (this.inputEmail.value != "" && this.inputEmail.errors == null) {
      this.emails.push(this.inputEmail.value)
      this.showAdd = true
      this.showInputField = false
      this.inputEmail.value = ""
    } else
      alert("Please enter valid email id.")
  }

  // Remove email after clicking over cross.
  removeEmail(i: string) {
    this.emails.splice(this.emails.findIndex(item => item === i), 1);
  }

  // Redirection of modal method.
  openAnotherModel() {
    if (this.isNextActive === true) {
      if (this.usersData != undefined)
        this.usersData.reports = { emails: this.emails, types: this.types, vehicles: this.vehicles, schedule:new Schedule() }
      else{
        alert(`No User Information for ${this.userId} was found.`)
      }

      this.modalService.open(SelectTimerComponent, { windowClass: 'modal' });
      this.activeModal.close('Close click')
    } else if (this.types.length === 0 && this.emails.length > 0) {
      alert("Please keep type of report selected.")
    } else if (this.emails.length === 0 && this.types.length > 0) {
      alert("Please provide valid email ids")
    } else {
      console.log(this.types.length);
      console.log(this.emails.length);

      alert("Please enter mail id and select type of report.")
    }

  }



}
