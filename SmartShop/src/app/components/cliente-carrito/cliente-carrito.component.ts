import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { from, Observable } from 'rxjs';
import { Producto } from '../../models/producto.model';
import { stringify } from '@angular/compiler/src/util';
import * as L from 'leaflet';
import { ServiceMapService } from '../../services/service-map.service';
// import { firestore } from 'firebase-admin';

@Component({
  selector: 'app-cliente-carrito',
  templateUrl: './cliente-carrito.component.html',
  styleUrls: ['./cliente-carrito.component.scss']
})
export class ClienteCarritoComponent implements OnInit, AfterViewInit {
  listaProductosSeleccionados: Producto[] = [];
  listaProductosNoRepetidos: Producto[] = [];
  total = 0;
  subtotal = 0;
  iva = 0;
  correoCliente;
  latitud: any;
  longi: any;
  data: any;
  imprimir: boolean = false;
  constructor(
    private firebaseServiceService: FirebaseServiceService,
    private auth: AuthService,
    private carritoService: CarritoService,
    private serviceMapService: ServiceMapService
  ) {
    this.carritoService.carrito$.subscribe(products => {
      console.log(products);
      this.listaProductosSeleccionados = products;
    });
  }

  public user$: Observable<any> = this.auth.afAuth.user;
  public user: any;
  public isLogged = false;
  idDelPedido = "p";

  async ngOnInit() {
    this.correoCliente = (await this.auth.GetCurrentUser()).email;
    this.obtenerUsuario(this.correoCliente);
    this.listaProductosNoRepetidos = this.productosNoRepetidos(this.listaProductosSeleccionados);
    this.contabilizarProductos();
    this.metodoFinal();
    console.log(this.listaProductosNoRepetidos, this.listaProductosSeleccionados);
    this.calcularTotales();
  }
  cliente: any;

  pedido: any = {
    fecha: '', id_cliente: '', id_repartidor: '', estado: '', productos: this.listaProductosSeleccionados, total: '',
    lat: '', lon: ''
  };


  metodoFinal() {
    this.firebaseServiceService.metodo(this.correoCliente).subscribe(resp => {
      this.cliente = resp;

    });
  }

  agregarPedidoFinal() {
    //console.log(this.cliente);
    var mensaje;
    var opcion = confirm("Confirmar Pedido?");
    if (opcion == true) {
      var f = new Date();
      this.pedido = {
        id_cliente: this.cliente[0].id,
        id_repartidor: 'null',
        fecha: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
        estado: "no entregado",
        productos: this.listaProductosNoRepetidos,
        total: this.total,
        lat: this.latitud,
        lon: this.longi
      }
      console.log(this.pedido);
      this.firebaseServiceService.createPedido(this.pedido);
      this.imprimir = true;
    } else {
      mensaje = "Has clickado Cancelar";
    }
  }


  productosNoRepetidos(arr: Producto[]) {
    const nuevoarreglo = [];
    arr.forEach(element => {
      if (!nuevoarreglo.includes(element)) {
        nuevoarreglo.push(element);
      }
    });
    return nuevoarreglo;
  }

  // conteo de productos
  contabilizarProductos() {
    this.listaProductosNoRepetidos.forEach(e => {
      let contador = 0;
      this.listaProductosSeleccionados.forEach(sub => {
        if (e.id == sub.id) {
          contador = contador + 1;
        }
      });
      e.cantidad = contador;
    });
  }

  formateaValor(valor) {
    // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(2);
  }

  //Metodo calculo de valores
  calcularTotales() {
    let categorias = [];
    this.firebaseServiceService.getCategorias().subscribe(res => {
      res.forEach(categoria => {
        categorias.push({
          id: categoria.payload.doc.id,
          iva: categoria.payload.doc.data()['iva'],
          tipo: categoria.payload.doc.data()['tipo']
        });
      });

      this.listaProductosNoRepetidos.forEach(e => {
        this.total = this.total + e.cantidad * e.precio;
        categorias.forEach(c => {
          if (c.iva && e.categoria == c.tipo) {
            this.iva = this.iva + (e.precio * e.cantidad * 0.12);
          }
        });
      });
      this.subtotal = this.total - this.iva;
      console.log(this.total, this.subtotal, this.iva)
    });

  }


  coleccionUsuarios: any[] = [];
  usuario: {};
  // Metodo obtener usuario
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

  // finalizar compra
  listaPedidos = [];
  veces = 0;
  finalizarCompra() {
    if (this.veces == 0) {
      this.crearPedido();
      //this.crearDetalle();
    }

  }

