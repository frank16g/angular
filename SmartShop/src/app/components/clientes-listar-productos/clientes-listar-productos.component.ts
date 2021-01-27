import { Component, OnInit, ElementRef, ViewChild, } from '@angular/core';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { finalize } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-clientes-listar-productos',
  templateUrl: './clientes-listar-productos.component.html',
  styleUrls: ['./clientes-listar-productos.component.scss']
})
export class ClientesListarProductosComponent implements OnInit {

  total = 0;
  listaProductosSeleccionados: Producto[] = [];
  listaProductosSeleccionadosUnicos: Producto[] = [];
  constructor(
    private firebaseServiceService: FirebaseServiceService,
    private auth: AuthService,
    private carritoService: CarritoService
  ) {
    this.carritoService.carrito$.subscribe(products => {
      console.log(products);
      this.total = products.length;
      this.listaProductosSeleccionados = products;
    });

  }


  cantidadForm = new FormGroup({
    cantidad: new FormControl(''),
    producto: new FormControl('')
  })

  public user$: Observable<any> = this.auth.afAuth.user;
  public user: any;
  public isLogged = false;

  Cantidad: 0;

  cantidadProducto: string;

  correoCliente;

  collectionProductos = []; //Lista de todos los Productos
  listaProductosCompra: [];
  productoCompra: {};
  // Meetodo-boton Agregar Al Carrito 
  seleccionar(_producto) {
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
  async ngOnInit() {
    this.user = await this.auth.GetCurrentUser();
    if (this.user) {
      this.isLogged = true;
    }
    console.log(this.correoCliente);
    //this.arregloProductoPorCategoria.length = 0;
    // llenar el objeto producto con los productos de la BD 
    this.cargarTodosLosProductos();
    //this.arregloProductoPorCategoria.length = 0;
    this.cargarProductoPorCategoria();
    //this.arregloProductoPorCategoria.length = 0;
    // llanar el objeto categoria de los elementos de la BD
    this.cargarListaCategorias();
    this.correoCliente = (await this.auth.GetCurrentUser()).email;
    //console.log(this.correoCliente);
    this.obtenerUsuario(this.correoCliente);
  }


  productoSeleccionado: {};

  //Metodo de agregar productos al carrito
  AgregarAlCarrito(_producto) {
    this.carritoService.addCarrito(_producto);
    this.listaProductosSeleccionadosUnicos = this.limpiarProductosRepetidos(this.listaProductosSeleccionados);
    this.contabilizarProductos();
  }

  EliminarDelCarrito(_producto) {
    this.carritoService.deleteCarrito(_producto);
    this.listaProductosSeleccionadosUnicos = this.limpiarProductosRepetidos(this.listaProductosSeleccionados);
    this.contabilizarProductos();
  }

  limpiarProductosRepetidos(arr: Producto[]) {
    const nuevoarreglo = [];
    arr.forEach(element => {
      if (!nuevoarreglo.includes(element)) {
        nuevoarreglo.push(element);
      }
    });
    return nuevoarreglo;
  }


  contabilizarProductos() {
    this.listaProductosSeleccionadosUnicos.forEach(e => {
      let contador = 0;
      this.listaProductosSeleccionados.forEach(sub => {
        if (e.id == sub.id) {
          contador = contador + 1;
        }
      });
      e.cantidad = contador;
    });
  }


  // AumentarCantidad(id){
  //   this.arregloProductoPorCategoria.forEach(e=>{
  //     if(e.id==id){
  //       if(e.cantidad==0){
  //         e.cantidad=1;
  //       }else{
  //         e.cantidad=e.cantidad+1;
  //       }
  //     }
  //     // console.log(e.cantidad);
  //   }); 
  // }


  coleccionUsuarios: any[] = [];
  usuario: {};
  obtenerUsuario(correo) {
    this.firebaseServiceService.getClienteCorreo().subscribe(resp => {
      this.coleccionUsuarios.length = 0;
      resp.forEach((e: any) => {
        this.coleccionUsuarios.push({
          id: e.payload.doc.id,
          correo: e.payload.doc.data()['email']
        });
      })
      console.log(this.coleccionUsuarios);
      this.coleccionUsuarios.forEach((e) => {
        if (e.correo == correo) {
          this.usuario = {
            id: e.id,
            correo: e.correo
          }
        }
      });
      console.log(this.usuario);
    });
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
          cantidad: 0,
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
          cantidad: 0,
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










 let p={
      id:_producto.id,
      nombre:_producto.nombre,
      imagen:_producto.imagen,
      precio:_producto.precio,
      categoria:_producto.categoria,
      cant:1
    }
    if(this.listaProductosSeleccionados.length==0){
      this.listaProductosSeleccionados.push(p);
    }else{
      let flat=false;
      this.listaProductosSeleccionados.forEach(e=>{
        if(e.id == _producto.id){
          //sumar cantidad
          flat = true;
          //sumo
          e.cant=e.cant+1;
          this.AumentarCantidad(e.id);
        }
      });
      if(!flat){
        //añadir producto
      this.listaProductosSeleccionados.push(p);
      }
    }




*/