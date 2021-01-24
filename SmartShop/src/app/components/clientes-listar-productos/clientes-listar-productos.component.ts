import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../../services/firebase-service.service';

@Component({
  selector: 'app-clientes-listar-productos',
  templateUrl: './clientes-listar-productos.component.html',
  styleUrls: ['./clientes-listar-productos.component.scss']
})
export class ClientesListarProductosComponent implements OnInit {

  constructor(
    private firebaseServiceService: FirebaseServiceService
  ) { }

  collectionProductos = []; //Lista de todos los Productos

  ngOnInit(): void {    
    this.cargarProductos();
  }

  // Metodo para obtener todos los Productos
  cargarProductos(){
    this.firebaseServiceService.getProductos().subscribe(resp => {
      this.collectionProductos = resp.map((u: any) => {
          return {
            id: u.payload.doc.id,
            categoria: u.payload.doc.data().categoria,
            imagen: u.payload.doc.data().imagen,
            nombre: u.payload.doc.data().nombre,
            precio: u.payload.doc.data().precio,
          };
      });
      console.log(this.collectionProductos);
    },
      error => {
        console.error(error);
      }
    );
  }

  // Meetodo-boton Agregar Al Carrito 
  AgregarAlCarriro(Producto){
    
  }

}
