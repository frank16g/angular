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

  collectionProductos = [];

  ngOnInit(): void {
    
    this.firebaseServiceService.getProductos().subscribe(resp => {
      this.collectionProductos = resp.map((u: any) => {
        // this.collectionProductos.push(u);
        return {
          categoria: u.payload.doc.data().categoria,
          imagen: u.payload.doc.data().imagen,
          iva: u.payload.doc.data().iva,
          nombre: u.payload.doc.data().nombre,
          precio: u.payload.doc.data().precio,
        };
      });
    },
      error => {
        console.error(error);
      }
    );
    
  }

}
