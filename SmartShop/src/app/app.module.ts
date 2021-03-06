import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ClientesListarProductosComponent } from './components/clientes-listar-productos/clientes-listar-productos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientePedidosRealizadosComponent } from './components/cliente-pedidos-realizados/cliente-pedidos-realizados.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarLoginComponent } from './auth/navbar-login/navbar-login.component';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsCrudComponent } from './components/products-crud/products-crud.component';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AuthService} from '../app/auth/services/auth.service'; 
import { CheckLoginGuard } from './guards/check-login.guard';
import { RepartidorPedidosNuevosComponent } from './components/repartidor-pedidos-nuevos/repartidor-pedidos-nuevos.component';
import { RepartidorPedidosRealizadosComponent } from './components/repartidor-pedidos-realizados/repartidor-pedidos-realizados.component';
import { NavbarRepartidoresComponent } from './components/navbar-repartidores/navbar-repartidores.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { AdminRepartidoresComponent } from './components/admin-repartidores/admin-repartidores.component';
import { AdminCrearRepartidorComponent } from './components/admin-crear-repartidor/admin-crear-repartidor.component';
import { AdminEditarRepartidorComponent } from './components/admin-editar-repartidor/admin-editar-repartidor.component';
import { AdminEditarProductoComponent } from './components/admin-editar-producto/admin-editar-producto.component';
import { ClienteCantidadProductoComponent } from './components/cliente-cantidad-producto/cliente-cantidad-producto.component';
import { ChartsModule } from 'ng2-charts';
import { ClienteCarritoComponent } from './components/cliente-carrito/cliente-carrito.component';
import { ClientePedidosRealizadosDetalleComponent } from './components/cliente-pedidos-realizados-detalle/cliente-pedidos-realizados-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesListarProductosComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PedidosComponent,
    NavbarComponent,
    ClientePedidosRealizadosComponent,

    NavbarLoginComponent,
    
    AdminRepartidoresComponent,
    ProductsComponent,
    ProductsCrudComponent,
    RepartidorPedidosNuevosComponent,
    RepartidorPedidosRealizadosComponent,
    NavbarRepartidoresComponent,
    AdminHomeComponent,
    NavbarAdminComponent,
    AdminCrearRepartidorComponent,
    AdminEditarRepartidorComponent,
    AdminEditarProductoComponent,
    ClienteCantidadProductoComponent,
    ClienteCarritoComponent,
    ClientePedidosRealizadosDetalleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    ChartsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule

  ],
  providers: [CheckLoginGuard],//AuthService,CheckLoginGuard
  bootstrap: [AppComponent]
})
export class AppModule { }
