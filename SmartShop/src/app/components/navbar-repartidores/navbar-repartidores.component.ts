import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service'

@Component({
  selector: 'app-navbar-repartidores',
  templateUrl: './navbar-repartidores.component.html',
  styleUrls: ['./navbar-repartidores.component.scss']
})
export class NavbarRepartidoresComponent implements OnInit {

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
