import { Component, OnInit, ElementRef, ViewChild, } from '@angular/core';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { AuthService } from '../../auth/services/auth.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-clientes-listar-productos',
  templateUrl: './clientes-listar-productos.component.html',
  styleUrls: ['./clientes-listar-productos.component.scss']
})
export class ClientesListarProductosComponent implements OnInit {

  constructor(
    private firebaseServiceService: FirebaseServiceService,
    private auth: AuthService
  ) { }

  cantidadProducto: string;

  collectionProductos = []; //Lista de todos los Productos
  listaProductosCompra: any[] = [];
  // Meetodo-boton Agregar Al Carrito 
  AgregarAlCarriro(_producto) {
    _producto.agregar = true;
    // crea el objeto
  }

  producto: any[] = [];              // arreglo de los productos DB
  allProducts: any[];
  arregloProductoPorCategoria: any[] = [];  // arreglo a dee los productos por categorias (combox)

  categoria: {};             // lista de categorias DB
  // categoriaCrear: string;   // obtener categoria para agregarle  
  categoriaBuscar: string;  // obtener categoria y buscar esas categorias
  categoriaEditar: string;   // obtener categoria para editar



  a: number;
  ngOnInit() {
    //this.arregloProductoPorCategoria.length = 0;
    // llenar el objeto producto con los productos de la BD 
    this.cargarTodosLosProductos();
    //this.arregloProductoPorCategoria.length = 0;
    this.cargarProductoPorCategoria();
    //this.arregloProductoPorCategoria.length = 0;
    // llanar el objeto categoria de los elementos de la BD
    this.cargarListaCategorias();
  }

  cargarTodosLosProductos() {
    this.firebaseServiceService.getProductos().subscribe(resp => {
      this.arregloProductoPorCategoria.length = 0;
      resp.forEach((element: any) => {
        this.arregloProductoPorCategoria.push({
          id: element.payload.doc.id,
          nombre: element.payload.doc.data().nombre,
          categoria: element.payload.doc.data().categoria,
          precio: element.payload.doc.data().precio,
          imagen: element.payload.doc.data().imagen,
          agregar: false
        });
      });
      console.log(this.arregloProductoPorCategoria);
    });
  }

  cargarProductoPorCategoria() {
    // collecion productos
    this.producto.length = 0;
    this.arregloProductoPorCategoria.length = 0;
    this.firebaseServiceService.getProductos().subscribe(resp => {
      resp.forEach((element: any) => {
        //console.log(element.payload.doc.id);
        this.producto.push({
          id: element.payload.doc.id,
          nombre: element.payload.doc.data().nombre,
          categoria: element.payload.doc.data().categoria,
          precio: element.payload.doc.data().precio,
          imagen: element.payload.doc.data().imagen,
          agregar: false
        });
      });
      console.log(this.categoriaBuscar);
      if (this.categoriaBuscar != "Todas") {
        // console.log(this.producto);
        this.producto.forEach(element => {
          //console.log("size p"+this.producto.length);
          //console.log(element.categoria);
          if (this.categoriaBuscar == element.categoria) {
            //   console.log("size pc"+this.arregloProductoPorCategoria.length);
            this.arregloProductoPorCategoria.push(element);
          }
        });
        // console.log(this.arregloProductoPorCategoria);
      } else {
        this.cargarTodosLosProductos();
      }

    });
  }

  cargarListaCategorias() {
    this.arregloProductoPorCategoria.length = 0;
    this.firebaseServiceService.getCategorias().subscribe(data => {
      this.categoria = data.map(e => {
        return {
          id: e.payload.doc.id,
          iva: e.payload.doc.data()['iva'],
          tipo: e.payload.doc.data()['tipo']
        }
      });
      //console.log(this.categoria);
    });
  }

  
  //******* capturar categorias de los combos*********
  // obtener categoria y buscar categorias
  obtenerCategoriaBuscar(e) {
    this.categoriaBuscar = e.target.value;
    this.cargarProductoPorCategoria();
  }

}


/*
// Metodo para obtener todos los Productos
  cargarProductos() {
    this.firebaseServiceService.getProductos().subscribe(resp => {
      this.collectionProductos = resp.map((u: any) => {
        return {
          id: u.payload.doc.id,
          categoria: u.payload.doc.data().categoria,
          imagen: u.payload.doc.data().imagen,
          nombre: u.payload.doc.data().nombre,
          precio: u.payload.doc.data().precio,
          agregar: false
        };
      });
      console.log(this.collectionProductos);
    },
      error => {
        console.error(error);
      }
    );
  }
*/

/*
let Producto = {
      id: _producto.id,
      categoria: _producto.categoria,
      imagen: _producto.imagen,
      nombre: _producto.nombre,
      precio: _producto.precio,
      cantidad: 1
    };
    // si es primer producto lo crea
    if (this.listaProductosCompra.length == 0) {
      this.listaProductosCompra.push(Producto);
    } else {  // del segundo producto en adelante
      this.listaProductosCompra.forEach(element => {
        if (Producto.id != element.id) {  // si las id son distintas
          this.listaProductosCompra.push(Producto);
          console.log("Producto Agregado");
        } else {
          const nuevaCantidad = element.cantidad + Producto.cantidad
          element.cantidad = nuevaCantidad;
          console.log("Nueva Cantidad" + nuevaCantidad);
        }
      });
    }
    console.log(this.listaProductosCompra);
    _producto.id = 0;
    _producto.categoria = 0;
    _producto.imagen = 0;
    _producto.nombre = 0;
    _producto.precio = 0;
*/