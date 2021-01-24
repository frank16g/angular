import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  constructor(
    private router: Router,
    private firebaseServiceService: FirebaseServiceService,
    private storage: AngularFireStorage
  ) { }

  pNombre: string;
  pPrecio: Number;
  pIva: boolean;
  pImagen: string;
  pCategoria: string;
  
  categoria: {};             // lista de categorias DB
  categoriaCrear: string;   // obtener categoria para agregarle  

  uploadPorcent: Observable<number>;
  urlImage: Observable<string>; // variable para la url 
  // recuperar la url de la imagen
  @ViewChild('imageProduct') inputImageProduct: ElementRef;

  ngOnInit(): void {
    this.cargarListaCategorias();
  }

  crearProducto() {
    let Producto = {};
    Producto['nombre'] = this.pNombre;
    Producto['categoria'] = this.categoriaCrear;
    Producto['imagen'] = this.inputImageProduct.nativeElement.value;
    Producto['precio'] = this.pPrecio;
    // consulta al servidio de firestore
    this.firebaseServiceService.createProducto(Producto).then(res => {
      this.pCategoria = "";
      this.pImagen = "";
      this.pPrecio = undefined;
      this.pNombre = "";
    }).catch(error => {
      console.log(error);
    });
    // limpiar la url de la imagen
    this.inputImageProduct.nativeElement.value = "";
    alert("Su producto ha sido creado")
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

  // obtener categoria y crear
  obtenerCategoriaCreate(e) {
    this.categoriaCrear=e.target.value;
  }

}
