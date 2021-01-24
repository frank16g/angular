import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']

})
export class NavbarComponent implements OnInit {

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
