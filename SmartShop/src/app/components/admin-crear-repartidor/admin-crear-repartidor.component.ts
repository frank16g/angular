import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import {FirebaseServiceService} from '../../services/firebase-service.service';
import { AngularFireStorage } from '@angular/fire/storage'; 

@Component({
  selector: 'app-admin-crear-repartidor',
  templateUrl: './admin-crear-repartidor.component.html',
  styleUrls: ['./admin-crear-repartidor.component.scss'],

  providers: [AuthService],
})
export class AdminCrearRepartidorComponent implements OnInit {

  constructor(
    private autSvc:AuthService, 
    private firebaseServiceService: FirebaseServiceService,
    private storage:AngularFireStorage
  ) { }

  ngOnInit(): void {
  }
  pNombre: string;
  pApellido:string;
  pCedula: string;
  pEmail: string;
  pDireccion: string;
  pTelefono: string;
  pContrasena:string;
  
  crearRepartidor(){
    
    let Repartidor ={};
    
    Repartidor['nombre']=this.pNombre;
    Repartidor['apellido']=this.pApellido;
    Repartidor['cedula']=this.pCedula;
    Repartidor['email']=this.pEmail;
    Repartidor['contrasena']=this.pContrasena;
    Repartidor['direccion']=this.pDireccion;
    Repartidor['telefono']=this.pTelefono;
    Repartidor['tipo']='repartidor';
    this.autSvc.register(this.pEmail, this.pContrasena);
    this.firebaseServiceService.crearRepartidor(Repartidor).then(res=>{
      this.pNombre="";
      this.pApellido="";
      this.pCedula="";
      this.pEmail="";
      this.pDireccion="";
      this.pTelefono="";
      this.pContrasena="";
    }).catch(error=>{
      alert('Ingrese todos los datos');
    });
    alert('Repartidor creado');
  }
}
