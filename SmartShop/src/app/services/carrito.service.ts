import { Injectable } from '@angular/core';
import {Producto} from '../models/producto.model';
import {BehaviorSubject} from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productos :Producto[]=[];
  private carrito = new BehaviorSubject<Producto[]>([]);
  carrito$ = this.carrito.asObservable();
  
  constructor() { }
  addCarrito(producto: Producto){
    this.productos=[...this.productos,producto];
    this.carrito.next(this.productos);
  }

  deleteCarrito(producto){
    for(let i=0;i<=this.productos.length;i++){
      if(this.productos[i].id==producto.id){
        const eliminado=this.productos.splice(i,1);
        console.log("Eliminado ",eliminado);
        break;
      }
    }
    this.carrito.next(this.productos);
    console.log(this.productos);
  }
}
