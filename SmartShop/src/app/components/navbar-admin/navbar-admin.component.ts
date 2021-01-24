import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service'

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout()
    .then(() => {
     this.router.navigate(['./home']);
    });
  }
}
