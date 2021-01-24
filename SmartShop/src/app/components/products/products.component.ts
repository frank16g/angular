import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../../services/firebase-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private firebaseServiceService: FirebaseServiceService
  ) { }


  pNombre: string;
  pPrecio:Number;
  pIva: boolean;
  pImagen: string;
  pCategoria: string;
  
  crearProducto(){
    let Producto ={};
    Producto['nombre']=this.pNombre;
    Producto['categoria']=this.pCategoria;
    Producto['imagen']=this.pImagen;
    Producto['precio']=this.pPrecio;
    Producto['iva']=false;
    this.firebaseServiceService.createProducto(Producto).then(res=>{
      this.pCategoria="";
      this.pImagen="";
      this.pPrecio=undefined;
      this.pIva=null;
      this.pNombre="";

    }).catch(error=>{
      console.log(error);
    });
  }
  ngOnInit(): void {
  }

}
