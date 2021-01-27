import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service'
import { CarritoService } from '../../../app/services/carrito.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']

})
export class NavbarComponent implements OnInit {

  total=0;

  constructor(
    private authService:AuthService,
    private router : Router,
    private carritoService:CarritoService
  ) { 
    this.carritoService.carrito$.subscribe(products=>{
      console.log(products);
      this.total=products.length;
    });
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    .then(() => {
     this.router.navigate(['./home']);
    });
  }

}
