import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  private modalService = inject(NgbModal);
  loggedInUser:any

  constructor(private rout:Router){
    this.loggedInUser = localStorage.getItem('userId')
  }

  get isUserLoggedIn():boolean{
    if(this.loggedInUser === null){
      return false
    }else{
      return true;
    }
  }

  showLoginWindow(){
		this.modalService.open(LoginComponent, { size: 'lg' });
  }
  
  logout(){
    localStorage.clear();
    this.rout.navigateByUrl("/home")
    window.location.reload()
  }

}
