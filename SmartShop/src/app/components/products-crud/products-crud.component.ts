import { Component, OnInit, ElementRef,ViewChild,AfterContentInit} from '@angular/core';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { AngularFireStorage } from '@angular/fire/storage'; 
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-crud',
  templateUrl: './products-crud.component.html',
  styleUrls: ['./products-crud.component.scss']
})
export class ProductsCrudComponent implements OnInit {
  constructor(
    private firebaseServiceService: FirebaseServiceService,
    private storage:AngularFireStorage
  ) { }
  producto: {};
  categoria:{}  ;
  cate: string;

  uploadPorcent: Observable<number>;
  urlImage: Observable<string>;
  
  @ViewChild('imageProduct') inputImageProduct:ElementRef;
  // @ViewChild('imageProductEdit') editImageProduct:ElementRef;
 
  pNombre: string;
  pPrecio:Number;
  pIva: boolean;
  pImagen: string;
  pCategoria: string;
  
  crearProducto(){
    let Producto ={};
    Producto['nombre']=this.pNombre;
    Producto['categoria']=this.cate;
    Producto['imagen']=this.inputImageProduct.nativeElement.value;
    Producto['precio']=this.pPrecio;
    this.firebaseServiceService.createProducto(Producto).then(res=>{
      this.pCategoria="";
      this.pImagen="";
      this.pPrecio=undefined;
      this.pNombre="";
    }).catch(error=>{
      console.log(error);
    });
    this.inputImageProduct.nativeElement.value="";
  }
  
  obtenerImagen(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `products/producto_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    //this.uploadPorcent= task.porcentageChanges();
    task.snapshotChanges().pipe(finalize(()=>this.urlImage=ref.getDownloadURL())).subscribe();
    console.log(this.urlImage);
  }


  obtenerCategoria(e){
    this.cate=e.target.value;
    console.log(this.cate);
  }
  ngOnInit(){
    this.firebaseServiceService.getProductos().subscribe(data=>{
      this.producto = data.map(e=>{
        return{
          id: e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'],
          categoria: e.payload.doc.data()['categoria'],
          precio: e.payload.doc.data()['precio'],
          imagen:e.payload.doc.data()['imagen'],
          editar:false
        }
      });
      console.log(this.producto);
    });
    this.firebaseServiceService.getCategorias().subscribe(data=>{
      this.categoria = data.map(e=>{
        return{
          id: e.payload.doc.id,
          iva: e.payload.doc.data()['iva'],
          tipo: e.payload.doc.data()['tipo']
        }
      });
      console.log(this.categoria);
    });
    
  }

  EditarProducto(Producto) {
    Producto.editar=true;
    Producto.editnombre=Producto.nombre;
    Producto.editCategoria=Producto.categoria;
    Producto.editPrecio=Producto.precio;
    Producto.editImagen=this.inputImageProduct.nativeElement.value;
  }

  Editar2(ProductoEdit){
    console.log(this.inputImageProduct.nativeElement.value);
    console.log(ProductoEdit);
    let Producto={};
    Producto['categoria']=this.cate;
    Producto['nombre']=ProductoEdit.editnombre;
    Producto['precio']=ProductoEdit.editPrecio;
    Producto['imagen']=this.inputImageProduct.nativeElement.value;
    this.firebaseServiceService.updateProducto(ProductoEdit.id,Producto);
    ProductoEdit.editar=false;
    this.inputImageProduct.nativeElement.value="";
  }

  EliminarProducto(idProducto){
    this.firebaseServiceService.deleteProducto(idProducto);
  }
  
}
