import { Injectable } from '@angular/core';
import {Producto} from '../models/producto.model';
import {Detalle} from '../models/detalle.model';
import {Pedido} from '../models/pedido.model';
import {User} from '../models/user.model';
import { AuthService } from '../auth/services/auth.service';
import { FirebaseServiceService } from './firebase-service.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private Usuario:User;
  private Detalle:Detalle;
  private pedido:Pedido[]=[];
  constructor(
    private firebaseServiceService:FirebaseServiceService
  ) { }

  obtenerPedidos(){
    this.firebaseServiceService.getPedidos().subscribe(resp=>{
      
    });
  }
}
