import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-editar-producto',
  templateUrl: './admin-editar-producto.component.html',
  styleUrls: ['./admin-editar-producto.component.scss']
})
export class AdminEditarProductoComponent implements OnInit {

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private firebaseServiceService: FirebaseServiceService,
    private storage: AngularFireStorage
  ) { }
  idProducto: string;
  ngOnInit(): void {
    this.idProducto = this.rutaActiva.snapshot.params.id;
    this.obtenerDatosProductoID(this.idProducto);
    this.cargarListaCategorias();
  }

  pNombre: string;
  pPrecio: Number;
  pIva: boolean;
  pImagen: string;
  pCategoria: string;
  producto: any[] = [];
  categoria: {};             // lista de categorias DB
  categoriaEditar: string;   // obtener categoria para agregarle  

  uploadPorcent: Observable<number>;
  urlImage: Observable<string>; // variable para la url 
  // recuperar la url de la imagen
  @ViewChild('imageProduct') inputImageProduct: ElementRef;

  obtenerDatosProductoID(id) {
    this.firebaseServiceService.getProductId(id).subscribe(data => {
      this.producto.length=0;
      this.producto.push({
        id: data.payload.id,
        nombre: data.payload.data()['nombre'],
        categoria: data.payload.data()['categoria'],
        precio: data.payload.data()['precio'],
        imagen: data.payload.data()['imagen']
      });
      console.log(this.producto);
      this.producto.forEach(element => {
        this.pCategoria=element.categoria,
        this.pNombre=element.nombre,
        this.pPrecio=element.precio,
        this.pImagen=element.imagen
      });
    });
  }

  editarProducto(id){
    console.log(this.inputImageProduct.nativeElement.value);
    let Producto = {};
    if(this.categoriaEditar!=null){
    Producto['categoria'] = this.categoriaEditar;
    }else{
      Producto['categoria'] = this.pCategoria;
    }
    Producto['nombre'] = this.pNombre;
    Producto['precio'] = this.pPrecio;
    let i = this.inputImageProduct.nativeElement.value;
    if(i.length!=0){
      Producto['imagen'] = this.inputImageProduct.nativeElement.value;
      this.inputImageProduct.nativeElement.value = "";
    }else{
      Producto['imagen'] = this.pImagen;
    }
    this.firebaseServiceService.updateProducto(id,Producto);
    this.inputImageProduct.nativeElement.value = null;
    alert("Su producto ha sido Editaso Correctamente")
  }

  //obtener categorias
  cargarListaCategorias() {
    this.firebaseServiceService.getCategorias().subscribe(data => {
      this.categoria = data.map(e => {
        return {
          id: e.payload.doc.id,
          iva: e.payload.doc.data()['iva'],
          tipo: e.payload.doc.data()['tipo']
        }
      });
      console.log(this.categoria);
    });
  }

  // convertir la imagen a url 
  obtenerImagen(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `products/producto_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  // obtener categoria y editar
  obtenerCategoriaEdit(e) {
    this.categoriaEditar= e.target.value;
  }
}