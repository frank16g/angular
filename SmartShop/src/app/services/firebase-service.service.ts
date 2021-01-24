import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  constructor(
    private firestore: AngularFirestore
  ) { }
    // Metodo para obtener Usuarios
    getUsuarios(){
      return this.firestore.collection('Usuarios').snapshotChanges(); 
    }
    // Metodo para crear Usuario
    createUsuario(_email, _cedula, _apellido, _nombre, _lat, _lon, _telefono){
      return this.firestore.collection('Usuarios').add({
        email: _email, 
        cedula: _cedula, 
        apellido: _apellido, 
        nombre: _nombre, 
        lat: _lat, 
        lon: _lon, 
        telefono: _telefono,
        tipo: "cliente"
      });
    }
    // Metodo para editar Usuario
    updateUsuario(id: any,Usuario: any){
      return this.firestore.collection('Usuarios').doc(id).update(Usuario);
    }
    // Metodo para eliminar Usuario
    deleteUsuario(id: any){
      return this.firestore.collection('Usuarios').doc(id).delete();
    }
    // Metodo para obtener Productos
    getProductos(){
      return this.firestore.collection('Productos').snapshotChanges(); 
    }

    // Metodo para crear Producto
    createProducto(_producto){
      return this.firestore.collection('Productos').add(_producto);
    }
    // Metodo para Actualizar Producto
    updateProducto(id: any,producto: any){
      console.log(producto);
      return this.firestore.collection('Productos').doc(id).update(producto);
    }
    // Metodo para Eliminar Producto
    deleteProducto(id: any){
      return this.firestore.collection('Productos').doc(id).delete();
    }
    // Metodo para obtener las Categorias de Pedidos
    getCategorias(){
      return this.firestore.collection('Categorias').snapshotChanges(); 
    }



}
