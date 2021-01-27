import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../auth/services/auth.service';
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
    private auth: AuthService,
    private firebaseServiceService: FirebaseServiceService
  ) { }
  public user$: Observable<any> = this.auth.afAuth.user;
  correoCliente;

  async ngOnInit() {
    this.correoCliente = (await this.auth.GetCurrentUser()).email;
    this.metodoFinal();
    //this.clientePedidos(this.correoCliente);
  }




  formateaValor(valor) {
    // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(2);
  }


  // consulta a pedidos del cliente 

  cliente: any;
  pedidos: any[] = [];
  detalles: any;
  coleccionPedidos: any[] = [];
  metodoFinal() {
    this.firebaseServiceService.metodo(this.correoCliente).subscribe(resp => {
      this.cliente = resp;
      console.log(this.cliente[0].id);
      this.firebaseServiceService.getPedidos().subscribe(pedido => {
        this.coleccionPedidos.length=0;
        this.pedidos.length=0;
        pedido.forEach(p => {
          this.coleccionPedidos.push({
            id: p.payload.doc.id,
            id_cliente: p.payload.doc.data()['id_cliente'],
            id_repartidor: p.payload.doc.data()['id_repartidor'],
            total: p.payload.doc.data()['total'],
            lat: p.payload.doc.data()['lat'],
            lon: p.payload.doc.data()['lon'],
            estado: p.payload.doc.data()['estado'],
            fecha: p.payload.doc.data()['fecha'],
            productos: p.payload.doc.data()['productos']
          });
        });
        //console.log("pedidos",this.coleccionPedidos);
        // this.coleccionPedidos.length=0;
        this.coleccionPedidos.forEach(pedido=> {
          //console.log(pedido.id_cliente);
          if(pedido.id_cliente==this.cliente[0].id){
           this.pedidos.push(pedido);
          }
          //
          console.log(this.pedidos);
        });
      });//2
      //

    });// 1
  }




}

/**

cliente: any;
  pedidos:any;
  detalles:any;
  metodoFinal() {
    this.firebaseServiceService.metodo(this.correoCliente).subscribe(resp => {
      this.cliente = resp;
      //console.log(this.cliente[0].id);
      this.firebaseServiceService.metodoPedidosCliente(this.cliente[0].id).valueChanges().subscribe(e=>{
        this.pedidos=e;
          // console.log(e);
          // this.pedidos.forEach(element => {
          //   console.log(element.productos);
          // });
      });
      //

    });
  }


coleccionUsuarios: any[] = [];
  coleccionPedidos: any[] = [];
  coleccionRepartidores: any[] = [];
  coleccionClientePedidosRealizados: any[] = [];
  cliente: any;
  clientePedidos(correo) {
    this.firebaseServiceService.metodo(this.correoCliente).subscribe(resp => { // obtener usuaario
      this.cliente = resp;
      console.log("Usuario", this.cliente[0].id);
      this.firebaseServiceService.getRepartidores().subscribe(re => { // obtener todos los repartidores
        re.forEach((re: any) => {
          this.coleccionRepartidores.push( // coleccion repartidores
            {
              id: re.payload.doc.id,
              nombre: re.payload.doc.data()['nombre']
            }
          )
        });
        console.log("repartidores", this.coleccionRepartidores);
        this.firebaseServiceService.getPedidos().subscribe(pedido => { // obtener todos los pedidos
          pedido.forEach(p => {
            this.coleccionPedidos.push({ // coleccion pedidos
              id: p.payload.doc.id,
              id_cliente: p.payload.doc.data()['id_cliente'],
              id_repartidor: p.payload.doc.data()['id_repartidor'],
              total: p.payload.doc.data()['total'],
              estado: p.payload.doc.data()['estado'],
              fecha: p.payload.doc.data()['fecha'],
              lat: p.payload.doc.data()['lat'],
              lon: p.payload.doc.data()['lon'],
              productos: p.payload.doc.data()['productos']
            });
          });



        });//3
      });//2
    });//1



 */