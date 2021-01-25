import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-pedidos-realizados',
  templateUrl: './cliente-pedidos-realizados.component.html',
  styleUrls: ['./cliente-pedidos-realizados.component.scss']
})
export class ClientePedidosRealizadosComponent implements OnInit {

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private firebaseServiceService: FirebaseServiceService
  ) { }
  idProducto:string;
  cantidadProducto:string;
  listaProductosSeleccionado:any[]=[];

  ngOnInit(): void {
    this.idProducto=this.rutaActiva.snapshot.params.id;
    this.cantidadProducto=this.rutaActiva.snapshot.paramMap.get('cant');
    console.log(this.cantidadProducto,this.idProducto);
    this.obtenerDatosProductoID(this.idProducto);
  }

  obtenerDatosProductoID(id) {
    this.firebaseServiceService.getProductId(id).subscribe(data => {
      this.listaProductosSeleccionado.push({
        id: data.payload.id,
        nombre: data.payload.data()['nombre'],
        categoria: data.payload.data()['categoria'],
        precio: data.payload.data()['precio'],
        imagen: data.payload.data()['imagen'],
        cantidad: this.cantidadProducto
      });
      console.log(this.listaProductosSeleccionado);
    });
  }




}
