import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cliente-cantidad-producto',
  templateUrl: './cliente-cantidad-producto.component.html',
  styleUrls: ['./cliente-cantidad-producto.component.scss'],
  providers: [DatePipe]
})
export class ClienteCantidadProductoComponent implements OnInit {

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private firebaseServiceService: FirebaseServiceService,
    private datePipe: DatePipe
  ) {
    //this.fechaActual=this.datePipe.transform(this.fechaActual, 'yyyy-MM-dd');
  }
  idProducto: string;

  idUsuarioLogeado: string = "1";
  correoUsuarioLogeado: string;


  fechaActual = new Date();
  pNombre: string;
  pPrecio: Number;
  pIva: boolean;
  pImagen: string;
  pCategoria: string;
  producto: any[] = [];
  categoria: {};             // lista de categorias DB
  cantidadProducto: number;

  ngOnInit(): void {
    this.idProducto = this.rutaActiva.snapshot.params.id;
    this.obtenerDatosProductoID(this.idProducto);
    console.log(this.idProducto);
  }

  listaTodosProductosSeleccionados:any[]=[];
  
  EnviarDatosAlCarrito(id, cant) {
    // crear el pedido con los datos del cliente actual
    this.crearPedido(this.idUsuarioLogeado);
    console.log(id + "---" + cant);
  }

  //Metodo de crear Pedido
  crearPedido(idUsuario) {
    let Pedido: {
      id_cliente: string,
      id_repartidor: string,
      fecha: DatePipe,
      total: number
    }
    
  }

  // Obtener el producto 
  obtenerDatosProductoID(id) {
    this.firebaseServiceService.getProductId(id).subscribe(data => {
      this.producto.length = 0;
      this.producto.push({
        id: data.payload.id,
        nombre: data.payload.data()['nombre'],
        categoria: data.payload.data()['categoria'],
        precio: data.payload.data()['precio'],
        imagen: data.payload.data()['imagen']
      });
      console.log(this.producto);
      this.producto.forEach(element => {
        this.pCategoria = element.categoria,
          this.pNombre = element.nombre,
          this.pPrecio = element.precio,
          this.pImagen = element.imagen
      });
    });
  }
}
