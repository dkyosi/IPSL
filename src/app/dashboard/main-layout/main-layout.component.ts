import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  loggedUser: any = {}
  isOpen: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const user:any = localStorage.getItem("user")
    this.loggedUser = JSON.parse(user);
  }

  toggleSideMenu() {
    this.isOpen = !this.isOpen;
  }

  closeSideMenu(){
    this.isOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}
