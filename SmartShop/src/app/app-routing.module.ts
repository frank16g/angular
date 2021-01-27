import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ClientePedidosRealizadosComponent } from './components/cliente-pedidos-realizados/cliente-pedidos-realizados.component';
import { ProductsCrudComponent } from './components/products-crud/products-crud.component';
import { CheckLoginGuard } from './guards/check-login.guard';
import { RepartidorPedidosNuevosComponent } from './components/repartidor-pedidos-nuevos/repartidor-pedidos-nuevos.component';
import { RepartidorPedidosRealizadosComponent } from './components/repartidor-pedidos-realizados/repartidor-pedidos-realizados.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminRepartidoresComponent } from './components/admin-repartidores/admin-repartidores.component'
import { AdminCrearRepartidorComponent } from '../app/components/admin-crear-repartidor/admin-crear-repartidor.component';
import { ProductsComponent } from './components/products/products.component';
import { ClientesListarProductosComponent } from './components/clientes-listar-productos/clientes-listar-productos.component'
import { AdminEditarProductoComponent } from './components/admin-editar-producto/admin-editar-producto.component';
import { from } from 'rxjs';
import { AdminEditarRepartidorComponent } from './components/admin-editar-repartidor/admin-editar-repartidor.component'
import { ClienteCantidadProductoComponent } from './components/cliente-cantidad-producto/cliente-cantidad-producto.component'
import { ClienteCarritoComponent } from './components/cliente-carrito/cliente-carrito.component'
import { ClientePedidosRealizadosDetalleComponent} from './components/cliente-pedidos-realizados-detalle/cliente-pedidos-realizados-detalle.component'
const routes: Routes = [
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cliente',
    canActivate: [CheckLoginGuard],
    component: PedidosComponent
  },
  {
    path: 'pedidosRealizados',
    canActivate: [CheckLoginGuard],
    component: ClientePedidosRealizadosComponent
  },
  {
    path: 'repartidorPedidosNuevos',
    canActivate: [CheckLoginGuard],
    component: RepartidorPedidosNuevosComponent
  },
  {
    path: 'repartidor',
    canActivate: [CheckLoginGuard],
    component: RepartidorPedidosRealizadosComponent
  },
  {
    path: 'admin',
    component: AdminHomeComponent
  },
  {
    path: 'admin-repartidores',
    component: AdminRepartidoresComponent
  },
  {
    path: 'admin-productos',
    component: ProductsCrudComponent
  },
  {
    path: 'admin-crear-repartidor',
    component: AdminCrearRepartidorComponent
  },
  {
    path: 'editar-repartidor/:id',
    component: AdminEditarRepartidorComponent
  },
  {
    path: 'admin-CrearProducto',
    component: ProductsComponent
  },
  {
    path: 'cliente-ListarProductos',
    component: ClientesListarProductosComponent
  },
  {
    path: 'editar-producto/:id',
    component: AdminEditarProductoComponent
  },
  {
    path: 'cantidad-producto/:id',
    component: ClienteCantidadProductoComponent
  },
  {
    path: 'cliente-carrito',
    component: ClienteCarritoComponent
  },
  {
    path: 'cliente-pedidorealizado-detalle/:id',
    component: ClientePedidosRealizadosDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
