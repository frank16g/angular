import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { AngularFireStorage } from '@angular/fire/storage'; 
import { ReadPropExpr } from '@angular/compiler';

@Component({
  selector: 'app-admin-repartidores',
  templateUrl: './admin-repartidores.component.html',
  styleUrls: ['./admin-repartidores.component.scss']
})
export class AdminRepartidoresComponent implements OnInit {

  constructor(
    private firebaseServiceService: FirebaseServiceService,
    private storage:AngularFireStorage
  ) { }
  repartidor: {};

  pNombre: string;
  pApellido:string;
  pCedula: string;
  pEmail: string;
  pDireccion: string;
  pTelefono: string;
  

  ngOnInit(): void {
    this.firebaseServiceService.getRepartidores().subscribe(data=>{
      this.repartidor = data.map(e=>{
          return{
            id: e.payload.doc.id,
            nombre: e.payload.doc.data()['nombre'],
            apellido: e.payload.doc.data()['apellido'],
            cedula: e.payload.doc.data()['cedula'],
            telefono: e.payload.doc.data()['telefono'],
            email: e.payload.doc.data()['email'],
            lalitud: e.payload.doc.data()['latitud'],
            longitud: e.payload.doc.data()['longitud'],
            tipo: e.payload.doc.data()['tipo'],
            direccion: e.payload.doc.data()['direccion'],
            editar:false
          }
        
      });
      console.log(this.repartidor);
  });
}
EditarRepartidor(Repartidor) {
  Repartidor.editar=true;
  Repartidor.editnombre=Repartidor.nombre;
  Repartidor.edicedula=Repartidor.cedula;
  Repartidor.ediapellido=Repartidor.apellido;
  Repartidor.edidireccion=Repartidor.direccon;
  Repartidor.ediemail=Repartidor.email;
  Repartidor.editelefono=Repartidor.telefono;

}
Editar2(RepartidorEdi){
  console.log(RepartidorEdi);
  let Repartidor={};
  Repartidor['nombre']=RepartidorEdi.ediapellido;
  Repartidor['apellido']=RepartidorEdi.editnombre;
  Repartidor['cedula']=RepartidorEdi.edicedula;
  Repartidor['email']=RepartidorEdi.ediemail;
  Repartidor['telefono']=RepartidorEdi.editelefono;
  Repartidor['direccion']=RepartidorEdi.edidireccion;

  this.firebaseServiceService.updateRepartidor(RepartidorEdi.id,Repartidor);
  RepartidorEdi.editar=false;
}
  EliminarRepartidor(idRepartidor){
  this.firebaseServiceService.deleteRepartidor(idRepartidor);
  }
}