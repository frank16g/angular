import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {FirebaseServiceService} from '../../services/firebase-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private authSvc: AuthService, private router: Router ,
  private firebaseServiceService:FirebaseServiceService
    ) {
    
  } 

  collectionUsuarios=[];
  
  ngOnInit(): void {
    
  }

  onLogin(event: Event){
    event.preventDefault();
    const {email, password} = this.loginForm.value;
    this.authSvc.login(email, password)
    .then(() => {


      this.firebaseServiceService.getUsuarios().subscribe(resp=>{
        this.collectionUsuarios = resp.map((u: any) => {
          return {
            email: u.payload.doc.data().email,
            tipo: u.payload.doc.data().tipo,
          };
        });
        console.log(this.collectionUsuarios)
        this.collectionUsuarios.forEach(element =>{
          console.log(element)
          if(element.email == email){
            if(element.tipo == "cliente"){
              this.router.navigate(['/cliente']); 
            }else{
              this.router.navigate(['/repartidorPedidosNuevos']); 
            }
          }
        });
      },
      error => {
        console.error(error);
      });


    })
    .catch(() => {
      alert('Usuario no valido');
    });
      
  }
}
