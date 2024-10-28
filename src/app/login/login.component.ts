import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonStore } from '../services/commonStore.service';
import { UserInfo } from '../Entities/UserInfo';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  userId: string = ""
  userPswd: string = ""
	activeModal = inject(NgbActiveModal);

  constructor(private store: CommonStore) {

  }

  ngOnInit(): void {

  }

  login() {
    let user: UserInfo | undefined = this.store.login(this.userId, this.userPswd);
    if(user != undefined){
      localStorage.setItem("userId", this.userId);
      this.activeModal.close("Closed after Login")
      window.location.reload();
    }else{
      alert("Something is wrong, login again")
      this.userPswd = ""
      this.userId = ""
    }
  }

}
