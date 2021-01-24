import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
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
    private storage: AngularFireStorage
  ) { }

  // variables para crear el producto

  pNombre: string;
  pPrecio: Number;
  pIva: boolean;
  pImagen: string;
  pCategoria: string;

  producto: any[] = [];              // arreglo de los productos DB
  allProducts: any[];
  arregloProductoPorCategoria: any[] = [];  // arreglo a dee los productos por categorias (combox)

  categoria: {};             // lista de categorias DB
  // categoriaCrear: string;   // obtener categoria para agregarle  
  categoriaBuscar: string;  // obtener categoria y buscar esas categorias
  categoriaEditar: string;   // obtener categoria para editar

  uploadPorcent: Observable<number>;
  urlImage: Observable<string>; // variable para la url 

  // recuperar la url de la imagen
  @ViewChild('imageProduct') inputImageProduct: ElementRef;

a:number;
  ngOnInit() {
    //this.arregloProductoPorCategoria.length = 0;
    // llenar el objeto producto con los productos de la BD 
      this.cargarTodosLosProductos();
    //this.arregloProductoPorCategoria.length = 0;
    this.cargarProductoPorCategoria();
    //this.arregloProductoPorCategoria.length = 0;
    // llanar el objeto categoria de los elementos de la BD
    this.cargarListaCategorias();
    

  }

  cargarTodosLosProductos() {
    
    this.firebaseServiceService.getProductos().subscribe(resp => {
      this.arregloProductoPorCategoria.length=0;
      resp.forEach((element: any) => {
        this.arregloProductoPorCategoria.push({
          id: element.payload.doc.id,
          nombre: element.payload.doc.data().nombre,
          categoria: element.payload.doc.data().categoria,
          precio: element.payload.doc.data().precio,
          imagen: element.payload.doc.data().imagen,
          editar: false
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
          editar: false
        });
      });
      console.log(this.categoriaBuscar);
      if(this.categoriaBuscar!="Todas"){
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
      }else{
        this.cargarTodosLosProductos();
      }
     
    });
  }

  cargarListaCategorias() {
    this.arregloProductoPorCategoria.length=0;
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

  // editar producto
  EditarProducto(Producto) {
    Producto.editar = true;
    Producto.editnombre = Producto.nombre;
    Producto.editCategoria = Producto.categoria;
    Producto.editPrecio = Producto.precio;
    Producto.editImagen=Producto.imagen
  }

  Editar2(ProductoEdit) {
    console.log(this.inputImageProduct.nativeElement.value);
    let Producto = {};
    Producto['categoria'] = this.categoriaEditar;
    Producto['nombre'] = ProductoEdit.editnombre;
    Producto['precio'] = ProductoEdit.editPrecio;
    let i = this.inputImageProduct.nativeElement.value;
    if(i.length!=0){
      Producto['imagen'] = this.inputImageProduct.nativeElement.value;
      this.inputImageProduct.nativeElement.value = "";
    }else{
      Producto['imagen'] = ProductoEdit.editImagen;
    }
    this.firebaseServiceService.updateProducto(ProductoEdit.id, Producto);
    ProductoEdit.editar = false;
    this.arregloProductoPorCategoria.length=0;
    this.inputImageProduct.nativeElement.value = null;
  }

  // Eliminar Producto
  EliminarProducto(idProducto) {
    let r = confirm('¿Está seguro de eliminar este producto?');
    if (r==true){
      this.arregloProductoPorCategoria.length = 0;
      this.firebaseServiceService.deleteProducto(idProducto);
      this.cargarProductoPorCategoria();
    }else{
      this.cargarTodosLosProductos();
      // this.cargarProductoPorCategoria();
    }
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

  //******* capturar categorias de los combos*********
  // obtener categoria y buscar categorias
  obtenerCategoriaBuscar(e) {
    this.categoriaBuscar = e.target.value;
    this.cargarProductoPorCategoria();
  }
  // obtener categoria y editar
  obtenerCategoriaEdit(e) {
    //this.seleccionado=e.target.value;
    this.categoriaEditar = e.target.value;
  }

}