  crearPedido() {
    let correo = this.correoCliente; // correo user

    var f = new Date(); // fecha
    this.firebaseServiceService.getClienteCorreo().subscribe(resp => { // consulta cliente
      this.coleccionUsuarios.length = 0;
      resp.forEach((e: any) => {
        this.coleccionUsuarios.push({ //lista usuario
          id: e.payload.doc.id,
          apellido: e.payload.doc.data()['apellido'],
          nombre: e.payload.doc.data()['nombre'],
          cedula: e.payload.doc.data()['cedula'],
          correo: e.payload.doc.data()['email'],
          telefono: e.payload.doc.data()['telefono'],
          lat: e.payload.doc.data()['lat'],
          lon: e.payload.doc.data()['lon'],
          tipo: e.payload.doc.data()['tipo']
        });
      });
      //console.log(this.coleccionUsuarios);
      let Usuario: { // creamos Userui
        id: string,
        apellido: string,
        nombre: string,
        cedula: string,
        correo: string,
        telefono: string,
        lat: string,
        lon: string,
        tipo: string
      }
      this.coleccionUsuarios.forEach((e) => {//recorremos lista usuario
        if (e.correo == correo) { // el cooreo == al crreo
          Usuario = {       // obtemos el uauuri
            id: e.id,
            apellido: e.apellido,
            nombre: e.nombre,
            cedula: e.cedula,
            correo: e.correo,
            telefono: e.telefono,
            lat: e.lat,
            lon: e.lon,
            tipo: e.tipo
          }
        }
      });
      //console.log(Usuario.id);
      this.firebaseServiceService.getPedidos().subscribe(pedido => { // consulta a los pedidos
        pedido.forEach(p => { // recorrer pedidos
          this.listaPedidos.push({    // agregamos los pedidos
            id: p.payload.doc.id
          });
        });
      });
      // colecion pedido di
      // detalle id_perpedido
      let longitud = this.listaPedidos.length; // tamaño del arreglo pedidos
      let Pedido: { // crear obejeto pedido
        id_pedido: number,
        id_cliente: string,
        id_repartidor: string,
        fecha: string,
        total: number,
        lat: string,
        lon: string,
        estado: string
      }
      Pedido = { // asignar pedido 
        id_pedido: 1,
        id_cliente: Usuario.id,
        id_repartidor: "null",
        fecha: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
        total: this.total,
        lat: Usuario.lat,
        lon: Usuario.lon,
        estado: "no entregado"
      }

      if (this.idDelPedido = "p") {
        this.idDelPedido = "ss";
        this.firebaseServiceService.createPedido(Pedido).then(res => {
        }).catch(error => {
          console.log(error);
        });
      }

      console.log(this.idDelPedido);
      console.log(Pedido);
    });
  }


  alerta() {
    var mensaje;
    var opcion = confirm("Clicka en Aceptar o Cancelar");
    if (opcion == true) {
      mensaje = "Has clickado OK";
    } else {
      mensaje = "Has clickado Cancelar";
    }
    console.log(mensaje);
  }

  crearDetalle() {
    this.firebaseServiceService.getPedidos().subscribe(pedido => { // consulta a los pedidos
      pedido.forEach(p => { // recorrer pedidos
        this.listaPedidos.push({    // agregamos los pedidos
          id: p.payload.doc.id
        })
      });
      let longitud = this.listaPedidos.length;
      let Detalle: {  // creamos detalle 
        id_pedido: number,
        id_producto: string,
        cantidad: number,
        subtotal: number
      }
      this.listaProductosNoRepetidos.forEach(detalle => { // recorremos lista prodyctos 
        Detalle = { // el producto se agrega al objeto
          id_pedido: longitud + 1,
          id_producto: detalle.id,
          cantidad: detalle.cantidad,
          subtotal: detalle.cantidad * detalle.precio
        }
        // this.firebaseServiceService.createDetallePedido(Detalle).then(res => {

        // }).catch(error => {
        //   console.log(error);
        // });
        console.log(Detalle);

      });
    });
  }
  ngAfterViewInit(): void {
    this.initMap();

  }
  private initMap(): void {
    let iconMarkerDr = L.icon({
      iconUrl: './assets/mark.png',
      iconSize: [60, 60],
      iconAnchor: [30, 60]
    })

    let myMap = L.map('map').setView([-1.2490800, -78.6167500], 13)
    var marker = L.marker([-1.2490800, -78.6167500], { icon: iconMarkerDr }).addTo(myMap);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(myMap);
    myMap.on('click', e => {
      let latLng = myMap.mouseEventToLatLng((e as L.LeafletMouseEvent).originalEvent);
      marker.setLatLng([latLng.lat, latLng.lng]);
      this.latitud = latLng.lat;
      this.longi = latLng.lng;
      this.data = this.serviceMapService.getServicesMap(latLng.lat, latLng.lng);
    })
    myMap.doubleClickZoom.disable();
  }
}

/*


let iconMarkerDr = L.icon({
              iconUrl: './assets/mark.png',
              iconSize: [60, 60],
              iconAnchor: [30, 60]
              })
              let myMap = L.map('map').setView([c.payload.doc.data()['lat'], c.payload.doc.data()['lon']], 15)
              var marker = L.marker([c.payload.doc.data()['lat'], c.payload.doc.data()['lon']], {icon: iconMarkerDr}).addTo(myMap);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18,
            }).addTo(myMap);
            myMap.doubleClickZoom.disable();
          });




    let usuario={};
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
        if (e.correo == this.correoCliente) {
          usuario = {
            id: e.id,
            correo: e.correo
          }
        }
      });
      console.log(this.usuario);
      this.firebaseServiceService.getPedidos().subscribe(pedido => {
        listaPedidos.forEach(p => {
          listaPedidos.push({
            id: p.payload.doc.id
          })
        });

        let longitud = listaPedidos.length;

        let Pedido = {
          id: longitud + 1,
          id_cliente: usuario.id,

        }


      });
    });

*/