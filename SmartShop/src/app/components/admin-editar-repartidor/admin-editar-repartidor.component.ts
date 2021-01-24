import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { AngularFireStorage } from '@angular/fire/storage'; 
import { runInThisContext } from 'vm';
@Component({
  selector: 'app-admin-editar-repartidor',
  templateUrl: './admin-editar-repartidor.component.html',
  styleUrls: ['./admin-editar-repartidor.component.scss']
})
export class AdminEditarRepartidorComponent implements OnInit {

  constructor(
    private rutaActiva: ActivatedRoute,
    private firebaseServiceService: FirebaseServiceService,
    private storage:AngularFireStorage
  ) { }

  repartidor: any[]=[];
  idRe:string;
  pID:string;
  pNombre: string;
  pApellido:string;
  pCedula: string;
  pEmail: string;
  pDireccion: string;
  pTelefono: string;
  pContrasena:string;
  ngOnInit(): void {
    //this.firebaseServiceService.getRepartidorId(this.rutaActiva.snapshot.params.id);
   this.idRe=this.rutaActiva.snapshot.params.id;
   this.obtenerDatosRepartidorID(this.idRe);
    
  }

obtenerDatosRepartidorID(idRe){
  
    this.firebaseServiceService.getRepartidorId(idRe).subscribe(data => {
      this.repartidor.length=0;
      this.repartidor.push( {
        id: data.payload.id,
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          cedula: data.payload.data()['cedula'],
          telefono: data.payload.data()['telefono'],
          email: data.payload.data()['email'],
          tipo: data.payload.data()['longitud'],
          direccion: data.payload.data()['direccion'],
          contrasena:data.payload.data()['contrasena']
      });
      this.repartidor.forEach(element=>{
        this.pID=element.id,
        this.pNombre=element.nombre,
        this.pApellido=element.apellido,
        this.pCedula=element.cedula,
        this.pDireccion=element.direccion,
        this.pEmail=element.email,
        this.pTelefono=element.telefono,
        this.pContrasena=element.contrasena
      });
    });
  
}

  // EditarRepartidor(Repartidor) {
  //   Repartidor.editar=true;
  //   Repartidor.editnombre=Repartidor.nombre;
  //   Repartidor.edicedula=Repartidor.cedula;
  //   Repartidor.ediapellido=Repartidor.apellido;
  //   Repartidor.edidireccion=Repartidor.direccon;
  //   Repartidor.ediemail=Repartidor.email;
  //   Repartidor.editelefono=Repartidor.telefono;
  
  // }
  // Editar2(RepartidorEdi){
  //   console.log(RepartidorEdi);
  //   let Repartidor={};
  //   Repartidor['nombre']=RepartidorEdi.ediapellido;
  //   Repartidor['apellido']=RepartidorEdi.editnombre;
  //   Repartidor['cedula']=RepartidorEdi.edicedula;
  //   Repartidor['email']=RepartidorEdi.ediemail;
  //   Repartidor['telefono']=RepartidorEdi.editelefono;
  //   Repartidor['direccion']=RepartidorEdi.edidireccion;
  
  //   this.firebaseServiceService.updateRepartidor(RepartidorEdi.id,Repartidor);
  //   RepartidorEdi.editar=false;
  // }
  EditarRepartidor(id){
    let repartidor={};
    repartidor['nombre']=this.pNombre;
    repartidor['apellido']=this.pApellido;
    repartidor['cedula']=this.pCedula;
    repartidor['direccion']=this.pDireccion;
    repartidor['telefono']=this.pTelefono;
    repartidor['email']=this.pEmail;
    this.firebaseServiceService.updateRepartidor(id,repartidor);
    alert('Repartidor Actualizado');
    this.pNombre="";
      this.pApellido="";
      this.pCedula="";
      this.pEmail="";
      this.pDireccion="";
      this.pTelefono="";
      this.pContrasena="";
  }
}
