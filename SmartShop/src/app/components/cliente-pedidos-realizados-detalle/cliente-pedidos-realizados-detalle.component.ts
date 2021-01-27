import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { AngularFireStorage } from '@angular/fire/storage'; 
import { runInThisContext } from 'vm';
import { AuthService } from '../../auth/services/auth.service';
@Component({
  selector: 'app-cliente-pedidos-realizados-detalle',
  templateUrl: './cliente-pedidos-realizados-detalle.component.html',
  styleUrls: ['./cliente-pedidos-realizados-detalle.component.scss']
})
export class ClientePedidosRealizadosDetalleComponent implements OnInit {

  constructor(
    private rutaActiva: ActivatedRoute,
    private firebaseServiceService: FirebaseServiceService,
    private auth: AuthService
  ) { }
  idPedido:string;
  coleccionPedidos:any[]=[];
  pedidos:any[]=[];
  correoCliente;
  async ngOnInit() {
    this.correoCliente = (await this.auth.GetCurrentUser()).email;
    this.idPedido=this.rutaActiva.snapshot.params.id;
    this.ObtenerPedido(this.idPedido);
  }
  cliente: any;
  ObtenerPedido(id){

    this.firebaseServiceService.metodo(this.correoCliente).subscribe(resp => {
      this.cliente = resp;
      console.log(this.cliente[0].id);
      this.firebaseServiceService.getPedidos().subscribe(pedido => {
        this.coleccionPedidos.length=0;
        pedido.forEach(p => {
          this.coleccionPedidos.push({
            id: p.payload.doc.id,
            id_cliente: p.payload.doc.data()['id_cliente'],
            nombre:this.cliente[0].nombre,
            apellido:this.cliente[0].apellido,
            telefono:this.cliente[0].telefono,
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
        this.coleccionPedidos.forEach(pedido=> {
          //console.log(pedido.id_cliente);
          if(pedido.id==id){
           this.pedidos.push(pedido);
          }
          //
          console.log(this.pedidos);
        });
      });//2
    });
    
  }

}
